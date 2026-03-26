import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Actualités & Ressources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de l\'article',
      type: 'localeString', // Traduisible FR/EN
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.fr', maxLength: 96 }, // On se base sur le titre FR pour l'URL
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
      type: 'localeText', // Traduisible FR/EN
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'localeBlock', // Traduisible FR/EN (Rich Text)
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string', // Généralement l'auteur ne change pas selon la langue
      initialValue: 'Team Bobenvy'
    })
  ],
  preview: {
    select: {
      title: 'title.fr',
      author: 'author',
      media: 'mainImage'
    }
  }
})