'use client';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { UserCog, QrCode, Broadcast, Settings, RefreshCw } from 'lucide-react';

export default function AdminConsole() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    const res = await axios.get('/api/admin/console', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    setUsers(res.data.users);
    setLoading(false);
  };

  const generateQR = async () => {
    const coins = prompt('Nilai koin QR:', 60);
    if (!coins) return;
    await axios.post('/api/qr/generate', { coins: parseInt(coins) }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    Swal.fire('Sukses', 'QR berhasil dibuat', 'success');
  };

  const editUser = async (id) => {
    const u = users.find(x => x._id === id);
    const field = prompt('Pilih field:\n1. coins\n2. rank\n3. streakCount\n4. scanCount\n5. phone\n6. name', '1');
    if (!field) return;
    const fields = ['coins', 'rank', 'streakCount', 'scanCount', 'phone', 'name'];
    const key = fields[parseInt(field) - 1];
    const val = prompt(`Masukkan nilai ${key}:`, u[key]);
    if (val === null) return;
    await axios.put('/api/admin/console', { id, key, value: key === 'coins' || key === 'streakCount' || key === 'scanCount' ? parseInt(val) : val }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    Swal.fire('Updated', '', 'success');
    loadUsers();
  };

  const triggerAbuse = async () => {
    const types = ['double-coin', 'global-rain', 'freeze-game', 'rank-up'];
    const t = prompt('Pilih abuse:\n1. Double Coin\n2. Global Rain\n3. Freeze Game\n4. Rank Up', 1);
    if (!t) return;
    await axios.post('/api/admin/abuse', { type: types[parseInt(t) - 1], value: 2, duration: 30 }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    Swal.fire('Abuse dikirim!', '', 'success');
  };

  const globalChat = async () => {
    const msg = prompt('Pesan global:');
    if (!msg) return;
    await axios.post('/api/admin/global-chat', { message: msg }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    Swal.fire('Terkirim', '', 'success');
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="panel space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2"><UserCog /> Admin Console</h2>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={generateQR} className="btn flex items-center justify-center gap-2"><QrCode size={16} /> Generate QR</button>
        <button onClick={triggerAbuse} className="btn flex items-center justify-center gap-2"><Broadcast size={16} /> Trigger Abuse</button>
        <button onClick={globalChat} className="btn flex items-center justify-center gap-2"><Broadcast size={16} /> Global Chat</button>
        <button onClick={loadUsers} className="btn flex items-center justify-center gap-2"><RefreshCw size={16} /> Load Users</button>
      </div>
      {loading && <p className="text-center">Loading...</p>}
      <div className="max-h-80 overflow-auto space-y-2">
        {users.map(u => (
          <div key={u._id} className="flex justify-between items-center border-b border-gray-700 pb-2">
            <div>
              <p className="font-semibold">{u.username}</p>
              <p className="text-sm text-gray-400">{u.name} – {u.coins} koin – {u.rank}</p>
            </div>
            <button onClick={() => editUser(u._id)} className="text-sm underline">Edit</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
