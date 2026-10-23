export type OpeningEntry = { name: string; eco: string; aliases: string[]; moves: string[]; idea: string };
export declare const OPENINGS: OpeningEntry[];
export declare function searchOpenings(query: string): OpeningEntry[];
export declare function nextPreviewIndex(index: number, delta: number, total: number): number;
