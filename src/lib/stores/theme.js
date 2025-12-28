/**
 * Theme store for dark/light mode management
 * - 'system' = follow OS preference
 * - 'light' = force light mode
 * - 'dark' = force dark mode
 */
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'theme-preference';

// Get initial value from localStorage or default to 'system'
function getInitialTheme() {
  if (!browser) return 'system';
  return localStorage.getItem(STORAGE_KEY) || 'system';
}

// Create the store
const themePreference = writable(getInitialTheme());

// Subscribe to changes and save to localStorage
if (browser) {
  themePreference.subscribe((value) => {
    localStorage.setItem(STORAGE_KEY, value);
  });
}

// Helper function to get the resolved theme (light or dark)
export function getResolvedTheme(preference) {
  if (preference === 'system') {
    if (browser && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  return preference;
}

// Cycle through themes: system -> light -> dark -> system
export function cycleTheme(current) {
  if (current === 'system') return 'light';
  if (current === 'light') return 'dark';
  return 'system';
}

export { themePreference };
