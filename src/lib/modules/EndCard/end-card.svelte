<script lang="ts">
	import type { DeckComplete, GameRoom } from '$lib/types';
	import CardTemplate from '../CardTemplate/card-template.svelte';
	import { deckThemes } from '$lib/utils/themes';
	import { Button } from '$lib/components/Button';
	export let deck: DeckComplete;
	export let gameRoomClient: GameRoom;
	export let playerNameInLocalStorage: string | null;

	const theme = deckThemes[deck.theme as keyof typeof deckThemes];

	// create a string of all the players in the game
	// comma separate the players and add an "and" before the last player
	// don't include playerNameInLocalStorage in the list
	const players = gameRoomClient.player_names
		? gameRoomClient.player_names
				.filter((player) => player !== playerNameInLocalStorage)
				.reduce((acc, curr, idx, arr) => {
					if (idx === 0) {
						return curr;
					} else if (idx === arr.length - 1) {
						return `${acc} and ${curr}`;
					} else {
						return `${acc}, ${curr}`;
					}
				}, '')
		: '';

	const displayPlayers =
		' with ' + `<span style={'font-family: "DM Mono", monospace;'}>` + players+ '.</span>';
</script>

<CardTemplate theme={theme.card}
	><div class="flex h-full flex-col justify-between text-center leading-relaxed">
		<div />
		<div class="space-y-4">
			<h1 class="text-4xl font-bold">Thank you for playing.</h1>
			<p class="leading-relaxed opacity-60">
				We hope you had fun playing the game {#if players}
					{@html displayPlayers}
				{:else}.
				{/if}
			</p>
		</div>
		<div class="flex flex-col gap-4">
			<p class="text-sm leading-relaxed opacity-60">
				Want to play again? Click the button below to go back to the home page.
			</p>
			<a href="/">
				<Button theme={theme.button}>Home</Button>
			</a>
		</div>
	</div></CardTemplate
>
