import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { getEnquiries } from '@/lib/enquiries';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** Excel treats cells starting with these characters as formulas, so prefix them to keep data as plain text. */
const safe = (v: string) => (/^[=+\-@\t\r]/.test(v) ? `'${v}` : v);

export async function GET(req: NextRequest) {
  try {
    const sp = new URL(req.url).searchParams;
    const enquiries = await getEnquiries({ source: sp.get('source') || '', q: sp.get('q') || '' });

    const wb = new ExcelJS.Workbook();
    wb.creator = 'World Passport Admin';
    wb.created = new Date();
    const ws = wb.addWorksheet('Enquiries', { views: [{ state: 'frozen', ySplit: 1 }] });

    ws.columns = [
      { header: '#', key: 'n', width: 6 },
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Source', key: 'source', width: 20 },
      { header: 'Name', key: 'name', width: 24 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 18 },
      { header: 'Organisation', key: 'organization', width: 24 },
      { header: 'Interested in / Subject', key: 'subject', width: 24 },
      { header: 'Program / Course', key: 'program', width: 32 },
      { header: 'University', key: 'university', width: 30 },
      { header: 'Destination', key: 'destination', width: 16 },
      { header: 'Study level', key: 'level', width: 14 },
      { header: 'Duration', key: 'duration', width: 14 },
      { header: 'Tuition fee', key: 'tuitionFee', width: 16 },
      { header: 'Intake', key: 'intake', width: 14 },
      { header: 'Message', key: 'message', width: 60 },
      { header: 'Status', key: 'status', width: 12 },
    ];

    enquiries.forEach((e, i) => {
      ws.addRow({
        n: i + 1,
        date: e.createdAt ? new Date(e.createdAt) : '',
        source: e.source,
        name: safe(e.name),
        email: safe(e.email),
        phone: safe(e.phone),
        organization: safe(e.organization),
        subject: safe(e.subject),
        program: safe(e.program),
        university: safe(e.university),
        destination: safe(e.destination),
        level: safe(e.level),
        duration: safe(e.duration),
        tuitionFee: safe(e.tuitionFee),
        intake: safe(e.intake),
        message: safe(e.message),
        status: e.status,
      });
    });

    const header = ws.getRow(1);
    header.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F2F5F' } };
    header.alignment = { vertical: 'middle' };
    header.height = 22;
    ws.getColumn('date').numFmt = 'dd mmm yyyy hh:mm';
    ws.getColumn('message').alignment = { wrapText: true, vertical: 'top' };
    ws.autoFilter = { from: 'A1', to: { row: 1, column: ws.columnCount } };

    const buffer = await wb.xlsx.writeBuffer();
    const stamp = new Date().toISOString().slice(0, 10);
    return new NextResponse(buffer as ArrayBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="worldpassport-enquiries-${stamp}.xlsx"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: unknown) {
    console.error('[GET /api/admin/enquiries/export]', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Could not create the Excel file' }, { status: 500 });
  }
}
