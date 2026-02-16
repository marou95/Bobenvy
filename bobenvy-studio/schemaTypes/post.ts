import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Actualités & Ressources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de l\'article',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Article de fond', value: 'article' },
          { title: 'News Agence', value: 'news' },
          { title: 'Ressource / Guide', value: 'resource' },
        ],
      },
      initialValue: 'article'
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait (pour la liste)',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      initialValue: 'Team Bobenvy'
    })
  ],
})