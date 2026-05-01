import { browser } from '$app/environment';

export const DEFAULT_ACCENT_COLOR = '#ff8800';

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

export const setNavbarOpen = async (enabled: boolean) => {
	await fetch('/?/setNavbarOpen', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `navbarOpen=${enabled ? 'true' : 'false'}`,
	});
};

export const setSidebarOpen = async (enabled: boolean) => {
	await fetch('/?/setSidebarOpen', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `sidebarOpen=${enabled ? 'true' : 'false'}`,
	});
};

export const getDateTimeString = (date: Date): string => {
	let string = '';

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	string += day.toString() + '.';
	string += month.toString() + '.';
	string += year.toString() + ' ';
	string += hours.toString() + ':';
	string += minutes.toString().padStart(2, '0');

	return string;
};

export const makeHex = (r: number, g: number, b: number): string =>
	'#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

export const getRGBFromHex = (color: string): number[] => {
	return [
		parseInt(color.slice(-6, -4), 16),
		parseInt(color.slice(-4, -2), 16),
		parseInt(color.slice(-2), 16),
	];
} 