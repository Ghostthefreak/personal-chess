# Personal Chess Trainer

A local-first chess study workspace built with React, TypeScript, Vite, and `chess.js`.

## Included in this build

- Refreshed responsive chess-learning workspace with a board-first layout and compact mobile panels.
- Interactive legal-move chessboard with check highlighting and pawn-promotion selection.
- Undo, board flipping, move-history navigation, and game status.
- PGN import from a file or pasted text, and PGN export.
- FEN import and copy.
- Save positions locally in this browser, reopen them, delete them, and export the saved library as JSON.
- Lichess Cloud Eval lookup for positions that already have cached Stockfish analysis. The first two returned MultiPV candidates are shown with green (rank 1) and blue (rank 2) SVG arrows. Arrows are derived from the returned UCI moves, stay aligned as the board resizes or flips, and are cleared when the selected position changes. Candidate continuations can be stepped through on a temporary board without changing the main game.
- Beginner-friendly move notes grounded in the move data returned by Cloud Eval (check, capture, promotion, or candidate rank). These notes are deliberately conservative; they are not a substitute for a local engine explanation.
- Opening search with suggestions for a curated set of named openings and common aliases, ECO labels, legal opening move sequences, short learning notes, and Lichess Masters Explorer continuations.
- Master-game continuation exploration with move-frequency information when the public Explorer returns it.
- No login, database, analytics, or payment system.

Saved positions use this browser's local storage and are not synchronized between devices. Export the saved library periodically if you want a backup.

## Requirements

- Node.js 20 or newer recommended (Node.js 22 is suitable).
- npm.
- Internet access for installing dependencies and using Lichess lookups.

## Run locally

1. Extract the ZIP.
2. Open a terminal in the extracted `personal-chess-starter` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Tests and production build

The focused unit tests use Node's built-in test runner and do not require a browser or a Lichess connection:

```bash
npm test
```

The suite covers candidate arrow ordering, the one-candidate case, malformed UCI lines, square alignment in both board orientations, opening search, opening catalogue entries, and variation navigation boundaries.

Build and preview the production frontend with:

```bash
npm run build
npm run preview
```

The production assets are written to `dist/`.

## Lichess API credentials

The features in this build use public Lichess endpoints and do not require a personal token. `.env.example` is provided for a future server-side authenticated integration. If authenticated routes are added later, put the real token in a server-side `LICHESS_API_TOKEN` environment variable. Keep `.env` untracked and never put a token in a `VITE_*` variable or frontend code. Do not commit real credentials.

## Current limitations

- Local Stockfish WebAssembly analysis has not yet been integrated. Cloud Eval only returns positions already present in Lichess's cache; an uncached position will not be analyzed locally.
- Move explanations are intentionally limited to details directly supported by the returned move data. Rich strategic/tactical explanations would require additional engine-backed analysis.
- The opening search covers a curated set of common openings and aliases, not a complete opening encyclopedia. Explorer results depend on Lichess Masters database availability.
- Practice exercises, puzzle solving, and full automated game review are not implemented in this build.
- Lichess service availability, caching, and rate limits are outside the app's control.

## Deployment

This is a static Vite frontend and can be deployed to a static hosting provider. Set the build command to `npm run build` and the output directory to `dist`. Lichess public lookups run in the browser; no private token is required for these endpoints.

## Board appearance

Open the palette button beside the board controls to customize the board. Appearance preferences are stored separately in `localStorage` under `personal-chess.appearance.v1`; resetting appearance does not remove saved positions or game data. Board themes and piece rendering styles are independent. Custom colors are validated when loaded, and invalid/older preference values fall back to safe defaults. Coordinates default to hidden and can be shown inside the board, around its outside edge, in common edge combinations, or on selected custom edges. The piece styles use the application's locally available Unicode chess glyphs with local CSS treatments; no remote artwork or additional asset download is required.
