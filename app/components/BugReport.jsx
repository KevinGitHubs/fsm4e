'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { Bug } from 'lucide-react';

export default function BugReport() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const send = async () => {
    if (!desc) return alert('Deskripsi kosong');
    await axios.post('/api/report', { title, description: desc }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    alert('Laporan terkirim!');
    setTitle(''); setDesc('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="panel space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2"><Bug /> Report Bug</h3>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Judul (opsional)" className="input" />
      <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Deskripsi bug" className="input h-24" />
      <button onClick={send} className="btn">Kirim Laporan</button>
    </motion.div>
  );
}
