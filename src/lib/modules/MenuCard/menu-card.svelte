<script lang="ts">
	import { CardTemplate } from '$lib/modules/CardTemplate';
	import { Button } from '$lib/components/Button';
	import { normalCaseToKebabCase } from '$lib/utils/capitalizationHelpers';

	export let header: string;
	export let menuItems: Record<string, { displayName: string }>;
	export let prevRoute: string;
	export let themes: Record<string, string> | undefined = undefined;
	export let cardTheme: string = 'text-zinc-800 border-red-500';
	export let buttonTheme: string = '';
	export let pathname: string;

</script>

<CardTemplate theme={cardTheme}>
	<div class="flex h-full flex-col gap-4">
		<div>
			<a href={prevRoute}>
				<button class="h-8 w-8 rounded-md border border-b-4 border-zinc-800">{'<'}</button>
			</a>
			<h2 class="mt-4 text-3xl font-bold">{header}</h2>
		</div>
		<ul>
			{#each Object.keys(menuItems) as item}
				<li class="my-4">
					<a href="{pathname}/{normalCaseToKebabCase(item)}/">
						<Button theme={(themes && themes[item]) || buttonTheme}
							>{menuItems[item].displayName}</Button
						>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</CardTemplate>
