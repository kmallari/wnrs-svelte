<script lang="ts">
	import { Button } from '$lib/components/Button';

	import type { DeckComplete, GameRoom } from '$lib/types';
	import CardTemplate from '../CardTemplate/card-template.svelte';

	export let deck: DeckComplete;
	export let instruction: any;
	export let gameRoomClient: GameRoom;
	export let nextCard: () => void;

	import { deckThemes } from '$lib/utils/themes';
	const theme = deckThemes[deck.theme as keyof typeof deckThemes];

	const levelMap = ['level_one', 'level_two', 'level_three'];
	const levelInstruction = instruction.levels[levelMap[gameRoomClient?.curr_level]];
</script>

<CardTemplate theme={theme.card}>
	<div class="flex h-full flex-col justify-between space-y-4">
		<section class="space-y-4">
			<h1 class="text-4xl font-bold">{levelInstruction.label.replace(' -', ':')}</h1>
			<p class="text-sm leading-relaxed">{levelInstruction.content}</p>
		</section>
		<Button theme={theme.button} on:click={nextCard}>Start Level</Button>
	</div>
</CardTemplate>
