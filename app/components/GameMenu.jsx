'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GameMenu() {
  const [clicks, setClicks] = useState([]);
  const [score, setScore] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      const idx = Math.floor(Math.random() * 9);
      document.querySelectorAll('.tile').forEach(d => d.classList.remove('active'));
      document.querySelectorAll('.tile')[idx].classList.add('active');
    }, 600 + Math.random() * 400);
    return () => clearInterval(id);
  }, [active]);

  const start = () => {
    setActive(true);
    setClicks([]);
    setScore(0);
    setTimeout(async () => {
      setActive(false);
      const res = await axios.post('/api/games/score', { clicks, score }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      if (res.data.coin) alert(`+${res.data.coin} koin (rank ${res.data.rank})`);
    }, 30000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="panel space-y-4">
      <h3 className="text-xl font-bold">Game Cepat Tangan</h3>
      <div id="gameGrid" className="grid grid-cols-3 gap-2">{[...Array(9)].map((_, i) => (
        <div key={i} className="tile" onClick={() => { if (active) { setClicks([...clicks, Date.now()]); setScore(s => s + 10); } }} />
      ))}</div>
      <button onClick={start} className="btn">Mulai 30 detik</button>
    </motion.div>
  );
}
