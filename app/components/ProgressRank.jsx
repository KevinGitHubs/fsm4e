export default function ProgressRank({ scanCount }) {
  const ranks = [{ name: 'nonpil', min: 0 }, { name: 'klovs', min: 5 }, { name: 'bvas', min: 10 }, { name: 'tzaz', min: 20 }];
  const current = ranks.slice().reverse().find(r => scanCount >= r.min) || ranks[0];
  const next = ranks[ranks.findIndex(r => r.name === current.name) + 1];
  if (!next) return <p className="text-sm text-gray-400">Rank maksimal</p>;
  const progress = ((scanCount - current.min) / (next.min - current.min)) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1"><span>{current.name.toUpperCase()}</span><span>{next.min - scanCount} scan lagi {next.name}</span></div>
      <progress value={progress} max="100" className="w-full h-2" />
    </div>
  );
}
