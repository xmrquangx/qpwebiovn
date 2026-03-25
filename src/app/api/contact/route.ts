import { NextRequest, NextResponse } from 'next/server';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://api.qpweb.io.vn';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(`${WP_API_URL}/wp-json/qpweb/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Lỗi kết nối server. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}
