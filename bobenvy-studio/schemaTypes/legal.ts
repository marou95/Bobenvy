import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'legal',
  title: 'Mentions Légales',
  type: 'document',
  fields: [    
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'localeString', // Utilise l'objet FR/EN
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenu des mentions légales',
      type: 'localeBlock', // Utilise l'objet FR/EN pour le Rich Text
      description: 'Rédigez ici l\'intégralité de vos mentions légales, politique de confidentialité, etc.',
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
    },
    prepare({ title }) {
      return {
        title: title || 'Page des Mentions Légales',
      };
    },
  },
});