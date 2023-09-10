<script lang="ts">
	import { CardTemplate } from '$lib/modules/CardTemplate';
	import { Button } from '$lib/components/Button';
	import type { Instruction } from '.';
	export let instructions: {
		general: string;
		levels: Instruction;
	};
</script>

<CardTemplate>
	<div class="flex h-full flex-col justify-between">
		<div>
			<h1 class="text-[3.5rem] leading-[3.5rem] font-bold">We're Not Really Strangers</h1>
			<p class="my-4 text-rose-200">{instructions.general}</p>
		</div>
		<div class="flex flex-col gap-3">
			<div class="flex w-full flex-col gap-3">
				<a class="w-full" href="/create"><Button>Create a Lobby</Button></a>
				<a class="w-full" href="/join"><Button>Join a game</Button></a>
			</div>
			<p class="flex flex-col gap-2 text-xs text-rose-300">
				* This website is not affiliated with the official We're Not Really Strangers card game.
			</p>
		</div>
	</div>
</CardTemplate>
