<script lang="ts">
	import type { DeckComplete, GameRoom } from '$lib/types';
	import CardTemplate from '../CardTemplate/card-template.svelte';
	import { twMerge } from 'tailwind-merge';

	export let deck: DeckComplete;
	export let gameRoomClient: GameRoom | null;
	export let players: Array<string>;
	export let playerName: string;
	export let playerNameInLocalStorage: string | null;

	export let addPlayer: () => void;
	export let removePlayer: () => void;
	export let startGame: () => void;

	let copyText = 'Click to copy';
	let copyStyle = '';

	import { deckThemes } from '$lib/utils/themes';
	import { Button } from '$lib/components/Button';

	const theme = deckThemes[deck.theme as keyof typeof deckThemes];

	const copyCodeToClipboard = () => {
		const code = gameRoomClient?.code || '';
		const link = `${window.location.origin}/game/${code}`;
		if (!window.isSecureContext) {
			document.execCommand('copy', true, code);
		} else {
			navigator.clipboard.writeText(link);
		}
		copyText = 'Link copied!';
		copyStyle = 'bg-green-200 border-green-800';

		setTimeout(() => {
			copyText = 'Click to copy';
			copyStyle = '';
		}, 2000);
	};
</script>

<CardTemplate theme={theme.card}>
	<div class="flex h-full flex-col justify-between">
		<div class="flex flex-col gap-4">
			<h1 class="text-4xl font-bold">{deck.name}</h1>
			<p>{deck.backDesc}</p>
		</div>
		<div class="flex flex-col space-y-4">
			<h3>Game Code:</h3>
			<div class="relative w-full">
				<button
					class="peer z-20 w-fit font-mono text-2xl font-bold underline-offset-4 hover:underline"
					style={'font-family: "DM Mono", monospace;'}
					on:click={copyCodeToClipboard}
					>{gameRoomClient?.code}
				</button>
				<div class="absolute top-1/2 peer-hover:visible md:invisible">
					<span
						class={twMerge(
							'absolute left-[92px] z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm border-b border-l border-black bg-white  ',
							copyStyle
						)}
					/>
					<div
						class={twMerge(
							'absolute left-24  flex h-6 w-28 -translate-y-1/2 items-center justify-center rounded-md border  border-b-2 border-black bg-white text-zinc-800',
							copyStyle
						)}
					>
						{copyText}
					</div>
				</div>
			</div>
			<p class="text-sm opacity-60">Share the game room code/link to other players.</p>
		</div>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<div class="flex flex-col gap-1">
					<h2>Players</h2>
					<ol class="grid grid-cols-2">
						{#each players as player, i (player)}
							<li><span style={'font-family: "DM Mono", monospace;'}>{i + 1}.</span> {player}</li>
						{/each}
					</ol>
				</div>
				{#if playerNameInLocalStorage && players.includes(playerNameInLocalStorage)}
					<Button class="h-12" on:click={removePlayer} theme={theme.button}>Leave Game</Button>
				{:else if players.length < 4}
					<form
						class="flex flex-row gap-2"
						on:submit={(e) => {
							e.preventDefault();
						}}
					>
						<input
							class={twMerge(
								'h-10 w-5/6 rounded-md border border-b-4 px-4 text-slate-800 transition-all focus:-translate-y-1 focus:outline-none',
								theme.button,
								'bg-zinc-50'
							)}
							type="text"
							bind:value={playerName}
							placeholder="Your name..."
							maxlength="15"
						/>
						<Button
							type={'submit'}
							class="h-10 w-1/6 p-0 text-2xl font-light"
							on:click={addPlayer}
							theme={theme.button}>+</Button
						>
					</form>
				{:else}
					<Button class="h-10" disabled={true}>Game is full</Button>
				{/if}
			</div>
			<Button
				disabled={!players.includes(playerNameInLocalStorage || '')}
				on:click={startGame}
				theme={theme.button}>Start Game</Button
			>
		</div>
	</div>
</CardTemplate>
