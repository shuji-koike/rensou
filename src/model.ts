import dict from "./dict.json";
import { shuffle } from "./util";

export interface Config {
  team: number;
  handicap: number;
  word: number;
  target: number;
  banned: number;
}

export interface Board {
  version: string;
  config: Config;
  words: string[];
}

export interface Card {
  word: string;
  team: number;
  isBanned: boolean;
  isAnswerd: boolean;
}

export const version = "1.0.0";

export const defaultConfig = Object.freeze<Config>({
  team: 2,
  handicap: 1,
  word: 25,
  target: 8,
  banned: 1,
});

export async function newBoard(config: Config = defaultConfig): Promise<Board> {
  return {
    version,
    config,
    words: await fetchWords(config.word),
  };
}

export function fetchWords(count: number): Promise<string[]> {
  return Promise.resolve(shuffle([...dict]).slice(0, count));
}

export function toCards(board: Board): Card[] {
  return board.words
    .map((word, i) => ({
      word,
      team: i % (board.config.team + 1),
      isBanned: i >= board.words.length - board.config.banned,
      isAnswerd: false,
    }))
    .sort((a, b) => (a.isBanned ? -1 : a.team - b.team));
}

export function toColor(card: Card): string {
  if (card.isBanned) return "#666";
  return ["#ddd", "#F00", "#00F", "#0F0"][card.team] ?? "#000";
}

function targetCounts(board: Board): number[] {
  return Array.from(
    Array(board.config.team),
    (_, i) => board.config.target + i * board.config.handicap
  ).reverse();
}
