import { sendAIRequest } from '$lib/server/ai';
import { SYSTEM_PROMPT_BASE } from '$lib/server/ai/prompt';
import { formRunner } from '$lib/server/form/runner';

export const actions = {
	testAI: async (event) => {
		return await formRunner(
			['prompt'],
			async (event, formData, cookies, user) => {
				const prompt = formData['prompt'];

				return await sendAIRequest(
					event.platform?.env.AI!,
					prompt,
					SYSTEM_PROMPT_BASE,
					[],
				);
			},
		);
	},
};
