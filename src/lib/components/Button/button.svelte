<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let theme: string = 'border-red-200 text-red-500 hover:border-red-400';
	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';
	export let disabled: boolean = false;
</script>

<button
	{type}
	{disabled}
	on:click
	class={twMerge(
		'h-14 w-full rounded-lg border border-b-4 bg-white uppercase transition-all hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:transition-none disabled:hover:-translate-y-0',
		theme,
		$$restProps.class
	)}
>
	<slot />
</button>
