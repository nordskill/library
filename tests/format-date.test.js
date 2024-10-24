import assert from 'node:assert';
import { describe, test } from 'node:test';

import formatDate from '../functions/format-date.js';

describe('Get a date in given format', () => {
    test('No arguments given', () => {
        const result = () => formatDate();
        assert.throws(result);
    });

    test('yyyy-mm-dd style', () => {
        const result = formatDate(new Date(2024, 7, 17), 'yyyy-mm-dd');
        assert.strictEqual(result, '2024-08-17');
    });

    test('yyyymmdd style', () => {
        const result = formatDate(new Date(2024, 7, 17), 'yyyymmdd');
       assert.strictEqual(result, '20240817');
    });

    test('dd Mon yyyy style', () => {
        const result = formatDate(new Date(2024, 7, 17), 'dd Mon yyyy');
        assert.strictEqual(result, '17 Aug 2024')
    })

    test('Unknown style', () => {
        const result = formatDate(new Date(2024, 7, 17), 'yymmdd');
        assert.strictEqual(result, undefined);
    })
})