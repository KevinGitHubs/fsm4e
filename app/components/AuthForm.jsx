'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { User, Lock, UserPlus, Phone } from 'lucide-react';

export default function AuthForm({ onLogin }) {
  const [isReg, setIsReg] = useState(false);
  const [data, setData] = useState({ username: '', password: '', name: '', phone: '' });

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const login = async () => {
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const json = await res.json();
    if (res.ok) {
      localStorage.setItem('token', json.token);
      onLogin(json.user);
    } else Swal.fire('Error', json.error, 'error');
  };

  const register = async () => {
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const json = await res.json();
    if (res.ok) {
      Swal.fire('Sukses', 'Daftar berhasil, silakan login', 'success');
      setIsReg(false);
    } else Swal.fire('Error', json.error, 'error');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="panel space-y-4">
      <h1 className="text-2xl font-bold text-center text-accent flex items-center justify-center gap-2"><User /> FSm4e</h1>
      <div className="relative"><User className="absolute left-3 top-3 w-5 h-5 text-gray-400" /><input name="username" placeholder="Username" onChange={handleChange} className="input pl-10" /></div>
      <div className="relative"><Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" /><input name="password" type="password" placeholder="Password" onChange={handleChange} className="input pl-10" /></div>
      {isReg && (
        <>
          <div className="relative"><User className="absolute left-3 top-3 w-5 h-5 text-gray-400" /><input name="name" placeholder="Nama Lengkap" onChange={handleChange} className="input pl-10" /></div>
          <div className="relative"><Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" /><input name="phone" placeholder="Nomor HP" onChange={handleChange} className="input pl-10" /></div>
        </>
      )}
      <button onClick={isReg ? register : login} className="btn">{isReg ? 'Daftar' : 'Login'}</button>
      <button onClick={() => setIsReg(!isReg)} className="text-sm underline text-center w-full">{isReg ? 'Sudah punya akun? Login' : 'Belum punya akun? Daftar'}</button>
    </motion.div>
  );
}
