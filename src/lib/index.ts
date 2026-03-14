import { browser } from "$app/environment";

export const TEMP_ACCENT_COLOR = "#ff8800";

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