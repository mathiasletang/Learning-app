import { describe, it, expect, beforeEach } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { resetAll } from '@/core/db';
import { contrast } from '@/core/palette';
import { useApp } from './store';
import { ThemeToggle } from './ThemeToggle';

const root = () => document.documentElement;
const cssVar = (name: string) => root().style.getPropertyValue(name).trim();

async function ouvrirLePanneau() {
  render(<ThemeToggle />);
  await userEvent.click(screen.getByRole('button', { name: /apparence/i }));
  return screen.findByRole('radio', { name: /Personnalisé/ });
}

describe('Apparence — le mode personnalisé', () => {
  beforeEach(async () => {
    await resetAll();
    localStorage.clear();
    root().removeAttribute('style');
    await act(() => useApp.getState().init());
  });

  it('dérive toute la palette de la couleur choisie, sans bouton « Appliquer »', async () => {
    const perso = await ouvrirLePanneau();
    expect(cssVar('--accent-solid')).toBe(''); // rien n'est posé par défaut

    await userEvent.click(perso);
    await waitFor(() => expect(useApp.getState().prefs.theme).toBe('custom'));

    await userEvent.click(screen.getByRole('button', { name: 'Vert' }));
    await waitFor(() => expect(useApp.getState().prefs.accent).toBe('#1f9254'));

    // La famille entière est posée, pas seulement la couleur cliquée.
    for (const nom of ['--accent', '--accent-solid', '--accent-hover', '--accent-wash', '--ring']) {
      expect(cssVar(nom)).toMatch(/^#[0-9a-f]{6}$/i);
    }
    // Et elle tient le contrat de lisibilité sur le fond en place.
    const fond = root().dataset.theme === 'dark' ? '#101218' : '#f4f5f8';
    expect(contrast(cssVar('--accent'), fond)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(cssVar('--on-accent'), cssVar('--accent-solid'))).toBeGreaterThanOrEqual(4.5);
  });

  it('ne teinte que l’accent : le fond neutre reste celui des jetons', async () => {
    const perso = await ouvrirLePanneau();
    await userEvent.click(perso);
    await userEvent.click(screen.getByRole('button', { name: 'Rose' }));
    await waitFor(() => expect(cssVar('--accent-solid')).not.toBe(''));

    // Aucun jeton neutre n'est écrasé en ligne — ni fond, ni encre, ni filet.
    for (const nom of ['--canvas', '--surface', '--ink', '--ink-2', '--hairline']) {
      expect(cssVar(nom)).toBe('');
    }
  });

  it('retrouve le thème après un redémarrage', async () => {
    const perso = await ouvrirLePanneau();
    await userEvent.click(perso);
    await userEvent.click(screen.getByRole('button', { name: 'Orange' }));
    await waitFor(() => expect(cssVar('--accent-solid')).not.toBe(''));
    const avant = cssVar('--accent-solid');

    // Fermeture puis réouverture de l'application.
    root().removeAttribute('style');
    await act(() => useApp.getState().init());

    expect(useApp.getState().prefs.theme).toBe('custom');
    expect(useApp.getState().prefs.accent).toBe('#e07414');
    expect(cssVar('--accent-solid')).toBe(avant);
    // Le miroir localStorage sert le tout premier paint, avant IndexedDB.
    expect(JSON.parse(localStorage.getItem('atelier.accent') ?? '{}')).toHaveProperty('light');
  });

  it('laisse les modes Clair et Sombre intacts', async () => {
    const perso = await ouvrirLePanneau();
    await userEvent.click(perso);
    await waitFor(() => expect(cssVar('--accent-solid')).not.toBe(''));

    await userEvent.click(screen.getByRole('radio', { name: /Sombre/ }));
    await waitFor(() => expect(root().dataset.theme).toBe('dark'));
    // Plus rien en ligne : l'application retrouve l'indigo de tokens.css.
    expect(cssVar('--accent-solid')).toBe('');
    expect(cssVar('--accent')).toBe('');

    await userEvent.click(screen.getByRole('radio', { name: /Clair/ }));
    await waitFor(() => expect(root().dataset.theme).toBe('light'));
    expect(cssVar('--accent-solid')).toBe('');
    expect(localStorage.getItem('atelier.accent')).toBeNull();
  });

  it('module l’intensité sans perdre le contraste', async () => {
    const perso = await ouvrirLePanneau();
    await userEvent.click(perso);
    await userEvent.click(screen.getByRole('button', { name: 'Violet' }));
    await waitFor(() => expect(cssVar('--accent-wash')).not.toBe(''));
    const intense = cssVar('--accent-wash');

    // Curseur poussé à fond du côté discret.
    fireEvent.change(screen.getByRole('slider', { name: /Intensité/i }), {
      target: { value: '0' },
    });

    await waitFor(() => expect(useApp.getState().prefs.accentIntensity).toBe(0));
    expect(cssVar('--accent-wash')).not.toBe(intense);
    const fond = root().dataset.theme === 'dark' ? '#101218' : '#f4f5f8';
    expect(contrast(cssVar('--accent'), fond)).toBeGreaterThanOrEqual(4.5);
  });
});
