import { browser } from '$app/environment';
import { extractLocaleFromNavigator, setLocale, type Locale } from '$lib/paraglide/runtime';

export const load = async (event) => {
	if (browser && event.data.user) {
		if(event.data.user?.lang !== 'any') {
			setLocale(event.data.user?.lang as Locale, { reload: false });
		}
		else {
			setLocale(extractLocaleFromNavigator() as Locale, { reload: false });
		}
	}

	return {
		...event.data,
	};
};
