import { browser } from '$app/environment'
import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime'

export const load = async (event) => {
	if(browser && event.data.user) {
		setLocale(event.data.user?.lang as Locale, { reload: false });
	}

	return {
		...event.data,
	}
}