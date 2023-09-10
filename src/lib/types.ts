export type Deck = {
	id: string;
	name: string;
	players: string;
	backDesc: Array<string>;
	theme: string;
};

export type DeckComplete = {
	name: string;
	short_name: string;
	players: string;
	theme: string;
	levels: Array<string>;
	isExpansion: boolean;
	backDesc: Array<string>;
	preview: Array<string>;
	questions: Array<Array<string>>;
};

export type GameRoom = {
	id: string;
	code: string;
	deck_name: string;
	player_names: Array<string> | null;
	curr_player_idx: number;
	levels_card_cnt: Array<number>;
	curr_card_idx: number;
	levels_cnt: number;
	curr_level: number;
	is_game_started: boolean;
	is_game_over: boolean;
};
