import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			$lib: 'src/lib/',
			$src: 'src/',
		},
		csp: {
			directives: {
				'default-src': ['none'],
				'font-src': ['self', 'fonts.gstatic.com', 'data:'],
				'script-src': [
					'self',
					'captcha.martinbykov.eu',
					'cdn.jsdelivr.net/npm/@cap.js/',
					'blob:',
					'wasm-unsafe-eval',
					'ajax.googleapis.com',
				],
				'object-src': ['self'],
				'img-src': ['self', 'res.cloudinary.com', 'data:', 'blob:'],
				//sveltekit announcer issue + we use this
				'style-src': ['self', 'fonts.googleapis.com', 'unsafe-inline', 'https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css'],
				'frame-ancestors': ['self'],
				'connect-src': [
					'cdn.jsdelivr.net/npm/@cap.js/',
					'self',
					'captcha.martinbykov.eu',
				],
				'frame-src': ['*'],
				'media-src': ['self'],
				'base-uri': ['self'],
			},
			// must be specified with either the `report-uri` or `report-to` directives, or both
			reportOnly: {
				'report-uri': ['/'],
			},
			mode: 'auto',
		},
		adapter: adapter(),
		csrf: {
			trustedOrigins: ['https://ucebnice.martinbykov.eu'],
		},
		paths: {
			base: '',
			assets: '',
		},
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) =>
			filename.includes('node_modules') ? undefined : { runes: true },
	},
};

export default config;
