import { verifyAdmin } from '@/lib/auth';

export async function POST(req) {
  const admin = await verifyAdmin(req);
  if (!admin) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const { enabled } = await req.json();
  process.env.MAINTENANCE_MODE = enabled ? 'true' : 'false';

  return Response.json({ success: true, maintenance: enabled });
}
