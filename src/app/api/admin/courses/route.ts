import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import { Course } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ courses });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, university, country, level } = body;
    if (!title || !university || !country || !level) {
      return NextResponse.json({ error: 'Title, university, country and level are required' }, { status: 400 });
    }
    await connectDB();
    const course = await Course.create(body);
    return NextResponse.json({ success: true, course }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (!id || !mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Valid ID required' }, { status: 400 });
    const body = await req.json();
    const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
    const safe = {
      title: str(body.title),
      university: str(body.university),
      country: str(body.country),
      level: str(body.level),
      duration: str(body.duration),
      tuitionFee: str(body.tuitionFee),
      intake: str(body.intake),
      description: str(body.description),
    };
    if (!safe.title || !safe.university || !safe.country || !safe.level) {
      return NextResponse.json({ error: 'Title, university, country and level are required' }, { status: 400 });
    }
    await connectDB();
    const course = await Course.findByIdAndUpdate(id, safe, { new: true, runValidators: true });
    if (!course) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, course });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await connectDB();
    await Course.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
