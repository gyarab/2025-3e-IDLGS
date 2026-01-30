import { isUserAuthorizedCourse } from '$lib/server/permission';
import { fail } from '@sveltejs/kit';
import { formRunner } from '$lib/server/form/runner';
import { writeLog } from '$lib/log.js';

export const load = async (event) => {
	return await event.parent();
};

export const actions = {
	updateSettings: async () => {
		return await formRunner(
			['uuid', 'name'],
			async (event, formData, cookies, user) => {
				if (
					(await isUserAuthorizedCourse(
						event.params.id!,
						user.uuid,
					)) === false
				) {
					return fail(403);
				}

				try {
					//TODO
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	addMessage: async () => {
		return await formRunner(
			['message'],
			async (event, formData, cookies, user) => {
				if (
					(await isUserAuthorizedCourse(
						event.params.id!,
						user.uuid,
					)) === false
				) {
					return fail(403);
				}

				try {
					//TODO
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	editMessage: async () => {
		return await formRunner([], async (event, formData, cookies, user) => {
			if (
				(await isUserAuthorizedCourse(event.params.id!, user.uuid)) ===
				false
			) {
				return fail(403);
			}
			try {
				//TODO
			} catch (e) {
				writeLog(event, 'ERROR', 'DB error', user);
				return fail(500);
			}
		});
	},
	deleteMessage: async () => {
		return await formRunner(
			['uuid'],
			async (event, formData, cookies, user) => {
				if (
					(await isUserAuthorizedCourse(
						event.params.id!,
						user.uuid,
					)) === false
				) {
					return fail(403);
				}
				try {
					//TODO
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
	addAssignment: async () => {
		return await formRunner([], async (event, formData, cookies, user) => {
			if (
				(await isUserAuthorizedCourse(event.params.id!, user.uuid)) ===
				false
			) {
				return fail(403);
			}
			try {
				//TODO
			} catch (e) {
				writeLog(event, 'ERROR', 'DB error', user);
				return fail(500);
			}
		});
	},
	editAssigment: async () => {
		return await formRunner([], async (event, formData, cookies, user) => {
			if (
				(await isUserAuthorizedCourse(event.params.id!, user.uuid)) ===
				false
			) {
				return fail(403);
			}
			try {
				//TODO
			} catch (e) {
				writeLog(event, 'ERROR', 'DB error', user);
				return fail(500);
			}
		});
	},
	deleteAssignment: async () => {
		return await formRunner(
			['uuid'],
			async (event, formData, cookies, user) => {
				if (
					(await isUserAuthorizedCourse(
						event.params.id!,
						user.uuid,
					)) === false
				) {
					return fail(403);
				}
				try {
					//TODO
				} catch (e) {
					writeLog(event, 'ERROR', 'DB error', user);
					return fail(500);
				}
			},
		);
	},
};
