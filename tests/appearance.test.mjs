import test from 'node:test';
import assert from 'node:assert/strict';
import { BOARD_THEMES, PIECE_STYLES, DEFAULT_APPEARANCE, normalizeAppearance } from '../src/appearance.js';

test('board theme catalogue contains all requested board families', () => {
  const ids = new Set(BOARD_THEMES.map((theme) => theme.id));
  for (const id of ['classic', 'wood', 'darkwood', 'tournament', 'blue', 'brown', 'marble', 'midnight', 'minimal-light', 'minimal-dark']) assert.ok(ids.has(id), `missing theme ${id}`);
  assert.ok(BOARD_THEMES.every((theme) => /^#[0-9a-f]{6}$/i.test(theme.light) && /^#[0-9a-f]{6}$/i.test(theme.dark)));
});

test('piece styles are independent options and have stable identifiers', () => {
  assert.deepEqual(PIECE_STYLES.map((style) => style.id), ['classic', 'modern', 'minimal', 'mono']);
});

test('appearance defaults hide coordinates and use safe classic colors', () => {
  assert.equal(DEFAULT_APPEARANCE.coordinates, 'hidden');
  assert.equal(normalizeAppearance(null).light, DEFAULT_APPEARANCE.light);
  assert.equal(normalizeAppearance(null).dark, DEFAULT_APPEARANCE.dark);
});

test('custom square colors and coordinate placement survive normalization', () => {
  const value = normalizeAppearance({ theme: 'classic', pieceStyle: 'modern', light: '#123456', dark: '#abcdef', coordinates: 'custom', filesEdge: 'top', ranksEdge: 'right' });
  assert.equal(value.light, '#123456');
  assert.equal(value.dark, '#abcdef');
  assert.equal(value.coordinates, 'custom');
  assert.equal(value.filesEdge, 'top');
  assert.equal(value.ranksEdge, 'right');
});

test('custom color themes remain selected after preferences are reloaded', () => {
  const value = normalizeAppearance({ theme: 'custom', pieceStyle: 'mono', light: '#123456', dark: '#abcdef', coordinates: 'outside' });
  assert.equal(value.theme, 'custom');
  assert.equal(value.light, '#123456');
  assert.equal(value.dark, '#abcdef');
  assert.equal(value.pieceStyle, 'mono');
});

test('invalid or old preference data safely falls back without throwing', () => {
  const value = normalizeAppearance({ theme: 'unknown', pieceStyle: 'broken', light: 'red', dark: '#12', coordinates: 'diagonal', filesEdge: 'left', ranksEdge: 'top' });
  assert.equal(value.theme, DEFAULT_APPEARANCE.theme);
  assert.equal(value.pieceStyle, DEFAULT_APPEARANCE.pieceStyle);
  assert.equal(value.light, DEFAULT_APPEARANCE.light);
  assert.equal(value.dark, DEFAULT_APPEARANCE.dark);
  assert.equal(value.coordinates, 'hidden');
  assert.equal(value.filesEdge, 'bottom');
  assert.equal(value.ranksEdge, 'left');
});
