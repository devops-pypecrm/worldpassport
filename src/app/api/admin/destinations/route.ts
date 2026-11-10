import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import { Destination } from '@/lib/models';
import { defaultDestinations } from '@/lib/destinations';

export const dynamic = 'force-dynamic';

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const strList = (v: unknown) =>
  Array.isArray(v) ? v.map(str).filter(Boolean) : [];

/** Whitelist and normalise the fields a client may set. */
function clean(body: Record<string, unknown>) {
  const stats = (body.stats || {}) as Record<string, unknown>;
  const topUnis = Array.isArray(body.topUnis) ? body.topUnis : [];
  return {
    name: str(body.name),
    code: str(body.code).toUpperCase(),
    tagline: str(body.tagline),
    tag: str(body.tag),
    stats: {
      unis: str(stats.unis),
      avgCost: str(stats.avgCost),
      acceptance: str(stats.acceptance),
      intl: str(stats.intl),
    },
    highlights: strList(body.highlights),
    programs: strList(body.programs),
    topUnis: topUnis
      .map((u) => {
        const o = (u || {}) as Record<string, unknown>;
        return { name: str(o.name), rank: str(o.rank), field: str(o.field) };
      })
      .filter((u) => u.name),
    salary: str(body.salary),
  };
}

/** First run: copy the destinations that used to be hardcoded into the database, keeping their order. */
async function seedIfEmpty() {
  if ((await Destination.estimatedDocumentCount()) > 0) return;
  await Destination.insertMany(
    defaultDestinations.map((d, i) => ({
      name: d.name, code: d.code, tagline: d.tagline, tag: d.tag, stats: d.stats,
      highlights: d.highlights, topUnis: d.topUnis, programs: d.programs, salary: d.salary,
      order: i,
    })),
  );
}

function errorResponse(where: string, err: unknown) {
  const msg = err instanceof Error ? err.message : 'Unknown error';
  console.error(`[${where} /api/admin/destinations]`, msg);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export async function GET() {
  try {
    await connectDB();
    await seedIfEmpty();
    const destinations = await Destination.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ destinations });
  } catch (err) {
    return errorResponse('GET', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = clean(await req.json());
    if (!data.name || !data.code) {
      return NextResponse.json({ error: 'Name and code are required' }, { status: 400 });
    }
    await connectDB();
    // New destinations go to the end of the list
    const last = await Destination.findOne({}).sort({ order: -1 }).select('order');
    const destination = await Destination.create({ ...data, order: last ? last.order + 1 : 0 });
    return NextResponse.json({ success: true, destination }, { status: 201 });
  } catch (err) {
    return errorResponse('POST', err);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (!id || !mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Valid ID required' }, { status: 400 });
    const data = clean(await req.json());
    if (!data.name || !data.code) {
      return NextResponse.json({ error: 'Name and code are required' }, { status: 400 });
    }
    await connectDB();
    const destination = await Destination.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!destination) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, destination });
  } catch (err) {
    return errorResponse('PUT', err);
  }
}

/** Reorder: body { ids: string[] } — the full list of destination ids in their new display order. */
export async function PATCH(req: NextRequest) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0 || !ids.every((id) => typeof id === 'string' && mongoose.isValidObjectId(id))) {
      return NextResponse.json({ error: 'A list of destination ids is required' }, { status: 400 });
    }
    await connectDB();
    await Destination.bulkWrite(
      ids.map((id: string, i: number) => ({ updateOne: { filter: { _id: id }, update: { $set: { order: i } } } })),
    );
    const destinations = await Destination.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, destinations });
  } catch (err) {
    return errorResponse('PATCH', err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (!id || !mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Valid ID required' }, { status: 400 });
    await connectDB();
    await Destination.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return errorResponse('DELETE', err);
  }
}
