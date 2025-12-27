import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultValue = 'en';
const initialValue = browser ? window.localStorage.getItem('language') || defaultValue : defaultValue;

export const language = writable(initialValue);

language.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('language', value);
  }
});

export const toggleLanguage = () => {
    language.update(current => current === 'en' ? 'it' : 'en');
};
