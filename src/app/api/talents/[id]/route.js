import { NextResponse } from 'next/server';
import { getTalentById, updateTalent, deleteTalent } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const talent = getTalentById(id);
    if (!talent) {
      return NextResponse.json({ success: false, error: 'Talent not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: talent });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const updated = updateTalent(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Talent not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = deleteTalent(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Talent not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
