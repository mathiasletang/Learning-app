import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { English } from './English';

describe("Anglais — hub d'apprentissage", () => {
  it("ouvre sur la séance du jour, s'entraîne, puis consulte le dictionnaire", async () => {
    const user = userEvent.setup();
    render(<English />);

    // Niveau 1 : la page répond d'abord à « que faire maintenant ? ».
    expect(await screen.findByText(/Aujourd'hui/)).toBeInTheDocument();
    // Base vierge : la recommandation propose de découvrir du vocabulaire.
    expect(screen.getByText(/Découvrir de nouveaux mots/i)).toBeInTheDocument();

    // Niveau 2 : la progression est visible sans naviguer.
    expect(screen.getByText('À revoir')).toBeInTheDocument();
    expect(screen.getByText('Acquis')).toBeInTheDocument();

    // Niveau 3 : entraînement sur mesure — technique « Choix multiples ».
    await user.click(screen.getByRole('button', { name: 'Choix multiples' }));
    await user.click(screen.getByRole('button', { name: /Commencer/i }));
    expect(await screen.findByText(/Quelle traduction/i)).toBeInTheDocument();
    expect(document.querySelectorAll('.choice')).toHaveLength(4);

    // Sortie de séance, retour au hub.
    await user.click(screen.getByRole('button', { name: /Quitter la séance/i }));
    expect(await screen.findByText(/Aujourd'hui/)).toBeInTheDocument();

    // Le dictionnaire reste complet : liste plafonnée + recherche.
    await user.click(screen.getByRole('tab', { name: 'Dictionnaire' }));
    const rows = document.querySelectorAll('.lexrow');
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.length).toBeLessThanOrEqual(200);

    await user.type(screen.getByPlaceholderText(/Un mot anglais/i), 'budget');
    await waitFor(() => {
      expect(document.querySelectorAll('.lexrow').length).toBeLessThan(rows.length);
    });
    expect(screen.getAllByText(/budget/i).length).toBeGreaterThan(0);
  });
});
