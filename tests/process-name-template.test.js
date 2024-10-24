import assert from 'node:assert';
import { describe, test } from 'node:test';

import processNameTemplate from '../functions/process-name-template.js';

describe('Generating a name based on a naming rule and predefined token object.', () => {
    test('Empty rule', () => {
        const result = () => processNameTemplate('');
        assert.throws(result, new Error('Please, provide a naming rule.'));
    });

    test('Rule with no brackets', () => {
        const result = processNameTemplate('Some-rule');
        assert.strictEqual(result, 'Some-rule');
    });

    test('Rule with empty tokens', () => {
        const result = () => processNameTemplate('Some-rule-{}');
        assert.throws(result, new Error("Couldn't find a token in the object."));
    })

    test('Rule with unknown token', () => {
        const result = () => processNameTemplate('Some-rule-{blabla}');
        assert.throws(result, new Error("Couldn't find a token in the object."));
    });

    test("Rule with token which doesn't have value", () => {
        const result = processNameTemplate('Some-rule-{date}');
        assert.strictEqual(result, 'Some-rule-');
    });

    test('Rule with proper tokens', () => {
        const result = processNameTemplate('Some-rule-{kind}');
        assert.strictEqual(result, 'Some-rule-beautiful');
    })
})