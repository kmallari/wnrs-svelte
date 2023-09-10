<script lang="ts">
	import type { DeckComplete, GameRoom } from '$lib/types';
	import CardTemplate from '../CardTemplate/card-template.svelte';
	import { deckThemes } from '$lib/utils/themes';
	import { Button } from '$lib/components/Button';
	import { twMerge } from 'tailwind-merge';

	export let deck: DeckComplete;
	export let gameRoomClient: GameRoom;
	export let instruction: any;
	export let playerNameInLocalStorage: string | null;
	export let nextCard: () => void;

	const theme = deckThemes[deck.theme as keyof typeof deckThemes];

	const levelMap = ['level_one', 'level_two', 'level_three'];
	const levelInstruction = instruction.levels[levelMap[gameRoomClient?.curr_level]];

	// create a function that finds the string "Reminder" or "Wild Card" in the question and add a ": \n" after it
	const addColon = (question: string) => {
		const reminderIdx = question.indexOf('Reminder ');
		const wildCardIdx = question.indexOf('Wild Card ');
		const colonIdx = question.indexOf(':');
		if (reminderIdx !== -1 && colonIdx === -1) {
			return question.replace('Reminder ', '<strong class="font-semibold">Reminder:\n</strong>');
		} else if (wildCardIdx !== -1 && colonIdx === -1) {
			return question.replace('Wild Card ', '<strong class="font-semibold">Wild Card:\n</strong>');
		} else {
			return question;
		}
	};
</script>

<CardTemplate theme={theme.card}>
	{#if !(playerNameInLocalStorage && gameRoomClient.player_names)}
		<div>!(playerNameInLocalStorage && gameRoomClient.player_names)</div>
	{:else}
		<div class="flex h-full flex-col justify-between gap-4">
			<section class="space-y-4">
				<button
					class="h-8 w-8 rounded-md border border-b-4 border-zinc-800 transition-transform hover:-translate-y-1"
					>{'<'}</button
				>
				<h1 class="text-2xl font-bold">
					{levelInstruction.label.replace(' -', ':')}
				</h1>
			</section>
			<div class="-mt-12 flex flex-col gap-8 whitespace-pre-wrap text-center">
				<h2 class="text-sm font-bold uppercase">
					Question {gameRoomClient.curr_card_idx} / {deck.questions[gameRoomClient.curr_level]
						.length}
				</h2>
				<hr class={twMerge(theme.card, 'mx-auto w-1/4')} />
				<p class="text-xl font-light leading-relaxed">
					{#if playerNameInLocalStorage && playerNameInLocalStorage === gameRoomClient.player_names[gameRoomClient.curr_player_idx]}
						{@html addColon(
							deck.questions[gameRoomClient.curr_level][gameRoomClient.curr_card_idx - 1]
						)}
					{:else}
						<span class="opacity-60"
							>It is <span style={"font-family: 'DM Mono', monospace;"}
								>{gameRoomClient.player_names[gameRoomClient.curr_player_idx]}</span
							>'s turn to ask and your turn to answer...</span
						>
					{/if}
				</p>
			</div>
			<div class="flex gap-4">
				<Button
					disabled={!(
						!!playerNameInLocalStorage &&
						playerNameInLocalStorage === gameRoomClient.player_names[gameRoomClient.curr_player_idx]
					)}
					theme={theme.button}
					class="h-12 w-24 "
					style={'font-family: "DM Mono", monospace;'}>{'<<'}</Button
				>
				<Button
					disabled={!(
						!!playerNameInLocalStorage &&
						playerNameInLocalStorage === gameRoomClient.player_names[gameRoomClient.curr_player_idx]
					)}
					theme={theme.button}
					class="h-12 text-sm"
					on:click={nextCard}>Next Card</Button
				>
				<Button
					disabled={!(
						!!playerNameInLocalStorage &&
						playerNameInLocalStorage === gameRoomClient.player_names[gameRoomClient.curr_player_idx]
					)}
					theme={theme.button}
					class="h-12 w-24 "
					style={'font-family: "DM Mono", monospace;'}>{'>>'}</Button
				>
			</div>
		</div>
	{/if}
</CardTemplate>
