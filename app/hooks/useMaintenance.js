import { useEffect, useState } from 'react';
import axios from 'axios';

export function useMaintenance() {
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    checkMaintenance();
  }, []);

  const checkMaintenance = async () => {
    try {
      const res = await axios.get('/api/admin/maintenance');
      setMaintenance(res.data.maintenance);
    } catch {
      setMaintenance(false);
    }
  };

  const toggle = async (enabled) => {
    await axios.post('/api/admin/maintenance', { enabled }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    setMaintenance(enabled);
  };

  return { maintenance, toggle, checkMaintenance };
}
