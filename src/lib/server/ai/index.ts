import type { Ai } from "@cloudflare/workers-types";
import { CF_MODEL_ID } from "./prompt";
import { type AIMessageType } from "$lib/types";

//https://developers.cloudflare.com/workers-ai/
//https://developers.cloudflare.com/workers-ai/platform/limits/

//different system prompts for different tasks
export const makeSystemPrompt = (): string => {
	return ""; //TODO
}

export const sendRequest = async (ai: Ai, prompt: string, messages: AIMessageType[]): Promise<string> => {
	const messagesData = [
		{ role: "system", content: makeSystemPrompt() },
		...messages,
	];
	const response = await ai.run(CF_MODEL_ID, { 
		messages: messagesData,
		prompt: prompt,
		stream: false,
	});

	//TODO process response
	return "";
};