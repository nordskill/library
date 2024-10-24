import path from 'node:path';
import assert from 'node:assert';
import { test, describe } from 'node:test';
import { fileURLToPath } from 'node:url';

import copyFiles from '../functions/copy-files.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const originalLog = console.log;

describe('Copying file or directory from one location to another', () => {
    test('No original path and no file', async () => {
        const result = copyFiles('', path.join(__dirname, '../utils/folder-to-copy'));
        await assert.rejects(result);
    });

    test('No destination path and no file', async () => {
        const result = copyFiles(path.join(__dirname, '../utils/folder-to-copy'), '');
        await assert.rejects(result);
    });

    test('No original path and file', async () => {
        const result = copyFiles('', path.join(__dirname, '../utils/folder-to-copy'), 'file.abc');
        await assert.rejects(result);
    });

    test('No destination path and file', async () => {
        const result = copyFiles(path.join(__dirname, '../utils/folder-to-copy'), '', 'file.abc');
        await assert.rejects(result);
    });

    test('File exists', async () => {
        let wasCalled = false;

        console.log = () => {
            wasCalled = true;
        }

        await copyFiles(path.join(__dirname, '../utils'), path.join(__dirname, '../utils/some-folder'), 'mountains.jpg');

        assert.strictEqual(wasCalled, true);

        console.log = originalLog;
    });

    test('Folder exists', async () => {
        let wasCalled = false;

        console.log = () => {
            wasCalled = true;
        }

        await copyFiles(path.join(__dirname, '../utils/folder-to-copy'), path.join(__dirname, '../utils/some-folder'));
        assert.strictEqual(wasCalled, true);

        console.log = originalLog;
    });
})