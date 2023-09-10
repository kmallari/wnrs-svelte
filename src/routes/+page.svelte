<script lang="ts">
  import { browser } from '$app/environment';
  import { TitleCard } from '$lib/modules/TitleCard';
  import { Loader } from '$lib/modules/Loader';
  let clientLoaded = false;

  import type { PageData } from './$types';
  export let data: PageData;

  $: instructions = data.instructions;

  if (browser) {
    clientLoaded = true;
  }
</script>

<main class="relative min-h-screen">
  {#if clientLoaded}
    <TitleCard {instructions} />
  {:else}
    <Loader />
  {/if}
</main>
