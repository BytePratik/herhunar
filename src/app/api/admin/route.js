import { NextResponse } from 'next/server';
import { getAdminStats, getTalents, getCompanies, getEnquiries, getReports, updateTalent, resolveReport } from '@/lib/db';

export async function GET() {
  try {
    const stats = getAdminStats();
    const allTalents = getTalents({ status: 'all' });
    const companies = getCompanies();
    const enquiries = getEnquiries();
    const reports = getReports();

    return NextResponse.json({
      success: true,
      data: {
        stats,
        talents: allTalents,
        companies,
        enquiries,
        reports
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { action, talentId, reportId, status } = body;

    if (action === 'approve_all_pending') {
      const allTalents = getTalents({ status: 'all' });
      const pending = allTalents.filter(t => t.status === 'pending');
      pending.forEach(t => updateTalent(t.id, { status: 'approved' }));
      return NextResponse.json({ success: true, count: pending.length });
    }

    if (action === 'update_talent_status' && talentId && status) {
      const updated = updateTalent(talentId, { status });
      return NextResponse.json({ success: true, data: updated });
    }

    if (action === 'toggle_feature' && talentId) {
      const talent = getTalents({ status: 'all' }).find(t => t.id === talentId);
      if (talent) {
        const updated = updateTalent(talentId, { isFeatured: !talent.isFeatured });
        return NextResponse.json({ success: true, data: updated });
      }
    }

    if (action === 'resolve_report' && reportId) {
      const resolved = resolveReport(reportId);
      return NextResponse.json({ success: true, data: resolved });
    }

    return NextResponse.json({ success: false, error: 'Invalid admin action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
