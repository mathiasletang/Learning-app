import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { db, resetAll } from '@/core/db';
import type { Flashcard } from '@/core/types';
import { Cards } from './Cards';

/* Cinq cartes de la matière Maths, aux états SRS volontairement disparates :
   c'est ce qu'on relira à la fin pour vérifier que le mode Cartes n'a rien
   replanifié. */
const DECK: Flashcard[] = [
  { id: 'fc:a1', front: 'Un', back: 'Réponse un', bank: 'opt', createdAt: '2026-01-01', ef: 2.5, reps: 0, interval: 0, due: '2026-01-01', lapses: 0 },
  { id: 'fc:a2', front: 'Deux', back: 'Réponse deux', bank: 'opt', createdAt: '2026-01-01', ef: 2.36, reps: 3, interval: 12, due: '2026-09-01', lapses: 1 },
  { id: 'fc:a3', front: 'Trois', back: 'Réponse trois', expl: 'Le détail qui éclaire', bank: 'opt', createdAt: '2026-01-01', ef: 2.7, reps: 5, interval: 40, due: '2026-12-24', lapses: 0 },
  { id: 'fc:a4', front: 'Quatre', back: 'Réponse quatre', bank: 'pre', createdAt: '2026-01-01', ef: 1.3, reps: 1, interval: 1, due: '2026-02-02', lapses: 4 },
  { id: 'fc:a5', front: 'Cinq', back: 'Réponse cinq', bank: 'opt', createdAt: '2026-01-01', ef: 2.5, reps: 2, interval: 6, due: '2026-03-03', lapses: 0 },
];

async function mount() {
  await db.flashcards.bulkPut(DECK.map((c) => ({ ...c })));
  render(
    <MemoryRouter initialEntries={['/cartes/maths']}>
      <Routes>
        <Route path="/cartes/:deck" element={<Cards />} />
      </Routes>
    </MemoryRouter>,
  );
  await waitFor(() => expect(document.querySelector('.cards__flip')).toBeInTheDocument());
}

/** La face exposée — l'autre est retirée de l'arbre d'accessibilité. */
function face(): HTMLElement {
  const el = document.querySelector('.cards__face:not([aria-hidden="true"])');
  if (!el) throw new Error('aucune face visible');
  return el as HTMLElement;
}

const counts = () => ({
  known: Number(document.querySelector('.cards__count--known')?.textContent),
  again: Number(document.querySelector('.cards__count--again')?.textContent),
});

const position = () =>
  document.querySelector('.cards__bar .tnum')?.textContent?.replace(/\s+/g, ' ').trim();

describe('Mode Cartes — parcours libre d’un paquet', () => {
  beforeEach(async () => {
    await resetAll();
    sessionStorage.clear();
  });

  it('montre le recto, puis le verso après un appui sur Espace', async () => {
    await mount();

    expect(within(face()).getByText('Un')).toBeInTheDocument();
    expect(document.querySelector('.cards__flip')).toHaveAttribute('data-flipped', 'false');

    await userEvent.keyboard(' ');

    await waitFor(() =>
      expect(document.querySelector('.cards__flip')).toHaveAttribute('data-flipped', 'true'),
    );
    expect(within(face()).getByText('Réponse un')).toBeInTheDocument();
    expect(within(face()).queryByText('Un')).not.toBeInTheDocument();
  });

  it('classe la carte à droite et à gauche, et avance dans les deux cas', async () => {
    await mount();
    expect(position()).toBe('1 / 5');

    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(counts().known).toBe(1));
    expect(counts().again).toBe(0);
    expect(position()).toBe('2 / 5');
    expect(within(face()).getByText('Deux')).toBeInTheDocument();

    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(counts().again).toBe(1));
    expect(counts().known).toBe(1);
    expect(position()).toBe('3 / 5');
  });

  it('revient en arrière et défait le classement de la carte quittée', async () => {
    await mount();

    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(position()).toBe('3 / 5'));
    expect(counts()).toEqual({ known: 1, again: 1 });

    // Retour arrière : la dernière carte classée « à revoir » redevient à classer.
    await userEvent.keyboard('{Backspace}');
    await waitFor(() => expect(position()).toBe('2 / 5'));
    expect(counts()).toEqual({ known: 1, again: 0 });
    expect(within(face()).getByText('Deux')).toBeInTheDocument();

    await userEvent.keyboard('{Backspace}');
    await waitFor(() => expect(position()).toBe('1 / 5'));
    expect(counts()).toEqual({ known: 0, again: 0 });
  });

  it('affiche l’écran de fin avec les bons totaux', async () => {
    await mount();

    await userEvent.keyboard('{ArrowRight}'); // Un — connue
    await userEvent.keyboard('{ArrowRight}'); // Deux — connue
    await userEvent.keyboard('{ArrowLeft}'); // Trois — à revoir
    await userEvent.keyboard('{ArrowRight}'); // Quatre — connue
    await userEvent.keyboard('{ArrowLeft}'); // Cinq — à revoir

    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /Paquet parcouru/i })).toBeInTheDocument(),
    );
    const figures = document.querySelectorAll('.figures .figure__value');
    expect([...figures].map((f) => f.textContent)).toEqual(['3', '2', '5']);
    expect(
      screen.getByRole('button', { name: /Rejouer les 2 cartes à revoir/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tout recommencer/i })).toBeInTheDocument();
  });

  it('ne touche à aucun champ SRS — c’est un mode de lecture', async () => {
    await mount();

    for (let i = 0; i < DECK.length; i++) {
      await userEvent.keyboard(' '); // on retourne
      await userEvent.keyboard(i % 2 === 0 ? '{ArrowRight}' : '{ArrowLeft}');
    }
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /Paquet parcouru/i })).toBeInTheDocument(),
    );

    const after = await db.flashcards.orderBy('id').toArray();
    expect(after).toEqual(DECK);
    // La révision espacée n'a rien enregistré non plus.
    expect(await db.vocabSrs.count()).toBe(0);
  });
});
