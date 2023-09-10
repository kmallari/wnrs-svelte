<script lang="ts">
	import { Button } from '$lib/components/Button';
	import { slidefade } from '$lib/utils/animation';
	let visible = true;
	$: console.log(visible);
</script>

<main>
	<Button
		on:click={() => {
			visible = !visible;
		}}>Trigger</Button
	>
	{#if visible}
		<div
			in:slidefade={{ delay: 300, isEntering: true }}
			out:slidefade={{ delay: 0 }}
			class="h-20 w-20 bg-red-400"
		>
			Hello
		</div>
	{:else}
		<div
			in:slidefade={{ delay: 300, isEntering: true }}
			out:slidefade={{ delay: 0 }}
			class="h-20 w-20 bg-blue-400"
		>
			Hi
		</div>
	{/if}
</main>
