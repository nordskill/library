import slugify from '../functions/slugify';

describe("Creating a slug of a given string", () => {
    test('returns "undefined" if no input provided', () => {
        const result = slugify();
        expect(result).toBe("undefined");
    });

    test('returns empty string if empty string given', () => {
        const result = slugify('');
        expect(result).toBeFalsy();
    });

    test('simple string', () => {
        const result = slugify('hello world');
        expect(result).toBe('hello-world');
    });

    test('complex string with non-aplhabetic characters', () => {
        const result = slugify('welcome--develOpErS#@_--');
        expect(result).toBe('welcome-developers');
    })
})