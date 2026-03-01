import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AtomicBadge from '@/components/ui/AtomicBadge';

describe('AtomicBadge', () => {
  it('renders the level text', () => {
    render(<AtomicBadge level="Atom" />);
    expect(screen.getByText('Atom')).toBeInTheDocument();
  });

  it('applies different size classes', () => {
    const { rerender } = render(<AtomicBadge level="Molecule" size="sm" />);
    const badge = screen.getByText('Molecule');
    expect(badge).toHaveClass('text-[11px]');

    rerender(<AtomicBadge level="Molecule" size="lg" />);
    expect(screen.getByText('Molecule')).toHaveClass('text-sm');
  });

  it('applies correct color classes for each level', () => {
    render(<AtomicBadge level="Organism" />);
    expect(screen.getByText('Organism')).toHaveClass('bg-pink-100');
  });
});
