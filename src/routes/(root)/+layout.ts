import { browser } from '$app/environment'
import { setLocale, type Locale } from '$lib/paraglide/runtime'

export const load = async (event) => {
	if(browser) {
		setLocale(event.data.user?.lang as Locale);
	}

	return {
		...event.data,
	}
}