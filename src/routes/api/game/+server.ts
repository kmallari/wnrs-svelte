import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import decks from '$lib/server/decks/index.js';
import { kebabCaseToCamelCase } from '$lib/utils/capitalizationHelpers';
import { PUBLIC_API_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ request }) => {
	const { deckId } = await request.json();

	const deck = decks[kebabCaseToCamelCase(deckId) as keyof typeof decks];

	if (!deck) {
		throw error(404, 'Deck not found');
	}

	const payload = {
		deck_name: deckId,
		levels_card_cnt: deck.questions.map((level) => level.length),
		levels_cnt: deck.levels.length
	};

	const res = await fetch(`${PUBLIC_API_URL}/game-room`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	if (!res.ok) {
		throw error(res.status, 'Failed to create game room');
	}

	const gameRoom = await res.json();

	return json({
		gameRoom
	});
};
