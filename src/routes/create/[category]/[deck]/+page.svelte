<script lang="ts">
	import { browser } from '$app/environment';
	import { DeckDetailsCard } from '$lib/modules/DeckDetailsCard';
	import { Loader } from '$lib/modules/Loader';
	import type { PageData } from './$types';
	export let data: PageData;

	let clientLoaded = false;

	if (browser) {
		clientLoaded = true;
	}

	const pathname = data.pathname.split('/').pop() || '/';
	const prevRoute = data.pathname.split('/').slice(0, -1).join('/') || '/';
	const deck = data.deck;

	// console.log({ deck });
</script>

<main class="relative min-h-screen">
	{#if clientLoaded}
		<DeckDetailsCard {prevRoute} {deck} />
	{:else}
	<Loader />
	{/if}
</main>
