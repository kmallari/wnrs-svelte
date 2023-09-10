export type Instruction = {
	level_one: { label: string; content: string };
	level_two: { label: string; content: string };
	level_three: { label: string; content: string };
	wildcard: { label: string; content: string };
};

export { default as TitleCard } from './title-card.svelte';
