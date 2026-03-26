import { defineField, defineType } from 'sanity'

/**
 * Note : Assure-toi que les types 'localeString', 'localeText' 
 * et 'localeBlock' sont bien définis dans ton dossier schemaTypes 
 * et importés dans ton index.ts.
 */

export default defineType({
  name: 'project',
  title: 'Réalisations (Portfolio)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du projet',
      type: 'localeString', // FR/EN
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'L’identifiant unique pour l’URL (commun aux deux langues)',
      options: { source: 'title.fr', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre (Court)',
      type: 'localeString', // FR/EN
    }),
    defineField({
      name: 'mainImage',
      title: 'Image Principale (Card)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'themeColor',
      title: 'Couleur du thème (Hex)',
      type: 'string',
      description: 'Ex: #CFB586. Utilisé pour les bordures et les accents.',
      initialValue: '#CFB586'
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Expertises',
      type: 'array',
      of: [{ type: 'string' }], // On peut garder les tags globaux ou les traduire aussi si besoin
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'description',
      title: 'Description courte (Card)',
      type: 'localeText', // FR/EN
    }),
    defineField({
      name: 'challenge',
      title: 'Le Challenge (Contexte)',
      type: 'localeText', // FR/EN
    }),
    defineField({
      name: 'solution',
      title: 'La Solution',
      type: 'localeBlock', // FR/EN (Rich Text)
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie Photos',
      type: 'array',
      of: [{ type: 'image' }]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
  ],
  // Titre en français dans la liste Sanity
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'subtitle.fr',
      media: 'mainImage'
    }
  }
})