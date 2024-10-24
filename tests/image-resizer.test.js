import path from 'node:path';
import imageResizer from '../functions/image-resizer';

describe('Resize an image to given widths and save them at the given path', () => {
    test('No original path', async () => {
        const result = await imageResizer('', [300, 500], path.join(__dirname, '../utils/resizedImages'));
        expect(result.success).toBeFalsy();
    });

    test('No widths given', async () => {
        const result = await imageResizer(path.join(__dirname, '../utils/mountains.jpg'), [], path.join(__dirname, '../utils/resized-images'));
        expect(result.success).toBeTruthy();
    });

    test('No target path', async () => {
        const result = await imageResizer(path.join(__dirname, '../utils/mountains.jpg'), [], '');
        expect(result.success).toBeFalsy();
    });

    test('successfully resized images', async () => {
        const result = await imageResizer(path.join(__dirname, '../utils/mountains.jpg'), [300, 500, 900], path.join(__dirname, '../utils/resized-images'));
        expect(result.success).toBeTruthy();
    })
})