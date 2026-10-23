export type CoordinateMode = "hidden" | "inside" | "outside" | "bottom-left" | "top-right" | "custom";
export type Appearance = { theme: string; pieceStyle: string; light: string; dark: string; coordinates: CoordinateMode; filesEdge: "top" | "bottom" | "both" | "none"; ranksEdge: "left" | "right" | "both" | "none" };
export const DEFAULT_APPEARANCE: Appearance;
export const BOARD_THEMES: ReadonlyArray<{ id: string; name: string; light: string; dark: string }>;
export const PIECE_STYLES: ReadonlyArray<{ id: string; name: string; description: string }>;
export function normalizeAppearance(raw: unknown): Appearance;
