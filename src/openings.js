/** @typedef {{ name: string, eco: string, aliases: string[], moves: string[], idea: string }} OpeningEntry */
/** @type {OpeningEntry[]} */
export const OPENINGS = [
  { name: "London System", eco: "D02", aliases: ["london", "london system"], moves: ["d4", "d5", "Nf3", "Nf6", "Bf4"], idea: "Develop the light-squared bishop outside the pawn chain, support a solid center, and prepare calm development with e3 and Bd3." },
  { name: "Sicilian Defense", eco: "B20", aliases: ["sicilian", "sicilian defense", "sicilian defence"], moves: ["e4", "c5"], idea: "Black challenges the d4-square asymmetrically and often accepts an unbalanced position rather than mirroring White's center pawn." },
  { name: "King's Indian Defense", eco: "E60", aliases: ["kings indian", "king's indian", "kings indian defense"], moves: ["d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6"], idea: "Black develops the king's bishop on the long diagonal and prepares to challenge White's center, often with …e5 or …c5." },
  { name: "Italian Game", eco: "C50", aliases: ["italian", "italian game", "giuoco piano"], moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"], idea: "White develops quickly, targets the f7-square, and prepares castling while keeping options for c3 and d4." },
  { name: "Ruy Lopez", eco: "C60", aliases: ["ruy lopez", "spanish game"], moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"], idea: "White develops the bishop to pressure the defender of e5. The point is long-term central pressure, not an immediate bishop capture." },
  { name: "French Defense", eco: "C00", aliases: ["french", "french defense", "french defence"], moves: ["e4", "e6"], idea: "Black supports a later …d5 challenge. The trade-off is a solid center but a potentially restricted light-squared bishop." },
  { name: "Caro-Kann Defense", eco: "B10", aliases: ["caro kann", "caro-kann", "caro kann defense"], moves: ["e4", "c6"], idea: "Black prepares …d5 while keeping the c8-bishop's diagonal more open than in many French Defense structures." },
  { name: "Queen's Gambit", eco: "D06", aliases: ["queens gambit", "queen's gambit", "queen gambit"], moves: ["d4", "d5", "c4"], idea: "White offers the c-pawn to challenge Black's d5-pawn and gain central space. The pawn is not usually intended to be held at all costs." },
  { name: "English Opening", eco: "A10", aliases: ["english", "english opening"], moves: ["c4"], idea: "White controls d5 from the flank and keeps the central pawn structure flexible." },
  { name: "Scandinavian Defense", eco: "B01", aliases: ["scandinavian", "scandinavian defense", "scandinavian defence"], moves: ["e4", "d5"], idea: "Black immediately challenges White's e-pawn. After the usual capture, Black must decide how to recapture and develop without losing time." },
  { name: "Queen's Indian Defense", eco: "E12", aliases: ["queens indian", "queen's indian"], moves: ["d4", "Nf6", "c4", "e6", "Nf3", "b6"], idea: "Black develops the queen's bishop toward the long diagonal and contests central control with flexible piece play." },
  { name: "Nimzo-Indian Defense", eco: "E20", aliases: ["nimzo indian", "nimzo-indian"], moves: ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4"], idea: "Black pins the c3-knight and pressures the center. Black may exchange the bishop for a knight to damage White's pawn structure." },
  { name: "Vienna Game", eco: "C25", aliases: ["vienna", "vienna game"], moves: ["e4", "e5", "Nc3"], idea: "White develops the queen's knight before committing the king's knight, keeping f-pawn and central plans flexible." },
  { name: "Pirc Defense", eco: "B07", aliases: ["pirc", "pirc defense", "pirc defence"], moves: ["e4", "d6", "d4", "Nf6", "Nc3", "g6"], idea: "Black allows White a broad center and aims to undermine it with piece pressure and timely pawn breaks." },
];

/** @param {string} query */
export function searchOpenings(query) {
  const normalized = query.toLocaleLowerCase().replace(/[’']/g, "'").trim();
  if (!normalized) return [];
  return OPENINGS.filter((item) => `${item.name} ${item.eco} ${item.aliases.join(" ")}`.toLocaleLowerCase().replace(/[’']/g, "'").includes(normalized)).slice(0, 6);
}

/** @param {number} index @param {number} delta @param {number} total */
export function nextPreviewIndex(index, delta, total) {
  return Math.max(0, Math.min(total, index + delta));
}
