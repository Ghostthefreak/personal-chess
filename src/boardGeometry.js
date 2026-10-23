/** @typedef {{ moves: string }} PvLine */
/** @typedef {{ from: string, to: string, rank: number }} CandidateArrow */
const FILES = "abcdefgh";

/**
 * Return the first two valid UCI candidate moves in their original MultiPV order.
 * Rank 0 is always the first-ranked engine line; rank 1 is the second.
 * @param {PvLine[]} pvs
 * @returns {CandidateArrow[]}
 */
export function candidateArrowsFromPv(pvs) {
  return pvs.slice(0, 2).flatMap((line, rank) => {
    const first = typeof line?.moves === "string" ? line.moves.trim().split(/\s+/)[0] : "";
    if (!/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(first)) return [];
    return [{ from: first.slice(0, 2), to: first.slice(2, 4), rank }];
  });
}

/**
 * Map a chess square to the center of its cell in an 800x800 SVG board.
 * The result is independent of rendered pixel size, so the overlay scales with the board.
 * @param {string} square
 * @param {boolean} flipped
 * @returns {{x:number,y:number}}
 */
export function squareToBoardPoint(square, flipped) {
  if (!/^[a-h][1-8]$/.test(square)) throw new Error(`Invalid chess square: ${square}`);
  const fileIndex = FILES.indexOf(square[0]);
  const rank = Number(square[1]);
  const col = flipped ? 7 - fileIndex : fileIndex;
  const row = flipped ? rank - 1 : 8 - rank;
  return { x: col * 100 + 50, y: row * 100 + 50 };
}
