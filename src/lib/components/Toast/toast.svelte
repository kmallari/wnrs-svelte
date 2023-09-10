<script lang="ts">
	import { slide } from 'svelte/transition';
	import { message, show, TOAST_DURATION } from './index';

	let displayMessage: string;
	let showToast: boolean;

	message.subscribe((value) => {
		displayMessage = value;
	});

	show.subscribe((value) => {
		showToast = value;
		if (value) {
			setTimeout(() => {
				showToast = false;
				show.set(false);
			}, TOAST_DURATION);
		}
	});

	const enterFromTop = (node: Element, params: any) => {
		return {
			delay: params.delay || 0,
			duration: params.duration || 300,
			css: (t: number) => {
				return `transform: translateY(${(t - 1) * 100}%); opacity: ${t}; transition: transform ${
					params.duration
				}ms ease-in-out, opacity ${
					params.duration
				}ms ease-in-out; left:50%; transform: translateX(-50%);`;
			}
		};
	};
</script>

{#if showToast}
	<div
		class="absolute left-1/2 top-10 w-72 -translate-x-1/2 rounded-lg border border-b-4 border-red-700 bg-red-500 p-4 text-white shadow-2xl shadow-black/60"
		transition:enterFromTop={{ delay: 0, duration: 200 }}
	>
		<div class="absolute right-0 top-0">x</div>
		<h3 class="text-xl font-bold">Error!</h3>
		<p class="text-sm text-red-100">{displayMessage}</p>
	</div>
{/if}
