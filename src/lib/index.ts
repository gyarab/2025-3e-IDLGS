import { browser } from '$app/environment';

export const TEMP_ACCENT_COLOR = '#ff8800';

export const isInViewport = (element: HTMLElement): Promise<boolean> => {
	return new Promise((resolve) => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					observer.disconnect();
					resolve(true);
				}
			},
			{ root: null },
		);

		observer.observe(element);
	});
};

export const enableScroll = () => {
	if (!browser) return;

	document.body.style.overflow = '';
	document.body.style.maxHeight = 'none';
};

export const disableScroll = () => {
	if (!browser) return;

	document.body.style.overflow = 'hidden';
	document.body.style.maxHeight = '100svh';
};

export const darkenHex = (hex: string, amount: number): string => {
	let r = parseInt(hex.slice(-6, -4), 16);
	let g = parseInt(hex.slice(-4, -2), 16);
	let b = parseInt(hex.slice(-2), 16);

	r = Math.max(0, r - amount);
	g = Math.max(0, g - amount);
	b = Math.max(0, b - amount);

	return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
};

export const setDarkMode = async (enabled: boolean) => {
	await fetch('/?/setDarkMode', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `darkMode=${enabled ? 'dark' : 'light'}`,
	});
};
