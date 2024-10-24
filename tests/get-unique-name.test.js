import path from 'node:path';
import assert from 'node:assert';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import getUniqueName from '../functions/get-unique-name.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Getting unique name of a file/folder', () => {
    test('check if path exists', async () => {
        const result = getUniqueName(path.join(__dirname, './balbablabla'), 'index.js')
        await assert.rejects(result);
    });

    test("file name doesn't exist", async () => {
        const result = await getUniqueName(path.join(__dirname, './'), 'index.js');
        assert.strictEqual(result, 'index.js');
    });

    test("folder name doesn't exist", async () => {
        const result = await getUniqueName(path.join(__dirname, './'), 'folder_name');
        assert.strictEqual(result, 'folder_name');
    });

    test('file exists', async () => {
        const result = await getUniqueName(path.join(__dirname, '../tests'), 'get-unique-name.test.js');
        assert.strictEqual(result, 'get-unique-name.test_1.js');
    });

    test('file exists', async () => {
        const result = await getUniqueName(path.join(__dirname, '../'), 'index.js');
        assert.strictEqual(result, 'index_1.js');
    })

    test('folder exists', async () => {
        const result = await getUniqueName(path.join(__dirname, '../'), 'node_modules');
        assert.strictEqual(result, 'node_modules_1');
    })
})