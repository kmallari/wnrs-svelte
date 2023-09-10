import categories from '$lib/server/decks/categories';
import { redirect } from '@sveltejs/kit';
import { kebabCaseToCamelCase } from '$lib/utils/capitalizationHelpers';
const validCategories = Object.keys(categories);

import mainDeck from '$lib/server/decks/mainDeck/index.js';
import crossover from '$lib/server/decks/crossover/index.js';
import expansion from '$lib/server/decks/expansion/index.js';
import online from '$lib/server/decks/online/index.js';
import self from '$lib/server/decks/self/index.js';

export const load = async ({ url }) => {
	const { pathname } = url;
	const category = kebabCaseToCamelCase(pathname.split('/')[2]);

	if (!validCategories.includes(category)) {
		throw redirect(301, '/');
	}

	const decksMap: Record<string, Record<string, { displayName: string }>> = {
		mainDeck,
		crossover,
		expansion,
		online,
		self
	};

	const decks = decksMap[category];

	return {
		decks
	};
};
