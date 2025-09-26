'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { Gift } from 'lucide-react';

export default function DailySpin() {
  const [reward, setReward] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const spin = async () => {
    setSpinning(true);
    const res = await axios.post('/api/games/spin', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (res.data.reward) {
      setReward(res.data.reward);
      setSpinning(false);
    } else {
      setSpinning(false);
      alert(res.data.error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="panel space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2"><Gift /> Daily Spin</h3>
      <div className="spin">{spinning ? 'Spinning...' : reward ? `${reward} koin` : 'Klik spin'}</div>
      <button onClick={spin} className="btn" disabled={spinning}>Spin</button>
    </motion.div>
  );
}
