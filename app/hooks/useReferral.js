import { useState } from 'react';
import axios from 'axios';

export function useReferral() {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    const c = btoa('user-' + Math.random().toString(36).slice(-6)).slice(0, 6);
    setCode(c);
    return c;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const claim = async (code) => {
    const res = await axios.post('/api/referral', { code }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    return res.data;
  };

  return { code, copied, generateCode, copyCode, claim };
}
