'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Flame } from 'lucide-react';

export default function StreakLogin() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    axios.post('/api/streak', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(r => {
      if (r.data.claimed) setStreak(0);
      else setStreak(r.data.streak);
    });
  }, []);

  const claim = async () => {
    const res = await axios.post('/api/streak/claim', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (res.data.success) alert(`+${res.data.reward} koin!`);
    setStreak(0);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="panel flex items-center justify-between">
      <div className="flex items-center gap-2"><Flame className="text-orange-400" /> Streak {streak} hari</div>
      {streak === 7 && <button onClick={claim} className="btn text-sm">Claim 1200</button>}
    </motion.div>
  );
}
