'use client';

export default function ComponentTabs({ activeTab, onTabChange }) {
  const tabs = ['Overview', 'Guidelines', 'Specs'];

  return (
    <div className="flex items-center gap-0 border-b border-outline-variant/30 mb-8">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab.toLowerCase())}
          className={`relative px-5 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.toLowerCase()
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {tab}
          {activeTab === tab.toLowerCase() && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
