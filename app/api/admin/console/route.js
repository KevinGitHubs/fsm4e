import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verifyAdmin } from '@/lib/auth';

// GET: lihat semua user
export async function GET(req) {
  await dbConnect();
  const admin = await verifyAdmin(req);
  if (!admin) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const users = await User.find({}, '-password');
  return Response.json({ users });
}

// PUT: edit user (koin, rank, streak, dll)
export async function PUT(req) {
  await dbConnect();
  const admin = await verifyAdmin(req);
  if (!admin) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const { id, key, value } = await req.json();
  const update = { [key]: value };

  await User.findByIdAndUpdate(id, update);
  return Response.json({ success: true });
}
