const processNameTemplate = require('../functions/processNameTemplate.js');

describe('Generating a name based on a naming rule and predefined token object.', () => {
    test('Empty rule', () => {
        const result = () => processNameTemplate('');
        expect(result).toThrow(new Error('Please, provide a naming rule.'));
    });

    test('Rule with no brackets', () => {
        const result = processNameTemplate('Some-rule');
        expect(result).toBe('Some-rule');
    });

    test('Rule with empty tokens', () => {
        const result = () => processNameTemplate('Some-rule-{}');
        expect(result).toThrow(new Error("Couldn't find a token in the object."));
    })

    test('Rule with unknown token', () => {
        const result = () => processNameTemplate('Some-rule-{blabla}');
        expect(result).toThrow(new Error("Couldn't find a token in the object."));
    });

    test("Rule with token which doesn't have value", () => {
        const result = processNameTemplate('Some-rule-{date}');
        expect(result).toBe('Some-rule-');
    });

    test('Rule with proper tokens', () => {
        const result = processNameTemplate('Some-rule-{kind}');
        expect(result).toBe('Some-rule-beautiful');
    })
})