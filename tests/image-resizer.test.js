import path from 'node:path';
import assert from 'node:assert';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import imageResizer from '../functions/image-resizer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Resize an image to given widths and save them at the given path', () => {
    test('No original path', async () => {
        const result = await imageResizer('', [300, 500], path.join(__dirname, '../utils/resizedImages'));
        assert.strictEqual(!!result.success, false);
    });

    test('No widths given', async () => {
        const result = await imageResizer(path.join(__dirname, '../utils/mountains.jpg'), [], path.join(__dirname, '../utils/resized-images'));
        assert.strictEqual(!!result.success, true);
    });

    test('No target path', async () => {
        const result = await imageResizer(path.join(__dirname, '../utils/mountains.jpg'), [], '');
        assert.strictEqual(!!result.success, false);
    });

    test('successfully resized images', async () => {
        const result = await imageResizer(path.join(__dirname, '../utils/mountains.jpg'), [300, 500, 900], path.join(__dirname, '../utils/resized-images'));
        assert.strictEqual(!!result.success, true);
    })
})