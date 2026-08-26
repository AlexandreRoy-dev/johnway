# Johnway

Site vitrine de **Johnway**, entreprise d’événementiel clé en main en Estrie (Québec) : location de chapiteaux, tentes, sono et matériel, installation, animation et services connexes.

Positionnement : un seul interlocuteur pour festivals, mariages et événements, du premier camion au dernier toast.

Charte : beige et brun, accent **vert forêt**, neutres **chocolat**.

## Lancer en local

```bash
npm install
npm run dev
```

Le site s’ouvre sur [http://127.0.0.1:43147](http://127.0.0.1:43147).

## Parcours

- **Accueil** : hero vidéo (arrivée de camion), services, catalogue avec prix, à propos, témoignages, contact
- **Matériel** : fiches produits, tarifs particuliers à la journée
- **Réservation** : panier + envoi de demande (particuliers)
- **Devis** : formulaire événement pour entreprises, festivals et municipal

Les formulaires passent par des routes API locales (`/api/reservation`, `/api/devis`) et confirment l’envoi. Branchez un courriel ou un CRM quand les identifiants sont prêts.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.

## Wordmark SVG

Le logo du site, **JOHNWAY.** en Barlow Condensed Bold, est fourni en deux fichiers vectoriels. Le point reste vert forêt (`#2f8f55`) dans les deux versions.

| Fichier | Lettres | Usage |
| --- | --- | --- |
| [`public/brand/johnway-logo-light.svg`](public/brand/johnway-logo-light.svg) | beige `#f4ebcf` | fonds sombres (comme le header inversé) |
| [`public/brand/johnway-logo-dark.svg`](public/brand/johnway-logo-dark.svg) | gris foncé `#2d2d2d` | fonds clairs |
