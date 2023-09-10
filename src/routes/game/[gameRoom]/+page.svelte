<script lang="ts">
  import { browser } from '$app/environment';
  import LobbyCard from '$lib/modules/LobbyCard/lobby-card.svelte';
  import EndCard from '$lib/modules/EndCard/end-card.svelte';
  import { Loader } from '$lib/modules/Loader';
  import { message, show } from '$lib/components/Toast';
  import { slidefade } from '$lib/utils/animation';
  import type { PageData } from './$types';
  import type { GameRoom } from '$lib/types';
  import GameCard from '$lib/modules/GameCard/game-card.svelte';
  import RoundStartCard from '$lib/modules/RoundStartCard/round-start-card.svelte';
  import { PUBLIC_API_URL } from '$env/static/public';
  export let data: PageData;

  let { gameRoom, deck, instruction } = data;
  let gameRoomClient: GameRoom | null = null;
  // console.log({ data });

  $: gameRoom = gameRoom;

  let players: Array<string> = gameRoom.player_names || [];
  let playerName = '';
  let playerNameInLocalStorage: string | null = null;
  let socket: WebSocket;
  let cardMoveTrigger = false;

  // console.log({ players });

  let addPlayer: () => void;
  let removePlayer: () => void;
  let startGame: () => void;
  let nextCard: () => void;
  let prevCard: () => void;

  let clientLoaded = false;

  if (browser) {
    clientLoaded = true;
    gameRoomClient = gameRoom;

    const localRooms = JSON.parse(localStorage.getItem('namesInGames') || `{}`);
    playerNameInLocalStorage = localRooms[gameRoom.id] || null;

    const ws = PUBLIC_API_URL.replace('https', 'wss');
    socket = new WebSocket(`${ws}/ws/${gameRoom.id}`);

    socket.addEventListener('message', (event) => {
      const response = event.data;

      if (!response) return;

      const { type, res } = JSON.parse(response) as { type: string; res: string };

      // console.log({ res });

      switch (type) {
        case 'add_player':
          players = [...players, res];
          cardMoveTrigger = false;
          break;
        case 'remove_player':
          players = players.filter((player) => player !== res);
          cardMoveTrigger = false;
          break;
        case 'start_game':
          gameRoomClient = JSON.parse(res);
          cardMoveTrigger = false;
          break;
        case 'next_card':
          gameRoomClient = JSON.parse(res);
          cardMoveTrigger = false;
          break;
        case 'prev_card':
          gameRoomClient = JSON.parse(res);
          cardMoveTrigger = false;
          break;
        case 'error':
          message.set(res);
          cardMoveTrigger = false;
          show.set(true);
          break;
      }
    });

    addPlayer = () => {
      cardMoveTrigger = true;
      if (playerName.trim() === '') return;
      socket.send(
        JSON.stringify({
          type: 'add_player',
          data: playerName,
        }),
      );

      const prevGames = JSON.parse(localStorage.getItem('namesInGames') || '{}');

      const newGames = {
        ...prevGames,
        [gameRoom.id]: playerName,
      };

      localStorage.setItem('namesInGames', JSON.stringify(newGames));
      playerNameInLocalStorage = playerName;
      playerName = '';
    };

    removePlayer = () => {
      cardMoveTrigger = true;
      if (players.length === 0) return;

      const localRooms = JSON.parse(localStorage.getItem('namesInGames') || `{}`);
      const localPlayerNameInLocalStorage = localRooms[gameRoom.id] || null;
      socket.send(
        JSON.stringify({
          type: 'remove_player',
          data: localPlayerNameInLocalStorage,
        }),
      );
      const prevGames = JSON.parse(localStorage.getItem('namesInGames') || '{}');

      const newGames = {
        ...prevGames,
        [gameRoom.id]: '',
      };

      localStorage.setItem('namesInGames', JSON.stringify(newGames));
      playerNameInLocalStorage = '';
    };

    startGame = () => {
      cardMoveTrigger = true;
      socket.send(
        JSON.stringify({
          type: 'start_game',
          data: 'None',
        }),
      );
    };

    nextCard = () => {
      cardMoveTrigger = true;
      socket.send(
        JSON.stringify({
          type: 'next_card',
          data: 'None',
        }),
      );
    };

    prevCard = () => {
      cardMoveTrigger = true;
      socket.send(
        JSON.stringify({
          type: 'prev_card',
          data: 'None',
        }),
      );
    };
  }
</script>

<main class="relative min-h-screen">
  {#if !clientLoaded || !gameRoomClient}<Loader />
  {:else if gameRoomClient?.is_game_over}
    <div
      in:slidefade={{ delay: 300, isEntering: true }}
      out:slidefade={{ delay: 0 }}
      class="relative min-h-screen"
    >
      <EndCard {deck} {gameRoomClient} {playerNameInLocalStorage} />
    </div>
  {:else if gameRoomClient?.is_game_started && !gameRoom.is_game_over}
    <div
      in:slidefade={{ delay: 300, isEntering: true }}
      out:slidefade={{ delay: 0 }}
      class="relative min-h-screen"
    >
      {#if gameRoomClient.curr_card_idx === 0}
        <div
          in:slidefade={{ delay: 300, isEntering: true }}
          out:slidefade={{ delay: 0 }}
          class="relative min-h-screen"
        >
          <RoundStartCard
            {deck}
            {gameRoomClient}
            {instruction}
            {nextCard}
            {prevCard}
            {cardMoveTrigger}
          />
        </div>
      {:else}
        {#key `${gameRoomClient.curr_level}-${gameRoomClient.curr_card_idx}`}
          <div
            in:slidefade={{ delay: 300, isEntering: true }}
            out:slidefade={{ delay: 0 }}
            class="relative min-h-screen"
          >
            <GameCard
              {instruction}
              {deck}
              {gameRoomClient}
              {playerNameInLocalStorage}
              {nextCard}
              {prevCard}
              {cardMoveTrigger}
            />
          </div>
        {/key}
      {/if}
    </div>
  {:else}
    <div
      in:slidefade={{ delay: 300, isEntering: true }}
      out:slidefade={{ delay: 0 }}
      class="relative min-h-screen"
    >
      <LobbyCard
        {deck}
        {players}
        {playerNameInLocalStorage}
        {gameRoomClient}
        {addPlayer}
        {removePlayer}
        {startGame}
        bind:playerName
      />
    </div>
  {/if}
</main>
