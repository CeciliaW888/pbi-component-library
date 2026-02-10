'use client';
import { useState, useEffect } from 'react';
import { Sun, Moon, Search, Github } from 'lucide-react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
    localStorage.setItem('theme', next ? 'dark' : '');
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        {searchOpen ? (
          <div className="flex items-center gap-2 bg-surface-variant rounded-xl px-3 py-1.5 w-80 ring-1 ring-primary/20">
            <Search size={16} className="text-on-surface-variant shrink-0" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components..."
              className="bg-transparent text-sm text-on-surface outline-none w-full placeholder:text-on-surface-variant/50"
              onBlur={() => { if (!search) setSearchOpen(false); }}
              onKeyDown={(e) => { if (e.key === 'Escape') { setSearch(''); setSearchOpen(false); } }}
            />
            <kbd className="text-[10px] text-on-surface-variant bg-surface px-1.5 py-0.5 rounded font-mono">ESC</kbd>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface bg-surface-variant/50 hover:bg-surface-variant rounded-xl px-3 py-1.5 transition-colors"
          >
            <Search size={16} />
            <span>Search...</span>
            <kbd className="text-[10px] ml-4 bg-surface px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors"
        >
          <Github size={18} />
        </a>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
