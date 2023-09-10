<script lang="ts">
  import { browser } from '$app/environment';
  import { MenuCard } from '$lib/modules/MenuCard';
  import { categoryThemes } from '$lib/utils/themes';
  import { Loader } from '$lib/modules/Loader';
  import { kebabCaseToCamelCase, kebabCaseToNormalCase } from '$lib/utils/capitalizationHelpers';
  import type { PageData } from './$types';
  export let data: PageData;

  let clientLoaded = false;

  if (browser) {
    clientLoaded = true;
  }

  const pathname = data.pathname.split('/').pop() || '/';

  const themes: Record<string, string> = Object.keys(categoryThemes).reduce((acc, curr) => {
    // @ts-ignore
    acc[curr] = categoryThemes[curr].create;
    return acc;
  }, {});

  const cardThemes: Record<string, string> = Object.keys(categoryThemes).reduce((acc, curr) => {
    // @ts-ignore
    acc[curr] = categoryThemes[curr].menuCard;
    return acc;
  }, {});

  const cardTheme = cardThemes[kebabCaseToCamelCase(pathname)] as string;

  const buttonTheme = themes[kebabCaseToCamelCase(pathname)] as string;
</script>

<main class="relative min-h-screen">
  {#if clientLoaded}
    <MenuCard
      header={kebabCaseToNormalCase(pathname)}
      menuItems={data.decks}
      prevRoute="/create"
      {themes}
      {cardTheme}
      {buttonTheme}
      {pathname}
    />
  {:else}
    <Loader />
  {/if}
</main>
