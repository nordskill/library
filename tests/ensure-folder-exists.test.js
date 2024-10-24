import path from 'node:path';
import assert from 'node:assert';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import ensureFolderExists from '../functions/ensure-folder-exists.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


describe('Checking if given path exists', () => {
    test('No path given', async () => {
        const result = await ensureFolderExists();
        assert.strictEqual(result.success, false);
    });

    test('Path exists', async () => {
        const result = await ensureFolderExists(path.join(__dirname, './ensure-folder-exists.test.js'));
        assert.strictEqual(result.success, true);
    });

    test("Path doesn't exist", async () => {
        const result = await ensureFolderExists(path.join(__dirname, '../utils/some-folder'));
        assert.strictEqual(result.success, true);
    })
})