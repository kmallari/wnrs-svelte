import decks from '$lib/server/decks/index.js';
import type { Deck } from '$lib/types.js';
import { kebabCaseToCamelCase } from '$lib/utils/capitalizationHelpers.js';

export const load = async ({ url }) => {
	const { pathname } = url;
	const deckName = pathname.split('/').pop() as string;
	const deck = decks[kebabCaseToCamelCase(deckName) as keyof typeof decks];

	return {
		deck: {
			id: deckName,
			name: deck.name,
			players: deck.players,
			backDesc: deck.backDesc,
			theme: deck.theme
		} as Deck
	};
};
