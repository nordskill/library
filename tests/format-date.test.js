import formatDate from '../functions/format-date';

describe("Get a date in given format", () => {
    test("No arguments given", () => {
        const result = () => formatDate();
        expect(result).toThrow();
    });

    test("yyyy-mm-dd style", () => {
        const result = formatDate(new Date(2024, 7, 17), 'yyyy-mm-dd');
        expect(result).toBe('2024-08-17');
    });

    test("yyyymmdd style", () => {
        const result = formatDate(new Date(2024, 7, 17), 'yyyymmdd');
        expect(result).toBe('20240817');
    });

    test("dd Mon yyyy style", () => {
        const result = formatDate(new Date(2024, 7, 17), 'dd Mon yyyy');
        expect(result).toBe('17 Aug 2024')
    })

    test('Unknown style', () => {
        const result = formatDate(new Date(2024, 7, 17), 'yymmdd');
        expect(result).toBeUndefined();
    })
})