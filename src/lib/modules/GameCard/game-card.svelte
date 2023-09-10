<script lang="ts">
  import type { DeckComplete, GameRoom } from '$lib/types';
  import CardTemplate from '../CardTemplate/card-template.svelte';
  import { deckThemes } from '$lib/utils/themes';
  import { Button } from '$lib/components/Button';
  import { twMerge } from 'tailwind-merge';

  export let deck: DeckComplete;
  export let gameRoomClient: GameRoom;
  export let instruction: any;
  export let playerNameInLocalStorage: string | null;
  export let cardMoveTrigger;

  export let nextCard: () => void;
  export let prevCard: () => void;

  const theme = deckThemes[deck.theme as keyof typeof deckThemes];

  const levelMap = ['level_one', 'level_two', 'level_three'];
  const levelInstruction = instruction.levels[levelMap[gameRoomClient?.curr_level]];

  const canMoveCard =
    gameRoomClient.player_names &&
    !!playerNameInLocalStorage &&
    playerNameInLocalStorage === gameRoomClient.player_names[gameRoomClient.curr_player_idx];

  const addColon = (question: string) => {
    const reminderIdx = question.indexOf('Reminder ');
    const wildCardIdx = question.indexOf('Wild Card ');
    const colonIdx = question.indexOf(':');
    if (reminderIdx !== -1 && colonIdx === -1) {
      return question.replace('Reminder ', '<strong class="font-semibold">Reminder:\n</strong>');
    } else if (wildCardIdx !== -1 && colonIdx === -1) {
      return question.replace('Wild Card ', '<strong class="font-semibold">Wild Card:\n</strong>');
    } else {
      return question;
    }
  };
</script>

<CardTemplate theme={theme.card}>
  {#if !(playerNameInLocalStorage && gameRoomClient.player_names)}
    <div>!(playerNameInLocalStorage && gameRoomClient.player_names)</div>
  {:else}
    <div class="flex h-full flex-col justify-between gap-4">
      <section class="space-y-4">
        <button
          class="h-8 w-8 rounded-md border border-b-4 border-zinc-800 hover:bg-white/20 active:hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
          on:click={prevCard}
          disabled={!canMoveCard || cardMoveTrigger}
          >{'<'}
        </button>
        <h1 class="text-2xl font-bold">
          {levelInstruction.label.replace(' -', ':')}
        </h1>
      </section>
      <div class="-mt-12 flex flex-col gap-8 whitespace-pre-wrap text-center">
        <h2 class="text-sm font-bold uppercase">
          Question {gameRoomClient.curr_card_idx} / {deck.questions[gameRoomClient.curr_level]
            .length}
        </h2>
        <hr class={twMerge(theme.card, 'mx-auto w-1/4')} />
        <p class="text-xl font-light leading-relaxed">
          {#if playerNameInLocalStorage && playerNameInLocalStorage === gameRoomClient.player_names[gameRoomClient.curr_player_idx]}
            <!--eslint-disable-next-line svelte/no-at-html-tags-->
            {@html addColon(
              deck.questions[gameRoomClient.curr_level][gameRoomClient.curr_card_idx - 1],
            )}
          {:else}
            <span class="opacity-60"
              >It is <span style={"font-family: 'DM Mono', monospace;"}
                >{gameRoomClient.player_names[gameRoomClient.curr_player_idx]}</span
              >'s turn to ask and your turn to answer...</span
            >
          {/if}
        </p>
      </div>

      <Button
        disabled={!canMoveCard || cardMoveTrigger}
        theme={theme.button}
        class="h-12 text-sm"
        on:click={nextCard}
        >Next Card
      </Button>
    </div>
  {/if}
</CardTemplate>
