/**
 * @jest-environment jsdom
 */

const stripHtml = require('../functions/strip-html.js');

describe('Getting a text content out of a given HTML code', () => {

    test('returns "undefined" if no code provided', () => {
        const result = stripHtml();
        expect(result).toBe("undefined");
    });

    test("returns empty string for empty HTML input", () => {
        const result = stripHtml("");
        expect(result).toBeFalsy();
    });

    test("removes HTML tags and returns plain text", () => {
        const result = stripHtml("<div>Hello <span>World</span>!</div>");
        expect(result).toBe("Hello World!");
    });

    test("handles complex HTML structures", () => {
        const html = `<div><p>Hello <span>World</span>! <a href='#'>Click here</a></p></div>`;

        const result = stripHtml(html);
        expect(result).toBe("Hello World! Click here")
    })
})