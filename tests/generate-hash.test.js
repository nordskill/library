import path from 'node:path';
import assert from 'node:assert';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import generateHash from '../functions/generate-hash.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Generate a hash for a file at the given path', () => {
    test('No path given', async () => {
        const result = generateHash();
        await assert.rejects(result);
    });

    test("Path doesn't exits", async () => {
        const result = generateHash('./blabla');
        await assert.rejects(result);
    });

    test('Path exists', async () => {
        const result = await generateHash(path.join(__dirname, './generate-hash.test.js'));
        assert.strictEqual(!!result, true);
    })
})