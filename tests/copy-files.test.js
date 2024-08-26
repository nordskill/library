const path = require('path')
const copyFiles = require('../backend-functions/copy-files.js');

describe('Copying file or directory from one location to another', () => {
    test('No original path and no file', () => {
        const result = async () => await copyFiles('', path.join(__dirname, '../utils/folder-to-copy'));
        expect(result).rejects.toThrow();
    });

    test('No destination path and no file', () => {
        const result = async () => await copyFiles(path.join(__dirname, '../utils/folder-to-copy'), '');
        expect(result).rejects.toThrow();
    });

    test('No original path and file', () => {
        const result = async () => await copyFiles('', path.join(__dirname, '../utils/folder-to-copy'), 'file.abc');
        expect(result).rejects.toThrow();
    });

    test('No destination path and file', () => {
        const result = async () => await copyFiles(path.join(__dirname, '../utils/folder-to-copy'), '', 'file.abc');
        expect(result).rejects.toThrow();
    });

    test('File exists', async () => {
        const consoleSpy = jest.spyOn(console, 'log')
        await copyFiles(path.join(__dirname, '../utils'), path.join(__dirname, '../utils/some-folder'), 'mountains.jpg')
        expect(consoleSpy).toHaveBeenCalled();
    });

    test('Folder exists', async () => {
        const consoleSpy = jest.spyOn(console, 'log')
        await copyFiles(path.join(__dirname, '../utils/folder-to-copy'), path.join(__dirname, '../utils/some-folder'));
        expect(consoleSpy).toHaveBeenCalled();
    });
})