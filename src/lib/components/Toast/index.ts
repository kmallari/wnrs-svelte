import { writable } from 'svelte/store';

export const TOAST_DURATION = 3000;

export const message = writable('');
export const show = writable(false);

export { default as Toast } from './toast.svelte';
