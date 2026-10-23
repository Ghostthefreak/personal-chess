export type PvLine = { moves: string };
export type CandidateArrow = { from: string; to: string; rank: number };
export declare function candidateArrowsFromPv(pvs: PvLine[]): CandidateArrow[];
export declare function squareToBoardPoint(square: string, flipped: boolean): { x: number; y: number };
