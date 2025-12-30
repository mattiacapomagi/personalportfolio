/**
 * Theme store for dark/light mode management
 * - 'system' = follow OS preference
 * - 'light' = force light mode
 * - 'dark' = force dark mode
 */
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'theme-preference';

function getInitialTheme() {
  // Always default to 'system' on load as requested ("SEMPRE in modalità auto")
  return 'system';
}

const themePreference = writable(getInitialTheme());

if (browser) {
  themePreference.subscribe((value) => {
    localStorage.setItem(STORAGE_KEY, value);
  });
}

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
