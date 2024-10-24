import path from 'node:path';
import getUniqueName from '../functions/get-unique-name';

describe('Getting unique name of a file/folder', () => {
    test('check if path exists', () => {
        const result = async () => await getUniqueName(path.join(__dirname, './balbablabla'), 'index.js')
        expect(result).rejects.toThrow();
    });

    test("file name doesn't exist", async () => {
        const result = await getUniqueName(path.join(__dirname, './'), 'index.js');
        expect(result).toBe('index.js');
    });

    test("folder name doesn't exist", async () => {
        const result = await getUniqueName(path.join(__dirname, './'), 'folder_name');
        expect(result).toBe('folder_name');
    });

    test("file exists", async () => {
        const result = await getUniqueName(path.join(__dirname, '../tests'), 'get-unique-name.test.js');
        expect(result).toBe('get-unique-name.test_1.js');
    });

    test("file exists", async () => {
        const result = await getUniqueName(path.join(__dirname, '../'), 'index.js');
        expect(result).toBe('index_1.js');
    })

    test("folder exists", async () => {
        const result = await getUniqueName(path.join(__dirname, '../'), 'node_modules');
        expect(result).toBe('node_modules_1');
    })
})