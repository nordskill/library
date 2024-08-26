const path = require('path');
const generateHash = require('../backend-functions/generate-hash.js');

describe('Generate a hash for a file at the given path', () => {
    test('No path given', () => {
        const result = async () => await generateHash();
        expect(result).rejects.toThrow();
    });

    test("Path doesn't exits", () => {
        const result = async () => await generateHash('./blabla');
        expect(result).rejects.toThrow();
    });

    test('Path exists', async () => {
        const result = await generateHash(path.join(__dirname, './generate-hash.test.js'));
        expect(result).toBeTruthy();
    })
})