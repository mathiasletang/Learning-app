import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { allWords } from '@/core/lexicon';
import { English } from './English';

afterEach(async () => {
  cleanup();
  await db.vocabSrs.clear();
});

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

  it("priorise les mots dus, puis les erreurs, selon l'état de la mémoire", async () => {
    const today = toDayStr();
    const [a, b] = allWords();

    // État « mots dus » : la priorité du jour est la révision.
    await db.vocabSrs.put({ id: a.id, ef: 2.5, reps: 1, interval: 1, due: today, lapses: 0 });
    render(<English />);
    expect(await screen.findByText(/Priorité du jour/)).toBeInTheDocument();
    expect(await screen.findByText(/Réviser votre vocabulaire/)).toBeInTheDocument();
    cleanup();

    // État « rien de dû, mais des erreurs » : la priorité devient la consolidation.
    await db.vocabSrs.clear();
    await db.vocabSrs.put({ id: b.id, ef: 2.5, reps: 2, interval: 30, due: '2099-01-01', lapses: 3 });
    render(<English />);
    expect(await screen.findByText(/Renforcer vos mots fragiles/)).toBeInTheDocument();

    // L'objectif du jour et la ligne temporelle sont visibles.
    expect(screen.getByText(/Objectif du jour/)).toBeInTheDocument();
    expect(screen.getByText(/dans \d+ jours?/)).toBeInTheDocument();
  });
});
