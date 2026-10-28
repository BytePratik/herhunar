import { NextResponse } from 'next/server';
import { getTalents, createTalent } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const city = searchParams.get('city');
    const status = searchParams.get('status');

    const talents = getTalents({ category, search, city, status });
    return NextResponse.json({ success: true, data: talents });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.category) {
      return NextResponse.json({ success: false, error: 'Name, email and category are required' }, { status: 400 });
    }

    const created = createTalent(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
