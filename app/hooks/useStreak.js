import { useEffect, useState } from 'react';
import axios from 'axios';
import { startOfDay } from 'date-fns';

export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak = async () => {
    const res = await axios.post('/api/streak', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    setStreak(res.data.streak);
    setClaimed(res.data.claimed || false);
  };

  const claim = async () => {
    const res = await axios.post('/api/streak/claim', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    if (res.data.success) {
      setStreak(0);
      setClaimed(true);
    }
  };

  return { streak, claimed, claim, loadStreak };
}
