import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import { kebabCaseToCamelCase } from '$lib/utils/capitalizationHelpers';
import decks from '$lib/server/decks/index.js';
import instruction from '$lib/server/decks/instruction.json';
import type { DeckComplete, GameRoom } from '$lib/types.js';

const convertStringToNumbers = (inputString: string): number => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const resultArray: string[] = [];

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i].toUpperCase();
    if (alphabet.includes(char)) {
      const charPosition = alphabet.indexOf(char) + 1;
      resultArray.push(charPosition.toString());
    } else {
      resultArray.push(inputString[i]);
    }
  }

  return parseInt(resultArray.join(''));
};

function shuffle<T>(array: T[], seed: number): T[] {
  const shuffledArray = [...array];
  const random = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(random(seed) * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export const load = async ({ params }) => {
  const { gameRoom: code } = params;
  const res = await fetch(`${PUBLIC_API_URL}/game-room?code=${code}`);

  if (res.status === 404) {
    throw error(404, 'Game room not found');
  }

  if (!res.ok) {
    throw error(res.status, 'Failed to fetch game room');
  }

  const gameRoom = (await res.json()) as GameRoom;

  const deck = decks[
    kebabCaseToCamelCase(gameRoom.deck_name) as keyof typeof decks
  ] as DeckComplete;

  deck.questions = deck.questions.map((level) =>
    shuffle(
      level.map((str) => str.replace(/\s+/g, ' ').trim()),
      convertStringToNumbers(code),
    ),
  );

  return {
    gameRoom,
    deck,
    instruction,
  };
};
