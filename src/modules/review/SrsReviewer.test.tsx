import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SrsReviewer, type GradeButton, type ReviewItem } from './SrsReviewer';

const GRADES: GradeButton[] = [
  { grade: 0, label: 'Non', tone: 'again' },
  { grade: 3, label: 'À peu près', tone: 'hard' },
  { grade: 4, label: 'Oui', tone: 'good' },
  { grade: 5, label: 'Facile', tone: 'easy' },
];

const ITEMS: ReviewItem[] = [
  { id: 'w:1', front: 'stubborn', back: 'têtu' },
  { id: 'w:2', front: 'thorough', back: 'minutieux' },
];

function mount() {
  const onGrade = vi.fn();
  render(<SrsReviewer items={ITEMS} grades={GRADES} onGrade={onGrade} onExit={() => {}} />);
  return { onGrade };
}

describe('SrsReviewer — le retournement va dans les deux sens', () => {
  it('révèle la réponse au clic, puis revient à la question', async () => {
    mount();
    const carte = screen.getByRole('button', { name: /révéler la réponse/i });

    expect(screen.getByText('stubborn')).toBeInTheDocument();
    expect(screen.queryByText('têtu')).not.toBeInTheDocument();

    await userEvent.click(carte);
    expect(await screen.findByText('têtu')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Oui/ })).toBeInTheDocument();

    // Second appui : on repart de la question, et l'on ne peut plus se noter.
    await userEvent.click(screen.getByRole('button', { name: /revenir à la question/i }));
    expect(await screen.findByText('stubborn')).toBeInTheDocument();
    expect(screen.queryByText('têtu')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Oui/ })).not.toBeInTheDocument();
  });

  it('retourne aussi à la barre d’espace, dans les deux sens', async () => {
    mount();

    await userEvent.keyboard(' ');
    expect(await screen.findByText('têtu')).toBeInTheDocument();

    await userEvent.keyboard(' ');
    expect(await screen.findByText('stubborn')).toBeInTheDocument();
    expect(screen.queryByText('têtu')).not.toBeInTheDocument();
  });

  it('note la carte et passe à la suivante, face question', async () => {
    const { onGrade } = mount();

    await userEvent.keyboard(' ');
    await userEvent.keyboard('3');

    expect(onGrade).toHaveBeenCalledWith(ITEMS[0], 4);
    expect(await screen.findByText('thorough')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /révéler la réponse/i })).toBeInTheDocument();
  });
});
