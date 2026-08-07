import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { English } from './English';

describe('Anglais — page du lexique', () => {
  it('ouvre sur la liste, filtre à la recherche, puis lance une séance', async () => {
    const user = userEvent.setup();
    render(<English />);

    // La liste est là, plafonnée pour rester instantanée.
    expect(await screen.findByText(/Le mot juste/i)).toBeInTheDocument();
    const rows = document.querySelectorAll('.lexrow');
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.length).toBeLessThanOrEqual(200);

    // Recherche : le mot cherché figure dans les résultats.
    await user.type(screen.getByPlaceholderText(/Un mot anglais/i), 'budget');
    await waitFor(() => {
      expect(document.querySelectorAll('.lexrow').length).toBeLessThan(rows.length);
    });
    expect(screen.getAllByText(/budget/i).length).toBeGreaterThan(0);

    // Le sens d'interrogation s'inverse d'un geste.
    await user.click(screen.getByTitle('Changer le sens'));
    expect(screen.getByTitle('Changer le sens')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Français → Anglais'),
    );

    // Passage en mode « Apprendre » : réglage de séance puis démarrage.
    await user.click(screen.getByRole('tab', { name: 'Apprendre' }));
    const start = await screen.findByRole('button', { name: /Commencer/i });
    await user.click(start);

    expect(await screen.findByText(/Quel mot anglais/i)).toBeInTheDocument();
    expect(document.querySelectorAll('.choice')).toHaveLength(4);
  });
});
