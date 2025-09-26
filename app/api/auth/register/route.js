import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  await dbConnect();
  const { username, password, name, phone } = await req.json();

  // Cek duplikat
  if (await User.findOne({ username })) {
    return Response.json({ error: 'Username sudah digunakan' }, { status: 400 });
  }

  // Buat user
  await User.create({ username, password, name, phone });

  return Response.json({ success: true });
}
