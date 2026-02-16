import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Réalisations (Portfolio)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du projet',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre (Court)',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Image Principale (Card)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bgVideo',
      title: 'Vidéo de fond (Modale)',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Format MP4 recommandé, max 10Mo pour la perf.'
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
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'description',
      title: 'Description courte (Card)',
      type: 'text',
      rows: 3
    }),
    // Contenu riche pour la page détail
    defineField({
      name: 'challenge',
      title: 'Le Challenge (Contexte)',
      type: 'text',
    }),
    defineField({
      name: 'solution',
      title: 'La Solution',
      type: 'array',
      of: [{ type: 'block' }] // Rich text
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
})