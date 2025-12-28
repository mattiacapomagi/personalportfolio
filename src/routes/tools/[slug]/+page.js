import { getToolBySlug } from '$lib/data/tools.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const tool = getToolBySlug(params.slug);
  
  if (!tool) {
    throw error(404, 'Tool not found');
  }
  
  return { tool };
}
