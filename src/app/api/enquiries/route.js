import { NextResponse } from 'next/server';
import { getEnquiries, createEnquiry, updateEnquiryStatus } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const talentId = searchParams.get('talentId');
    const companyId = searchParams.get('companyId');

    const enquiries = getEnquiries({ talentId, companyId });
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.talentId || !body.message) {
      return NextResponse.json({ success: false, error: 'Talent ID and message are required' }, { status: 400 });
    }

    const created = createEnquiry(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'ID and status are required' }, { status: 400 });
    }

    const updated = updateEnquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
