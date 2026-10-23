import test from 'node:test';
import assert from 'node:assert/strict';
import { candidateArrowsFromPv, squareToBoardPoint } from '../src/boardGeometry.js';

test('the green arrow source is always the first MultiPV line', () => {
  const arrows = candidateArrowsFromPv([{ moves: 'e2e4 e7e5 g1f3' }, { moves: 'd2d4 d7d5' }, { moves: 'c2c4' }]);
  assert.deepEqual(arrows, [
    { from: 'e2', to: 'e4', rank: 0 },
    { from: 'd2', to: 'd4', rank: 1 },
  ]);
});

test('only one arrow is returned when only one valid candidate exists', () => {
  assert.deepEqual(candidateArrowsFromPv([{ moves: 'g1f3 e7e5' }]), [{ from: 'g1', to: 'f3', rank: 0 }]);
});

test('invalid and missing UCI moves never create arrows', () => {
  assert.deepEqual(candidateArrowsFromPv([{ moves: 'not-a-move' }, { moves: '' }]), []);
});

test('standard and flipped board coordinates use square centers', () => {
  assert.deepEqual(squareToBoardPoint('a8', false), { x: 50, y: 50 });
  assert.deepEqual(squareToBoardPoint('h1', false), { x: 750, y: 750 });
  assert.deepEqual(squareToBoardPoint('a8', true), { x: 750, y: 750 });
  assert.deepEqual(squareToBoardPoint('h1', true), { x: 50, y: 50 });
  assert.deepEqual(squareToBoardPoint('e4', false), { x: 450, y: 450 });
  assert.deepEqual(squareToBoardPoint('e4', true), { x: 350, y: 350 });
});

test('all square centers stay within the scalable SVG viewBox in both orientations', () => {
  for (const flipped of [false, true]) {
    for (const file of 'abcdefgh') for (const rank of '12345678') {
      const point = squareToBoardPoint(`${file}${rank}`, flipped);
      assert.ok(point.x >= 50 && point.x <= 750);
      assert.ok(point.y >= 50 && point.y <= 750);
      assert.equal(point.x % 100, 50);
      assert.equal(point.y % 100, 50);
    }
  }
});

test('invalid squares are rejected instead of misaligning arrows', () => {
  assert.throws(() => squareToBoardPoint('i9', false), /Invalid chess square/);
});

import { OPENINGS, searchOpenings, nextPreviewIndex } from '../src/openings.js';

test('opening search finds known names, aliases, and ECO codes', () => {
  assert.equal(searchOpenings('London')[0]?.name, 'London System');
  assert.equal(searchOpenings('sicilian defence')[0]?.name, 'Sicilian Defense');
  assert.equal(searchOpenings("King's Indian")[0]?.eco, 'E60');
  assert.equal(searchOpenings('D02')[0]?.name, 'London System');
  assert.deepEqual(searchOpenings('no such opening'), []);
});

test('opening entries provide playable move sequences and a learning idea', () => {
  for (const name of ['London System', 'Sicilian Defense', "King's Indian Defense"]) {
    const entry = OPENINGS.find((item) => item.name === name);
    assert.ok(entry, `${name} should be in the opening catalogue`);
    assert.ok(entry.eco.length > 0);
    assert.ok(entry.moves.length > 0);
    assert.ok(entry.idea.length > 20);
  }
});

test('variation navigation clamps at both ends', () => {
  assert.equal(nextPreviewIndex(0, -1, 6), 0);
  assert.equal(nextPreviewIndex(2, 1, 6), 3);
  assert.equal(nextPreviewIndex(6, 1, 6), 6);
});
