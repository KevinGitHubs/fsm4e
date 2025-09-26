'use client';
import { useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

export default function EasterKonami() {
  useEffect(() => {
    let idx = 0;
    const onKey = (e) => {
      if (e.keyCode === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          idx = 0;
          axios.post('/api/konami', { sequence: KONAMI }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(r => {
            if (r.data.success) alert(`Konami! +${r.data.reward} koin`);
            else alert(r.data.error);
          });
        }
      } else idx = 0;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="panel text-center">
      <p className="text-sm text-gray-400 flex items-center justify-center gap-2"><Gamepad2 size={16} /> ↑↑↓↓←→←→BA</p>
    </motion.div>
  );
}
