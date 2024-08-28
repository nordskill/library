const path = require('path');
const ensureFolderExists = require('../functions/ensure-folder-exists.js');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Checking if given path exists', () => {
    test('No path given', async () => {
        const result = await ensureFolderExists();
        expect(result.success).toBeFalsy();
    });

    test('Path exists', async () => {
        const result = await ensureFolderExists(path.join(__dirname, './ensure-folder-exists.test.js'));
        expect(result.success).toBeTruthy();
    });

    test("Path doesn't exist", async () => {
        const result = await ensureFolderExists(path.join(__dirname, '../utils/some-folder'));
        expect(result.success).toBeTruthy();
    })
})