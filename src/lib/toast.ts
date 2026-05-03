import { writable } from 'svelte/store';

export interface Toast {
	id: number;
	message: string;
	type: 'error' | 'success' | 'info';
}

export const toasts = writable<Toast[]>([]);

export const addToast = (message: string, type: Toast['type'] = 'info') => {
	const id = Date.now();
	toasts.update((all) => [{ id, message, type }, ...all]);

	setTimeout(() => {
		toasts.update((all) => all.filter((t) => t.id !== id));
	}, 4000);
};
