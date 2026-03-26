import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Bobenvy',

  projectId: 'owylobqj',
  dataset: 'bobenvy-studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu du site')
          .items([
            S.listItem()
              .title('Hero Accueil')
              .id('homeHero')
              .child(
                S.document()
                  .schemaType('homeHero')
                  .documentId('homeHero')
              ),
            
            S.divider(),
            
            ...S.documentTypeListItems().filter(
              (listItem) => !['homeHero'].includes(listItem.getId() || '')
            ),
          ]),
    }), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})