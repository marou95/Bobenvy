import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homeHero',
  title: 'Accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Grand Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 3,
      description: 'Utilisez la touche Entrée pour les retours à la ligne.',
    }),
    defineField({
      name: 'highlight',
      title: 'Texte mis en valeur (Doré)',
      type: 'string',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Vidéo de fond',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: 'Uploadez une vidéo courte (format MP4 recommandé, max 10-15Mo).',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contenu de la page d’accueil',
      };
    },
  },
});