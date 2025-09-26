export default function RankBadge({ rank }) {
  const color = rank === 'nonpil' ? '#888' : rank === 'klovs' ? '#ccc' : rank === 'bvas' ? '#cd7f32' : '#ffd700';
  return (
    <svg viewBox="0 0 64 64" fill={color} className="w-8 h-8">
      <circle cx="32" cy="32" r="30" />
      <text x="32" y="40" textAnchor="middle" fill="#000" fontSize="20">{rank[0].toUpperCase()}</text>
    </svg>
  );
}
