'use client';
import { useState } from 'react';

const stateStyles = {
  default: '',
  hover: 'ring-2 ring-primary/30 shadow-lg scale-[1.01]',
  focus: 'ring-2 ring-primary outline-none',
  active: 'scale-[0.98] ring-2 ring-primary/50',
  selected: 'ring-2 ring-primary bg-primary-container/30',
  disabled: 'opacity-40 pointer-events-none grayscale',
};

export default function StateInspector({ states = ['default', 'hover', 'focus', 'active', 'disabled'], children, onStateChange }) {
  const [activeState, setActiveState] = useState('default');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 bg-surface-variant/50 rounded-xl p-1">
        {states.map(state => (
          <button
            key={state}
            onClick={() => { setActiveState(state); onStateChange?.(state); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              activeState === state
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface'
            }`}
          >
            {state}
          </button>
        ))}
      </div>
      <div className={`transition-all duration-300 rounded-2xl ${stateStyles[activeState] || ''}`}>
        {typeof children === 'function' ? children(activeState) : children}
      </div>
    </div>
  );
}
