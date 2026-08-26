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

Les formulaires sont envoyés par courriel via FormSubmit (`info@johnway.ca`). Confirmez l’adresse au premier envoi si besoin.

## Déploiement (johnway.ca)

GitHub Pages sert la branche `main`. À chaque push sur `main`, le workflow `.github/workflows/deploy.yml` exporte le site Next.js en statique (`out/`) et publie les fichiers à la racine du dépôt (`index.html`, `_next/`, etc.) avec un fichier `.nojekyll` pour désactiver Jekyll.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.

## Wordmark SVG

Le logo **JOHNWAY.** en Barlow Condensed Bold utilise un espacement serré (sans tracking additionnel), comme sur la signalétique camion. Deux fichiers vectoriels : le point reste vert forêt (`#2f8f55`).

Pour régénérer les SVG après un changement de tracking ou de police :

```bash
npm run generate:logos
```

| Fichier | Lettres | Usage |
| --- | --- | --- |
| [`public/brand/johnway-logo-light.svg`](public/brand/johnway-logo-light.svg) | beige `#f4ebcf` | fonds sombres (comme le header inversé) |
| [`public/brand/johnway-logo-dark.svg`](public/brand/johnway-logo-dark.svg) | gris foncé `#2d2d2d` | fonds clairs |
