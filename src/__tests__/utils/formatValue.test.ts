import { Currencies, formatValue } from "src/utils/currency";

describe("formatValue", () => {
    it("should format BTC correctly", () => {
        const value = "1.23";
        const currency = Currencies.BTC;
        const expectedResult = "₿1.23";

        const result = formatValue(value, currency);
        expect(result).toEqual(expectedResult);
    });

    it("should format EUR correctly", () => {
        const value = "1.23";
        const currency = Currencies.EUR;
        const expectedResult = "€1.23";

        const result = formatValue(value, currency);
        expect(result).toEqual(expectedResult);
    });

    it("should format USD correctly", () => {
        const value = "1.23";
        const currency = Currencies.USD;
        const expectedResult = "$1.23";

        const result = formatValue(value, currency);
        expect(result).toEqual(expectedResult);
    });
});