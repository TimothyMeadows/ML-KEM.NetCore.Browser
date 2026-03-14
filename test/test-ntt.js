import test from 'node:test';
import { baseMultiply } from '../src/ntt.js';
import { expectThrows } from './test-helpers.js';

test('ntt baseMultiply is not yet publicly exposed in adapter', () => {
  expectThrows(() => baseMultiply(new Int16Array(2), new Int16Array(2)), 'not implemented');
});
