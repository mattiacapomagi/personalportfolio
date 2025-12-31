import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import previewGenerator from './vite-plugin-preview-generator.js';

export default defineConfig({
	plugins: [sveltekit(), imagetools(), previewGenerator()]
});
