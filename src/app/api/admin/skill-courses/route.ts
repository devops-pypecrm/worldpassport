import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { SkillCourse } from '@/lib/models';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function GET() {
  try {
    await connectDB();
    const items = await SkillCourse.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ skillCourses: items });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.universityId || !body.universityName) return NextResponse.json({ error: 'Title, universityId and universityName required' }, { status: 400 });
    await connectDB();
    const item = await SkillCourse.create({
      slug: body.slug || slugify(body.title),
      title: body.title, universityId: body.universityId, universityName: body.universityName,
      universitySubtitle: body.universitySubtitle || undefined,
      color: body.color || '#3B82F6', icon: body.icon || 'BookOpen',
      duration: body.duration || '', mode: body.mode || 'Online', tools: body.tools || '',
      img: body.img || undefined,
      highlights: body.highlights || [],
    });
    return NextResponse.json({ success: true, skillCourse: item }, { status: 201 });
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
    const item = await SkillCourse.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, skillCourse: item });
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
    await SkillCourse.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
