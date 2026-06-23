import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { SkillUniversity } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const items = await SkillUniversity.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ skillUniversities: items });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.shortName) return NextResponse.json({ error: 'Name and shortName required' }, { status: 400 });
    await connectDB();
    const item = await SkillUniversity.create({ name: body.name, shortName: body.shortName, subtitle: body.subtitle || '', color: body.color || '#3B82F6', description: body.description || '' });
    return NextResponse.json({ success: true, skillUniversity: item }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const body = await req.json();
    await connectDB();
    const item = await SkillUniversity.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, skillUniversity: item });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await connectDB();
    await SkillUniversity.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
