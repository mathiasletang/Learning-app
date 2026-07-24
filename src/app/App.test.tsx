import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import { resetAll } from '@/core/db';

describe('App — rendu de bout en bout', () => {
  beforeEach(async () => {
    await resetAll();
  });

  it('démarre, affiche le tableau de bord et navigue vers les QCM', async () => {
    render(<App />);
    // L'accueil s'affiche une fois le store initialisé.
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /Niveau 1/i })).toBeInTheDocument(),
    );

    // La navigation latérale mène aux banques de QCM.
    const quizLinks = screen.getAllByRole('link', { name: /QCM/i });
    await userEvent.click(quizLinks[0]);
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /Optimisation/i })).toBeInTheDocument(),
    );
  });
});
