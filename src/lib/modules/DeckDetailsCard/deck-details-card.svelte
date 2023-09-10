<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button/button.svelte';
	import { CardTemplate } from '$lib/modules/CardTemplate';
	import type { Deck } from '$lib/types';
	import { deckThemes } from '$lib/utils/themes';
	export let prevRoute: string;
	export let deck: Deck;
	const theme = deckThemes[deck.theme as keyof typeof deckThemes];
	console.log({ theme });
</script>

<CardTemplate theme={theme.card}>
	<div class="flex h-full flex-col justify-between gap-4">
		<div>
			<a href={prevRoute}>
				<button class="h-8 w-8 rounded-md border border-b-4 border-zinc-800">{'<'}</button>
			</a>
			<h2 class="my-4 text-4xl font-bold">{deck.name}</h2>
			<p class="mt-4 text-lg">{deck.backDesc}</p>
		</div>
		<div class="flex flex-col gap-4">
			<p class="text-sm">Recommended for {deck.players} players.</p>
			<Button
				theme={theme.button}
				on:click={async (e) => {
					e.preventDefault();
					const res = await fetch(`/api/game`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ deckId: deck.id })
					});
					const json = (await res.json()).gameRoom;
					goto(`/game/${json.code}`);
				}}>Start</Button
			>
		</div>
	</div>
</CardTemplate>
