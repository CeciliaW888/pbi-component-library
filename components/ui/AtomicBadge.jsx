const levelColors = {
  Atom: 'atomic-badge-blue',
  Molecule: 'atomic-badge-violet',
  Organism: 'atomic-badge-pink',
  Template: 'atomic-badge-amber',
  Page: 'atomic-badge-emerald',
};

export default function AtomicBadge({ level, size = 'sm' }) {
  const sizeClasses = size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-[11px]';
  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full ${sizeClasses} ${levelColors[level] || 'bg-gray-100 text-gray-700'}`}>
      {level}
    </span>
  );
}
