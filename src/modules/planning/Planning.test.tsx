import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { db, resetAll } from '@/core/db';
import { toDayStr, addDays } from '@/core/date';
import { completeEvent, createTask, scheduleTask, toggleTask } from '@/app/actions';
import { useApp } from '@/app/store';
import { Planning } from './Planning';

const TODAY = toDayStr();

function monter() {
  render(
    <MemoryRouter initialEntries={['/planning']}>
      <Planning />
    </MemoryRouter>,
  );
}

describe('Planning — le planning et les tâches ne font qu’un', () => {
  beforeEach(async () => {
    await resetAll();
    await useApp.getState().init();
  });

  it('crée une tâche en une frappe, depuis la journée', async () => {
    monter();
    const champ = await screen.findByLabelText('Nouvelle tâche du jour');
    await userEvent.type(champ, 'Finir la série 2{Enter}');

    await waitFor(async () => expect(await db.tasks.count()).toBe(1));
    const t = (await db.tasks.toArray())[0];
    expect(t.title).toBe('Finir la série 2');
    expect(t.due).toBe(TODAY); // la tâche atterrit sur la journée affichée
    expect(await screen.findByText('Finir la série 2')).toBeInTheDocument();
  });

  it('coche une tâche d’un clic, et la décoche', async () => {
    await createTask({ title: 'Lire le chapitre', priority: 'high', due: TODAY });
    monter();

    const case1 = await screen.findByRole('checkbox', { name: /Terminer « Lire le chapitre »/ });
    await userEvent.click(case1);
    await waitFor(async () => expect((await db.tasks.toArray())[0].doneAt).toBeTruthy());

    await userEvent.click(await screen.findByRole('checkbox', { name: /Rouvrir/ }));
    await waitFor(async () => expect((await db.tasks.toArray())[0].doneAt).toBeUndefined());
  });

  it('termine la séance : la tâche liée se coche et le temps rejoint le suivi', async () => {
    const tache = await createTask({
      title: 'Méthodes quantitatives',
      priority: 'high',
      due: TODAY,
      subject: 'cfa',
      minutes: 90,
    });
    await scheduleTask(tache, TODAY, '14:00', 90);
    monter();

    // La séance est là, avec son heure et sa durée.
    expect(await screen.findByText('Méthodes quantitatives')).toBeInTheDocument();
    expect(screen.getByText(/14:00 → 15:30/)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Marquer la séance comme terminée/ }));

    // Terminer une séance écrit plusieurs fois : on attend la fin de tout.
    await waitFor(async () => {
      expect((await db.events.toArray())[0].doneAt).toBeTruthy();
      // La tâche d'origine suit, sans qu'on ait à y toucher.
      expect((await db.tasks.get(tache.id))?.doneAt).toBeTruthy();
      // Et le temps passé rejoint le relevé commun, celui du Suivi.
      expect(await db.timeLogs.count()).toBe(1);
    });
    expect((await db.timeLogs.toArray())[0]).toMatchObject({
      date: TODAY,
      subject: 'cfa',
      minutes: 90,
    });
  });

  it('lance une séance : le chronomètre part et le travail s’ouvre', async () => {
    await db.events.put({
      id: 'e1',
      date: TODAY,
      start: '09:00',
      minutes: 60,
      title: 'Différentiabilité',
      subject: 'maths',
      link: '/fiche/differentiabilite',
      createdAt: new Date().toISOString(),
    });
    monter();

    await userEvent.click(await screen.findByRole('button', { name: /Commencer/ }));
    await waitFor(async () => expect((await db.events.get('e1'))?.startedAt).toBeTruthy());
    // La séance devient « en cours » : c'est « Terminer » qui prend la place.
    expect(await screen.findByRole('button', { name: 'Terminer' })).toBeInTheDocument();
  });

  it('fait renaître une tâche récurrente au lieu de la perdre', async () => {
    const tache = await createTask({
      title: '20 mots de vocabulaire',
      priority: 'mid',
      due: TODAY,
      repeat: 'daily',
    });
    await toggleTask(tache);

    const restantes = await db.tasks.toArray();
    expect(restantes).toHaveLength(2);
    const suivante = restantes.find((t) => !t.doneAt);
    expect(suivante?.due).toBe(addDays(TODAY, 1));
    expect(suivante?.repeat).toBe('daily');
  });

  it('affiche l’état vide, puis la semaine', async () => {
    monter();
    expect(await screen.findByText(/Rien de prévu/)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('tab', { name: 'Semaine' }));
    // Sept jours, du lundi au dimanche, cliquables.
    const semaine = await screen.findAllByRole('button', { name: /lun|mar|mer|jeu|ven|sam|dim/i });
    expect(semaine.length).toBeGreaterThanOrEqual(7);
  });

  it('conserve tout après un rechargement de la page', async () => {
    const tache = await createTask({ title: 'Exercices Faccanoni', priority: 'mid', due: TODAY });
    await scheduleTask(tache, TODAY, '09:00', 60);
    const event = (await db.events.toArray())[0];
    await completeEvent(event);

    // Nouveau montage : les données viennent d'IndexedDB, pas de la mémoire.
    monter();
    expect(await screen.findByText('Exercices Faccanoni')).toBeInTheDocument();
    expect(screen.getByText(/09:00 → 10:00/)).toBeInTheDocument();
    // La séance est marquée faite, avec le temps retenu.
    const carte = screen.getByText('Exercices Faccanoni').closest('.timeline__row')!;
    expect(carte).toHaveAttribute('data-done', 'true');
    // « 1 h » figure deux fois — la durée prévue et le temps retenu : on vise
    // la marque de fin, la seule qui atteste que la séance a bien été faite.
    expect(carte.querySelector('.plan__done')?.textContent).toContain('1 h');
  });
});
