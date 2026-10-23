export const DEFAULT_APPEARANCE = Object.freeze({ theme: "classic", pieceStyle: "classic", light: "#e8e5d8", dark: "#91a782", coordinates: "hidden", filesEdge: "bottom", ranksEdge: "left" });
export const BOARD_THEMES = Object.freeze([
  { id: "classic", name: "Classic", light: "#e8e5d8", dark: "#91a782" },
  { id: "wood", name: "Classic wood", light: "#e8cda5", dark: "#a66d43" },
  { id: "darkwood", name: "Dark wood", light: "#b68a61", dark: "#60402f" },
  { id: "tournament", name: "Tournament", light: "#eeeed2", dark: "#769656" },
  { id: "blue", name: "Ocean blue", light: "#dce6ed", dark: "#6486a3" },
  { id: "brown", name: "Brown", light: "#f0d9b5", dark: "#b58863" },
  { id: "marble", name: "Marble", light: "#e8e7e4", dark: "#8a929a" },
  { id: "midnight", name: "Midnight", light: "#aeb7c5", dark: "#394655" },
  { id: "minimal-light", name: "Minimal light", light: "#f3f3ef", dark: "#c9d0c7" },
  { id: "minimal-dark", name: "Minimal dark", light: "#4a504c", dark: "#252a27" },
  { id: "lavender", name: "Lavender", light: "#eee7f6", dark: "#9383ae" },
  { id: "rose", name: "Rosewood", light: "#f1d9d4", dark: "#b77c7e" },
]);
export const PIECE_STYLES = Object.freeze([
  { id: "classic", name: "Classic", description: "Traditional chess glyphs" },
  { id: "modern", name: "Modern", description: "Crisp, softly shaded" },
  { id: "minimal", name: "Minimal", description: "Clean flat silhouette" },
  { id: "mono", name: "Monochrome", description: "High-contrast finish" },
]);
const isColor = (value) => typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
export function normalizeAppearance(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { ...DEFAULT_APPEARANCE };
  const theme = raw.theme === "custom" ? { id: "custom", light: isColor(raw.light) ? raw.light : DEFAULT_APPEARANCE.light, dark: isColor(raw.dark) ? raw.dark : DEFAULT_APPEARANCE.dark } : BOARD_THEMES.find((item) => item.id === raw.theme);
  const pieceStyle = PIECE_STYLES.find((item) => item.id === raw.pieceStyle);
  const coordinates = ["hidden", "inside", "outside", "bottom-left", "top-right", "custom"].includes(raw.coordinates) ? raw.coordinates : DEFAULT_APPEARANCE.coordinates;
  return {
    theme: theme?.id ?? DEFAULT_APPEARANCE.theme,
    pieceStyle: pieceStyle?.id ?? DEFAULT_APPEARANCE.pieceStyle,
    light: isColor(raw.light) ? raw.light : (theme?.light ?? DEFAULT_APPEARANCE.light),
    dark: isColor(raw.dark) ? raw.dark : (theme?.dark ?? DEFAULT_APPEARANCE.dark),
    coordinates,
    filesEdge: ["top", "bottom", "both", "none"].includes(raw.filesEdge) ? raw.filesEdge : DEFAULT_APPEARANCE.filesEdge,
    ranksEdge: ["left", "right", "both", "none"].includes(raw.ranksEdge) ? raw.ranksEdge : DEFAULT_APPEARANCE.ranksEdge,
  };
}
