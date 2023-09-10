<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { TitleCard } from '$lib/modules/TitleCard';

	let messages: string[] = [];
	let newMessage = '';
	let socket: WebSocket;

	let sendMessage: () => void;
	let clientLoaded = false;

	import type { PageData } from './$types';
	export let data: PageData;

	$: instructions = data.instructions;

	if (browser) {
		clientLoaded = true;
		// socket = new WebSocket(`ws://localhost:8080/ws/${room}`);

		// socket.addEventListener('message', (event) => {
		// 	const message = event.data;
		// 	console.log(JSON.parse(message));
		// 	messages = [...messages, JSON.parse(message)];
		// });

		// sendMessage = () => {
		// 	if (newMessage.trim() === '') return;
		// 	socket.send(
		// 		JSON.stringify({
		// 			messageDetails: {
		// 				room: room,
		// 				message: newMessage
		// 			}
		// 		})
		// 	);
		// 	newMessage = '';
		// };
	}
</script>

<main class="relative min-h-screen">
	{#if clientLoaded}
		<!-- <ul>
			{#each messages as message}
				<li>Message: {message}</li>
			{/each}
		</ul>

		<ul>
			<li><button on:click={() => (room = 'room1')}> room 1 </button></li>
			<li><button on:click={() => (room = 'room2')}> room 2 </button></li>
			<li><button on:click={() => (room = 'room3')}> room 3 </button></li>
		</ul> -->

		<!-- <input bind:value={newMessage} placeholder="Type your message..." />
		<button on:click={sendMessage}>Send</button> -->

		<TitleCard {instructions} />
	{:else}
		<h1>Loading</h1>
	{/if}
</main>
