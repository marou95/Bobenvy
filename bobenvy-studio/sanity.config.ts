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
            // On repasse sur un Singleton simple : un seul bouton pour un seul document
            S.listItem()
              .title('Accueil')
              .id('homeHero')
              .child(
                S.document()
                  .schemaType('homeHero')
                  .documentId('homeHero')
              ),
            S.listItem()
              .title('Mentions Légales')
              .id('legal')
              .child(
                S.document()
                  .schemaType('legal')
                  .documentId('legal')
              ),
            
            S.divider(),
            
            // On affiche le reste normalement (Projets, Posts)
            ...S.documentTypeListItems().filter(
              (listItem) => !['homeHero', 'legal'].includes(listItem.getId() || '')
            ),
          ]),
    }), 
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})