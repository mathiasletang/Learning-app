/* =========================================================================
   L'emploi du temps d'ADE, lu par le serveur du site.

   Pourquoi une fonction et non une simple redirection : le serveur de
   l'université n'envoie pas d'en-tête CORS, donc le navigateur refuse de lire
   son fichier directement — il faut un intermédiaire. Une redirection en
   faisait office, mais quand elle échouait le navigateur n'annonçait qu'un
   « Failed to fetch » muet, impossible à diagnostiquer. Ici, chaque panne
   revient avec sa raison, en français, dans le corps de la réponse : c'est
   ce texte que le bandeau du planning affiche.

   Bénéfice conservé : l'adresse personnelle du flux, avec son jeton, reste
   sur le serveur et ne part pas dans le paquet JavaScript.
   ========================================================================= */

const FLUX =
  'https://ade25-edt.ut-capitole.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?data=85e44687e1f9f3bce466d6b763250e02ea8788bf661273b6eea88f88eea8b2ba2272ddeda3f0d6d2186b3007f886e39664a45b4b3d24fa442cda746606522eeb1734c074be874daa5e596df0122d69ceb6dae3922da8827f3c5f88c4ff251c2214a1e096c86a8c4438f46ca9703c81ad,1';

/** Au-delà, on considère qu'ADE ne répondra pas — mieux vaut le dire. */
const DELAI_MS = 20_000;

const echec = (raison) =>
  new Response(raison, {
    status: 502,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });

export default async function edt() {
  let reponse;
  try {
    reponse = await fetch(FLUX, {
      headers: { accept: 'text/calendar, text/plain' },
      signal: AbortSignal.timeout(DELAI_MS),
    });
  } catch (e) {
    const cause = e?.name === 'TimeoutError' ? 'délai dépassé' : (e?.message ?? 'cause inconnue');
    return echec(`le serveur d'ADE n'a pas répondu (${cause})`);
  }

  const texte = await reponse.text();

  if (!reponse.ok) {
    return echec(`le serveur d'ADE a répondu ${reponse.status}`);
  }
  /* Un lien de flux périmé ne renvoie pas une erreur : il renvoie une page de
     connexion, avec un code 200. Sans ce contrôle, l'application remplacerait
     l'emploi du temps par zéro cours. */
  if (!texte.includes('BEGIN:VCALENDAR')) {
    return echec("la réponse d'ADE n'est pas un calendrier (lien de flux périmé ?)");
  }

  return new Response(texte, {
    headers: {
      'content-type': 'text/calendar; charset=utf-8',
      // Une demi-heure : un changement de salle doit arriver, sans marteler ADE.
      'cache-control': 'public, max-age=1800',
    },
  });
}
