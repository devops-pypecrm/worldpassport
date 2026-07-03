import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { University } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const universities = await University.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ universities });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[GET /api/admin/universities]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, country } = body;
    if (!name || !country) {
      return NextResponse.json({ error: 'Name and country are required' }, { status: 400 });
    }
    await connectDB();
    // Strip any extra fields the schema doesn't know — use only safe keys
    const safe = {
      name:        body.name        || '',
      country:     body.country     || '',
      city:        body.city        || undefined,
      website:     body.website     || undefined,
      ranking:     body.ranking     || undefined,
      image:       body.image       || undefined,
      description: body.description || undefined,
    };
    const university = await University.create(safe);
    return NextResponse.json({ success: true, university }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[POST /api/admin/universities]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const body = await req.json();
    const safe = {
      name:        body.name,
      country:     body.country,
      city:        body.city        || undefined,
      website:     body.website     || undefined,
      ranking:     body.ranking     || undefined,
      image:       body.image       || undefined,
      description: body.description || undefined,
    };
    await connectDB();
    const university = await University.findByIdAndUpdate(id, safe, { new: true, runValidators: true });
    if (!university) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, university });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[PUT /api/admin/universities]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await connectDB();
    await University.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[DELETE /api/admin/universities]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
