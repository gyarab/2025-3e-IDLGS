import { TEMP_ACCENT_COLOR } from '$lib';

//TODO cookies for open and close states of navbar, sidebar
export const load = async (event) => {
	return {
		color: TEMP_ACCENT_COLOR,
		darkMode: event.cookies.get('darkMode') == 'dark',
	};
};
