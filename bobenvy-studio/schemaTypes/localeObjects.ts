// studio/schemaTypes/localeObjects.ts
import { defineField } from 'sanity'

export const localeString = {
  name: 'localeString',
  title: 'Texte localisé',
  type: 'object',
  fields: [
    defineField({ name: 'fr', title: 'Français', type: 'string' }),
    defineField({ name: 'en', title: 'Anglais', type: 'string' }),
  ],
}

export const localeText = {
  name: 'localeText',
  title: 'Bloc de texte localisé',
  type: 'object',
  fields: [
    defineField({ name: 'fr', title: 'Français', type: 'text', rows: 3 }),
    defineField({ name: 'en', title: 'Anglais', type: 'text', rows: 3 }),
  ],
}

export const localeBlock = {
  name: 'localeBlock',
  title: 'Contenu riche localisé',
  type: 'object',
  fields: [
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }]
    }),
    defineField({
      name: 'en',
      title: 'Anglais',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }]
    }),
  ],
}