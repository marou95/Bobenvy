// studio/schemaTypes/index.ts
import project from './project'
import post from './post'
import homeHero from './homeHero'
import legal from './legal'
import { localeString, localeText, localeBlock } from './localeObjects'

export const schemaTypes = [
    localeString,
    localeText,
    localeBlock,
    project,
    post,
    homeHero,
    legal
]