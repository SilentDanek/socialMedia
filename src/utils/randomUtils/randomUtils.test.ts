import { generateRandomPercentage } from './randomUtils.ts';

describe('generateRandomPercentage', () => {
    test('should return value between 10 and 100', () => {
        const randomPercent = parseInt(generateRandomPercentage(10, 100));

        expect(randomPercent >= 10 && randomPercent <= 100).toBe(true);
    });
    test('should return value between 0 and 100', () => {
        const randomPercent = parseInt(generateRandomPercentage(0, 100));

        expect(randomPercent >= 0 && randomPercent <= 100).toBe(true);
    });
    test('should throw error if some number negative', () => {
        const randomPercent = () => generateRandomPercentage(-100, 100);

        expect(randomPercent).toThrow('Only positive numbers are allowed');
    });
    test('should throw error if max value bigger then min value', () => {
        const randomPercent = () => generateRandomPercentage(50, 25);
        expect(randomPercent).toThrow('The max value cannot be less than the min');
    });
});
