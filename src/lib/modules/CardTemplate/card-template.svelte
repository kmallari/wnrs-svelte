<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let theme: string = 'bg-red-600 text-white border-red-900';
</script>

<div
	class={twMerge(
		'absolute left-1/2 top-1/2 h-[95vh] w-80 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl border border-b-8 p-8 shadow-2xl sm:h-[90vh]',
		theme
	)}
>
	<slot />
</div>
