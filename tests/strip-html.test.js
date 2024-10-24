import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import { describe, test, beforeEach, afterEach } from 'node:test';

import stripHtml from "../functions/strip-html.js";

describe("Getting a text content out of a given HTML code", () => {
    let dom;

    beforeEach(() => {
        dom = new JSDOM("<!DOCTYPE html>");
        global.document = dom.window.document;
        global.window = dom.window;
    });

    afterEach(() => {
        dom.window.close();
    });

    test('returns "undefined" if no code provided', () => {
        const result = stripHtml();
        assert.strictEqual(result, 'undefined');
    });

    test('returns empty string for empty HTML input', () => {
        const result = stripHtml('');
        assert.strictEqual(!!result, false);
    });

    test('removes HTML tags and returns plain text', () => {
        const result = stripHtml('<div>Hello <span>World</span>!</div>');
        assert.strictEqual(result, 'Hello World!');
    });

    test('handles complex HTML structures', () => {
        const html = `<div><p>Hello <span>World</span>! <a href='#'>Click here</a></p></div>`;

        const result = stripHtml(html);
        assert.strictEqual(result, 'Hello World! Click here');
    });
});
