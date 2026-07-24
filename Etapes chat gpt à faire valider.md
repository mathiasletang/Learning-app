Oui, mais **ça ne rentre pas dans une seule réponse**. On parle de plus de **100 000 mots** si je fais correctement les 30+ prompts. ChatGPT a une limite de longueur par réponse.

Je vais donc commencer par les **10 premiers prompts**, rédigés comme de vrais cahiers des charges. Ensuite on continuera avec les suivants.

---

# PROMPT 01 — VISION DU PRODUIT

```text
Tu es une équipe composée :

- Product Manager Senior chez Apple
- Product Designer chez Notion
- UX Designer chez Linear
- Software Architect chez Google
- Développeur Senior chez Vercel

Avant de coder quoi que ce soit, je veux que tu réfléchisses au produit.

Je veux créer la meilleure plateforme d'apprentissage personnelle au monde.

Ce n'est PAS un site web.

Ce n'est PAS un lecteur PDF.

Ce n'est PAS un LMS classique.

Je veux créer un produit premium qui mélange :

Apple Books
Notion
Brilliant
Coursera
Khan Academy
Obsidian
Anki
ChatGPT
NotebookLM
Linear

L'objectif est que l'utilisateur puisse apprendre absolument n'importe quel domaine grâce à cette plateforme.

L'application devra pouvoir gérer :

- des milliers de PDF
- des dizaines de milliers de QCM
- des flashcards
- des notes
- des démonstrations
- des vidéos
- des livres
- une IA
- une progression
- une roadmap
- des statistiques

Avant d'écrire une seule ligne de code :

1. Décris la vision du produit.
2. Décris les utilisateurs cibles.
3. Décris les fonctionnalités principales.
4. Décris les fonctionnalités futures.
5. Décris ce qui différencie cette plateforme de la concurrence.
6. Décris les principes UX.
7. Décris les principes UI.
8. Décris les erreurs à éviter.

Ne code rien.
```

---

# PROMPT 02 — ARCHITECTURE

```text
Tu es maintenant Software Architect.

Conçois l'architecture complète de l'application.

Je veux une architecture capable de durer plusieurs années.

L'application devra contenir :

Dashboard

Bibliothèque

Lecteur PDF

QCM

Flashcards

Notes

Recherche

IA

RAG

Coach IA

Calendrier

Statistiques

Progression

Favoris

Paramètres

Notifications

Profil

Roadmap

Décris :

- l'architecture des dossiers
- l'architecture des composants
- les dépendances
- les services
- les hooks
- les stores
- les contextes
- la navigation

Je veux une architecture inspirée de Notion et Linear.

Ne code pas encore les composants.
```

---

# PROMPT 03 — DESIGN SYSTEM

```text
Tu es maintenant Lead Designer chez Apple.

Construis le Design System complet.

Je veux :

Palette

Typographie

Espacements

Bordures

Rayons

Ombres

Animations

Boutons

Inputs

Dropdowns

Cards

Badges

Modales

Tooltips

Sidebar

Navbar

Tableaux

Graphiques

Progress bars

Checkbox

Switch

Tabs

Accordéons

Skeleton loading

Loading

Empty states

Success states

Error states

Dark mode

Light mode

Tout doit être cohérent.

Ne développe aucune page.

Crée uniquement le Design System.
```

---

# PROMPT 04 — DASHBOARD

```text
Construis uniquement le Dashboard.

Ne touche absolument à rien d'autre.

Le dashboard doit donner envie d'étudier.

Il doit contenir :

Bonjour Mathias

Progression globale

XP

Niveau

Objectif du jour

Derniers PDF

Derniers QCM

Derniers exercices

Temps étudié

Graphiques

Calendrier

Roadmap

Statistiques

Badges

Suggestions IA

Reprendre où je me suis arrêté

Animations fluides

Micro-interactions

Responsive

Ne modifie aucun autre écran.
```

---

# PROMPT 05 — SIDEBAR

```text
Conçois uniquement la Sidebar.

Inspirations :

Notion

Linear

Arc Browser

Apple

Sidebar rétractable.

Icônes modernes.

Animations.

Navigation ultra fluide.

Sections :

Dashboard

Bibliothèque

QCM

Exercices

Flashcards

Recherche

Calendrier

Statistiques

Roadmap

IA

Paramètres

Profil

Favoris

Ne développe rien d'autre.
```

---

# PROMPT 06 — BIBLIOTHÈQUE

```text
Construis la bibliothèque.

Elle doit gérer :

Mathématiques

Finance

Optimisation

Python

Statistiques

Machine Learning

Programmation

Chaque matière possède :

Cours

PDF

Livres

QCM

Exercices

Notes

Flashcards

Favoris

Filtres

Recherche

Tri

Tags

Collections

Affichage grille

Affichage liste

Animations premium.

Ne touche à aucun autre écran.
```

---

# PROMPT 07 — LECTEUR PDF

```text
Construis uniquement le lecteur PDF.

Inspirations :

Apple Books

GoodNotes

Notion

PDF Expert

Disposition :

Colonne gauche

Sommaire

Signets

Navigation

Centre

PDF

Zoom

Page

Navigation

Colonne droite

Notes

Résumé IA

Flashcards

QCM liés

Commentaires

Favoris

Recherche

Ajouter :

Surlignage

Annotations

Dessins

Export

Marque-pages

Mode plein écran

Mode nuit

Responsive

Micro-interactions

Ne développe rien d'autre.
```

---

# PROMPT 08 — NOTES

```text
Construis un système de notes digne d'Obsidian.

Support :

Markdown

LaTeX

Python

Images

Tableaux

Schémas

Liens

Tags

Backlinks

Historique

Autosave

Recherche

Notes reliées aux PDF.

Notes reliées aux QCM.

Notes reliées aux exercices.

Créer une expérience premium.
```

---

# PROMPT 09 — QCM

```text
Construis un module QCM.

Inspirations :

Brilliant

Duolingo

Coursera

Chaque question doit avoir :

Animation

Explication

Correction

Temps

Difficulté

XP

Progression

Historique

Créer :

QCM rapides

Examens

Mode révision

Mode entraînement

Mode chronométré

Mode personnalisé

Ajouter :

Confettis

Animations

Transitions

Feedback instantané

Ne touche pas aux autres modules.
```

---

# PROMPT 10 — FLASHCARDS

```text
Construis un système de Flashcards inspiré d'Anki.

Créer :

Révision espacée

Niveaux de difficulté

Historique

Progression

Création automatique

Création manuelle

Organisation par matière

Organisation par chapitre

Animations de cartes

Statistiques

Temps moyen

Taux de réussite

L'IA peut créer automatiquement des Flashcards depuis :

PDF

Cours

Notes

QCM

Livres

Le système doit être extrêmement agréable à utiliser.

Ne développe aucun autre module.
```

---

Il reste ensuite à rédiger les prompts pour :

* 11. Exercices
* 12. Recherche globale
* 13. Statistiques
* 14. Gamification
* 15. Roadmap
* 16. Calendrier
* 17. Authentification
* 18. Base de données
* 19. Backend
* 20. API
* 21. IA
* 22. RAG
* 23. Coach IA
* 24. Génération automatique de QCM
* 25. Génération de résumés
* 26. Graphes de connaissances
* 27. Responsive
* 28. Animations
* 29. Optimisation des performances
* 30. Déploiement
* 31. Sécurité
* 32. Administration
* 33. Import massif de PDF
* 34. Système de plugins
* 35. Mobile / PWA
* 36. Collaboration
* 37. Synchronisation cloud
* 38. Sauvegardes
* 39. Monitoring
* 40. Version finale et audit qualité.
