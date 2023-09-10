<script>
	import '../app.css';
	import { Toast } from '$lib/components/Toast';
	import { slidefade } from '$lib/utils/animation';
	export let data;

	$: pathname = data.pathname;
</script>

{#key pathname}
	<div
		in:slidefade={{ delay: 300, isEntering: true }}
		out:slidefade={{ delay: 0 }}
		class="relative min-h-screen"
	>
		<slot />
		<Toast />
	</div>
{/key}
