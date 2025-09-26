'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DarkToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return (
    <button onClick={() => setDark(!dark)} className="btn flex items-center justify-center gap-2">
      {dark ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
