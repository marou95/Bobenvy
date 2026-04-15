import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// --- CONFIGURATION ---
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'owylobqj',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'bobenvy-studio',
  // Conseil : passe à false pendant tes phases de dev intense pour éviter le cache
  useCdn: false, 
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// --- TYPES (Interfaces simplifiées pour les Slugs) ---

export interface HomeHero {
  title: string;
  subtitle: string;
  highlight?: string;
  videoUrl?: string;
}

export interface Project {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  mainImage: any;
  themeColors?: string[];
  tags?: string[];
  description?: string;
  challenge?: string;
  solution?: any[];
  gallery?: any[];
  publishedAt?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string; // Simplifié en string
  mainImage: any;
  category: string;
  publishedAt: string;
  excerpt: string;
  body?: any[];
  author?: string;
}

export interface LegalPage {
  title: string;
  content: any[];
}

// --- REQUÊTES PAGE D'ACCUEIL ---

export const getHomeHero = async (lang: string = 'fr'): Promise<HomeHero> => {
  return await client.fetch(`
    *[_id == "homeHero"][0] {
      "title": title[$lang],
      "subtitle": subtitle[$lang],
      "highlight": highlight[$lang],
      "videoUrl": backgroundVideo.asset->url
    }
  `, { lang });
};

// --- REQUÊTES PORTFOLIO (Projects) ---

export const getProjects = async (lang: string = 'fr'): Promise<Project[]> => {
  return await client.fetch(`
    *[_type == "project" && !(_id in path('drafts.**'))] | order(publishedAt desc) {
      _id,
      "title": title[$lang],
      "subtitle": subtitle[$lang],
      "slug": slug.current,
      mainImage,
      themeColors,
      tags,
      "description": description[$lang]
    }
  `, { lang });
};

export const getRecentProjects = async (lang: string = 'fr'): Promise<Project[]> => {
  return await client.fetch(`
    *[_type == "project" && !(_id in path('drafts.**'))] | order(publishedAt desc)[0...6] {
      _id,
      "title": title[$lang],
      "subtitle": subtitle[$lang],
      "slug": slug.current,
      mainImage,
      themeColors
    }
  `, { lang });
};

export const getProjectBySlug = async (slug: string, lang: string = 'fr'): Promise<Project> => {
  return await client.fetch(
    `*[_type == "project" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
      _id,
      "title": title[$lang],
      "subtitle": subtitle[$lang],
      mainImage,
      themeColors,
      tags,
      "description": description[$lang],
      "challenge": challenge[$lang], 
      "solution": solution[$lang], 
      gallery,
      "slug": slug.current
    }`,
    { slug, lang }
  );
};

// --- REQUÊTES RESSOURCES (Posts) ---

export const getPosts = async (lang: string = 'fr'): Promise<Post[]> => {
  return await client.fetch(`
    *[_type == "post" && !(_id in path('drafts.**'))] | order(publishedAt desc) {
      _id,
      "title": title[$lang],
      "slug": slug.current,
      mainImage,
      category,
      publishedAt,
      "excerpt": excerpt[$lang]
    }
  `, { lang });
};

export const getRecentPosts = async (lang: string = 'fr'): Promise<Post[]> => {
  return await client.fetch(`
    *[_type == "post" && !(_id in path('drafts.**'))] | order(publishedAt desc)[0...6] {
      _id,
      "title": title[$lang],
      "slug": slug.current,
      category,
      publishedAt,
      "excerpt": excerpt[$lang]
    }
  `, { lang });
};

export const getPostBySlug = async (slug: string, lang: string = 'fr'): Promise<Post> => {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
      _id,
      "title": title[$lang],
      mainImage,
      category,
      publishedAt,
      "excerpt": excerpt[$lang],
      "body": body[$lang],
      author,
      "slug": slug.current
    }`,
    { slug, lang }
  );
};

export const getLegalPage = async (lang: string = 'fr'): Promise<LegalPage> => {
  return await client.fetch(`
    *[_id == "legal"][0] {
      "title": title[$lang],
      "content": content[$lang]
    }
  `, { lang });
};