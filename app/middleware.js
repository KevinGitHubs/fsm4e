import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

export async function middleware(req) {
  const maintenance = process.env.MAINTENANCE_MODE === 'true';
  if (maintenance) {
    const user = await verifyAdmin(req);
    if (!user) return NextResponse.json({ message: 'Maintenance mode' }, { status: 503 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
