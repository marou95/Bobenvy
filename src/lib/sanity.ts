import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// --- CONFIGURATION ---
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'owylobqj',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'bobenvy-studio',
  useCdn: true, 
  apiVersion: '2023-05-03',
});

// Helper pour les images
const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// --- TYPES (Interfaces) ---

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
  slug: { current: string };
  mainImage: any;
  themeColor?: string;
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
  slug: { current: string };
  mainImage: any;
  category: string;
  publishedAt: string;
  excerpt: string;
  body?: any[];
  author?: string;
}

// --- REQUÊTES PAGE D'ACCUEIL ---

export const getHomeHero = async (): Promise<HomeHero> => {
  return await client.fetch(`
    *[_type == "homeHero"][0] {
      title,
      subtitle,
      highlight,
      "videoUrl": backgroundVideo.asset->url
    }
  `);
};

// --- REQUÊTES PORTFOLIO (Projects) ---

// 1. Récupérer TOUS les projets (Page Portfolio)
export const getProjects = async (): Promise<Project[]> => {
  return await client.fetch(`
    *[_type == "project"] | order(publishedAt desc) {
      _id,
      title,
      subtitle,
      slug,
      mainImage,
      themeColor,
      tags,
      description
    }
  `);
};

// 2. Récupérer les 3 derniers projets (PortfolioPreview sur la Home)
export const getRecentProjects = async (): Promise<Project[]> => {
  return await client.fetch(`
    *[_type == "project"] | order(publishedAt desc)[0...3] {
      _id,
      title,
      subtitle,
      slug,
      mainImage,
      themeColor
    }
  `);
};

// Récupérer un projet complet avec contenu riche
export const getProjectBySlug = async (slug: string): Promise<Project> => {
  return await client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      subtitle,
      mainImage,
      themeColor,
      tags,
      description,
      challenge, 
      solution, 
      gallery,
      "slug": slug.current
    }`,
    { slug }
  );
};

// --- REQUÊTES RESSOURCES (Posts) ---

// 1. Récupérer TOUS les articles (Page Ressources)
export const getPosts = async (): Promise<Post[]> => {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      category,
      publishedAt,
      excerpt
    }
  `);
};

// 2. Récupérer les 3 derniers articles (ResourcesPreview sur la Home)
export const getRecentPosts = async (): Promise<Post[]> => {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      category,
      publishedAt,
      excerpt
    }
  `);
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      mainImage,
      category,
      publishedAt,
      excerpt,
      body,
      author,
      "slug": slug.current
    }`,
    { slug }
  );
};