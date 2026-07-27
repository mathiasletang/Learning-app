import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import { resetAll } from '@/core/db';

describe('App — rendu de bout en bout', () => {
  beforeEach(async () => {
    await resetAll();
  });

  it('démarre, affiche l’accueil et navigue vers les questions', async () => {
    render(<App />);

    // L'ouverture éditoriale s'affiche une fois le store initialisé.
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /Reprenons/i })).toBeInTheDocument(),
    );
    // Les banques réelles sont chargées depuis le contenu.
    expect(screen.getByText(/Banques de questions/i)).toBeInTheDocument();

    // La navigation latérale mène à l'index des banques.
    await userEvent.click(screen.getByRole('link', { name: /^Questions$/i }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /Cinq banques/i })).toBeInTheDocument(),
    );
  });
});
