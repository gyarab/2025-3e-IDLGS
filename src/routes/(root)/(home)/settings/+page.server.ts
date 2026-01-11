import { formRunner } from '$lib/server/form/runner';
import { fail } from '@sveltejs/kit';

export const actions = {
	updatePersonalInfo: async (event) => {
		return await formRunner([''], async (
			event, formData, cookies, user
		) => {
			if(!user.canChangeSettings) return fail(403);
		});
	},	
	resetStreak: async (event) => {
		return await formRunner([''], async (
			event, formData, cookies, user
		) => {

		});
	},
	deleteAccount: async (event) => {
		return await formRunner([''], async (
			event, formData, cookies, user
		) => {
			if(!user.canChangeSettings) return fail(403);
		});
	},
	//pair for actions complementing
	editPersonalizationGame: async (event) => {
		return await formRunner([''], async (
			event, formData, cookies, user
		) => {
			if(!user.gamification) return fail(403);
		});
	},
	editPersonalization: async (event) => {
		return await formRunner([''], async (
			event, formData, cookies, user
		) => {
			if(user.gamification) return fail(403);
		});
	},
};
