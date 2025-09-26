'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { Copy, UserPlus } from 'lucide-react';

export default function ReferralBox() {
  const [copied, setCopied] = useState(false);
  const code = btoa('user-' + Math.random().toString(36).slice(-6)).slice(0, 6);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const claim = async () => {
    const res = await axios.post('/api/referral', { code }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (res.data.success) alert(`+${res.data.reward} koin!`);
    else alert(res.data.error);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="panel space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2"><UserPlus /> Referral</h3>
      <div className="flex items-center justify-between">
        <span className="font-mono">{code}</span>
        <button onClick={copy} className="btn flex items-center gap-2"><Copy size={16} /> {copied ? 'Copied!' : 'Copy'}</button>
      </div>
      <button onClick={claim} className="btn">Claim Reward</button>
    </motion.div>
  );
}
