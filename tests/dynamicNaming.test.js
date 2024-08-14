const dynamicNaming = require('../functions/dynamicNaming.js');

describe('Generating a name based on a naming rule and predefined token object.', () => {
    test('Empty rule', () => {
        const result = dynamicNaming('');
        expect(result).toBe(undefined);
    });

    test('Rule with no brackets', () => {
        const result = dynamicNaming('Some-rule');
        expect(result).toBe('Some-rule');
    });

    test('Rule with empty tokens', () => {
        const result = dynamicNaming('Some-rule-{}');
        expect(result).toBe(undefined);
    })

    test('Rule with unknown token', () => {
        const result = dynamicNaming('Some-rule-{blabla}');
        expect(result).toBe(undefined);
    });

    test("Rule with token which doesn't have value", () => {
        const result = dynamicNaming('Some-rule-{date}');
        expect(result).toBe('Some-rule-');
    });

    test('Rule with proper tokens', () => {
        const result = dynamicNaming('Some-rule-{kind}');
        expect(result).toBe('Some-rule-beautiful');
    })
})