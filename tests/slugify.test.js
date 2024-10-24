import assert from 'node:assert';
import { describe, test } from 'node:test';

import slugify from '../functions/slugify.js';

describe('Creating a slug of a given string', () => {
    test('returns "undefined" if no input provided', () => {
        const result = slugify();
        assert.strictEqual(result, 'undefined');
    });

    test('returns empty string if empty string given', () => {
        const result = slugify('');
        assert.strictEqual(!!result, false);
    });

    test('simple string', () => {
        const result = slugify('hello world');
        assert.strictEqual(result, 'hello-world');
    });

    test('complex string with non-aplhabetic characters', () => {
        const result = slugify('welcome--develOpErS#@_--');
        assert.strictEqual(result, 'welcome-developers');
    })
})