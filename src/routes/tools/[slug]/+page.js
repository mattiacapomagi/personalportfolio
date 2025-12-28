import { getToolBySlug } from '$lib/data/tools.js';
import { error } from '@sveltejs/kit';

// Client-side only - this page uses browser APIs (Canvas, DOM)
export const ssr = false;

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const tool = getToolBySlug(params.slug);
  
  if (!tool) {
    throw error(404, 'Tool not found');
  }
  
  return { tool };
}
