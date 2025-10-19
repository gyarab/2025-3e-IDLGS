const DEFAULT_MODEL = 'gpt-oss-20b';

export class AIService {
	private modelEndpoint: string = 'https://dgls.share.zrok.io/v1';

	constructor(endpoint: string = '') {
		if (endpoint) this.modelEndpoint = endpoint;
	}

	private extractMsg(text: string): string {
		const msgLabel = '<|message|>';
		const lastMsgIndex = text.lastIndexOf(msgLabel);
		if (lastMsgIndex !== -1) {
			return text.slice(lastMsgIndex + msgLabel.length).trim();
		}
		return text;
	}

	async generateResponse(prompt: string): Promise<string> {
		try {
			const response = await fetch(`${this.modelEndpoint}/completions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					skip_zrok_interstitial: '1'
				},
				body: JSON.stringify({
					model: DEFAULT_MODEL,
					// messages: [{ role: 'user', content: prompt }],
					prompt: prompt,
					max_tokens: 1000,
					stream: false
				})
			});

			if (!response.ok) {
				throw new Error(`AI request failed: ${response.statusText}`);
			}

			const data = await response.json();
			const fullText = data.choices[0].text;
			return this.extractMsg(fullText);
		} catch (error) {
			console.error('Error calling local AI:', error);
			throw error;
		}
	}

	async *streamResponse(prompt: string): AsyncGenerator<string, void, unknown> {
		try {
			const response = await fetch(`${this.modelEndpoint}/completions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					skip_zrok_interstitial: '1'
				},
				body: JSON.stringify({
					model: DEFAULT_MODEL,
					messages: [{ role: 'user', content: prompt }],
					max_tokens: 1000,
					stream: true
				})
			});

			if (!response.ok) {
				throw new Error(`AI request failed: ${response.statusText}`);
			}

			const reader = response.body?.getReader();
			if (!reader) {
				throw new Error('Response body is not readable');
			}

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = new TextDecoder().decode(value);
				yield chunk;
			}
		} catch (error) {
			console.error('Error streaming from local AI:', error);
			throw error;
		}
	}
}

// Export a default instance
export const aiService = new AIService();

// Export individual utility functions if needed
export async function quickAIResponse(prompt: string): Promise<string> {
	return aiService.generateResponse(prompt);
}
