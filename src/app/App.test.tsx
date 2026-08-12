import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import { resetAll } from '@/core/db';

describe('App — rendu de bout en bout', () => {
  beforeEach(async () => {
    await resetAll();
  });

  it('démarre sur l’accueil recentré et navigue par matière', async () => {
    render(<App />);

    // L'ouverture éditoriale s'affiche une fois le store initialisé.
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /Reprenons/i })).toBeInTheDocument(),
    );
    // Les trois fronts sont là ; la mémoire est à jour sur une base vierge.
    expect(screen.getByText(/Vos trois fronts/i)).toBeInTheDocument();
    expect(screen.getByText(/Mémoire à jour/i)).toBeInTheDocument();

    // La navigation mène à la page matière et à son gabarit commun.
    await userEvent.click(screen.getByRole('link', { name: /^Maths$/i }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /^Maths$/i })).toBeInTheDocument(),
    );
    expect(screen.getByRole('tab', { name: /S'exercer/i })).toBeInTheDocument();

    // S'exercer liste les banques de la matière — et seulement les siennes.
    await userEvent.click(screen.getByRole('tab', { name: /S'exercer/i }));
    await waitFor(() =>
      expect(screen.getByText(/Économie et économétrie/i)).toBeInTheDocument(),
    );
    expect(screen.getByText(/Prérequis/i)).toBeInTheDocument();
    expect(screen.queryByText(/CFA Level I/i)).not.toBeInTheDocument();
  });

  it('regroupe le suivi sur une seule page', async () => {
    window.location.hash = '#/suivi';
    render(<App />);

    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /^Suivi$/i })).toBeInTheDocument(),
    );
    // Objectif, activité, temps et données vivent au même endroit.
    expect(screen.getByText(/Objectif quotidien/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Activité/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Temps de travail/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Vos données/i })).toBeInTheDocument();
    window.location.hash = '';
  });

  it('redirige les anciens chemins vers la nouvelle carte', async () => {
    window.location.hash = '#/planning';
    render(<App />);
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /^Suivi$/i })).toBeInTheDocument(),
    );
    window.location.hash = '';
  });
});
