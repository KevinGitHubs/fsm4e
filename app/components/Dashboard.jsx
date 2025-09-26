'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { QrCode, GamepadIcon, Gift, Coins, UserPlus, Moon, LogOut } from 'lucide-react';
import RankBadge from './RankBadge';
import ProgressRank from './ProgressRank';
import DarkToggle from './DarkToggle';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get('/api/auth/me').then(r => {
      if (!r.data.user) return router.push('/');
      setUser(r.data.user);
    });
    axios.get('/api/games/leaderboard').then(r => setLeaderboard(r.data));
  }, [router]);

  const logout = async () => {
    await axios.post('/api/auth/logout');
    localStorage.removeItem('token');
    router.push('/');
  };

  if (!user) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="panel">
        <div className="flex justify-between items-center mb-2">
          <span>Hai <b>{user.name}</b></span>
          <button onClick={logout} className="text-sm underline flex items-center gap-1"><LogOut size={14} /> Logout</button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-yellow-400">💰 {user.coins} koin</span>
          <RankBadge rank={user.rank} />
        </div>
        <ProgressRank scanCount={user.scanCount} />
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button onClick={() => router.push('/qr')} className="btn flex items-center justify-center gap-2"><QrCode size={16} /> Scan QR</button>
          {user.gameUnlocked && <button onClick={() => router.push('/game')} className="btn flex items-center justify-center gap-2"><GamepadIcon size={16} /> Game</button>}
          <button onClick={() => router.push('/spin')} className="btn flex items-center justify-center gap-2"><Gift size={16} /> Spin</button>
          <button onClick={() => router.push('/redeem')} className="btn flex items-center justify-center gap-2"><Coins size={16} /> Redeem</button>
          <button onClick={() => router.push('/referral')} className="btn flex items-center justify-center gap-2"><UserPlus size={16} /> Referral</button>
          <DarkToggle />
        </div>
      </div>
      <div className="panel">
        <h3 className="font-bold mb-2">Leaderboard Hari Ini</h3>
        {leaderboard.map((e, i) => (
          <div key={i} className="flex justify-between">
            <span>{i + 1}. {e.username}</span>
            <span>{e.score} pts</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
