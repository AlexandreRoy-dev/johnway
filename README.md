# Johnway

Site vitrine de **Johnway**, entreprise d’événementiel clé en main en Estrie (Québec) : location de chapiteaux, tentes, sono et matériel, installation, animation et services connexes.

Positionnement : un seul interlocuteur pour festivals, mariages et événements — du premier camion au dernier toast.

Charte dérivée de la compagnie sœur [Winslow Dancers](https://demo.danseurswinslow.ca/) : beige et brun conservés, orange remplacé par un **vert forêt**, bleu marine remplacé par un **chocolat** plus neutre.

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
