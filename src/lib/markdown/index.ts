import markdownit from 'markdown-it'
import hljs from 'highlight.js';
import katex from 'katex';

let markdownInstance: markdownit;

export const MARKDOWN_CONFIG_OPTIONS = {
	html: true,
	linkify: true,
	typographer: true,
	xhtmlOut: true,
	langPrefix: 'language-',
	highlight: (str: string, lang: string) => {
		return hljs.highlightAuto(str, [lang]).value;
	},
	breaks: true,
};

export const initMdInstance = async () => {
	markdownInstance = markdownit(MARKDOWN_CONFIG_OPTIONS);
};


//remove script, add math and render with syntax highlighting
export const renderMarkdown = async (text: string): Promise<string> => {
	let markdown = text.replaceAll(/<script>(.*)<\/script>/gmsu, "").replaceAll(/<math>(.*)<\/math>/gmsu, (_match, p1) => {
		return katex.renderToString(p1, {
			throwOnError: false,
			fleqn: true,
			displayMode: true,
		});
	});

	return `<div class="markdownText">${markdownInstance.render(markdown)}</div>`;
};