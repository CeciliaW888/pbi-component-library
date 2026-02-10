const levelColors = {
  Atom: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Molecule: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Organism: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Template: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Page: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
};

export default function AtomicBadge({ level, size = 'sm' }) {
  const sizeClasses = size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-[11px]';
  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full ${sizeClasses} ${levelColors[level] || 'bg-gray-100 text-gray-700'}`}>
      {level}
    </span>
  );
}
