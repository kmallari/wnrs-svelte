<script lang="ts">
	import { browser } from '$app/environment';
	import { MenuCard } from '$lib/modules/MenuCard';
	import { categoryThemes } from '$lib/utils/themes';
	import { Loader } from '$lib/modules/Loader';
	import type { PageData } from './$types';
	export let data: PageData;

	$: categories = data.categories;
	$: pathname = data.pathname.split('/').pop() || '/';

	let clientLoaded = false;

	if (browser) {
		clientLoaded = true;
	}

	const themes = Object.keys(categoryThemes).reduce((acc, curr) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		acc[curr] = categoryThemes[curr].create;
		return acc;
	}, {});

	// console.log({ themes });
</script>

<main class="relative min-h-screen">
	{#if clientLoaded}
		<MenuCard header="Categories" menuItems={categories} prevRoute="/" {themes} {pathname} />
	{:else}
		<Loader />
	{/if}
</main>
