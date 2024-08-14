const path = require('path')

const getUniqueName = require('../functions/getUniqueName.js');

describe('Getting unique name of a file/folder', () => {
    test('check if path exists', async () => {
        const result = await getUniqueName(path.join(__dirname, './balbablabla'), 'index.js')
        expect(result).toBe(undefined)
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
        const result = await getUniqueName(path.join(__dirname, '../tests'), 'getUniqueName.test.js');
        expect(result).toBe('getUniqueName.test_1.js');
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