import { formatDate } from './dateUtils.ts';

describe('arrayUtils', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => {
        return new Date('Wed Oct 16 2024 20:00:00 GMT+0300').getTime();
    });

    test('should return day of week but only 3 symbols (locale en)', () => {
        const date = 'Tue Oct 15 2024 16:30:00 GMT+0300';
        expect(formatDate(date, 'en')).toBe('Tue');
    });
    test('should return only hours and minutes', () => {
        const date = 'Wed Oct 16 2024 16:30:00 GMT+0300';
        expect(formatDate(date)).toBe('19:30');
    });
    test('should return day of week but only 3 symbols (locale en)', () => {
        const date = 'Tue Oct 15 2024 16:30:00 GMT+0300';
        expect(formatDate(date, 'en')).toBe('Tue');
    });
    test('should return day of week but only 2 symbols (locale ua)', () => {
        const date = 'Tue Oct 15 2024 16:30:00 GMT+0300';
        expect(formatDate(date)).toBe('Вт');
    });
    test('should return date and month (locale ua)', () => {
        const date = 'Tue Oct 1 2024 16:30:00 GMT+0300';
        expect(formatDate(date)).toBe('1 жовт.');
    });
    test('should return date and month (locale ua)', () => {
        const date = 'Tue Oct 3 2023 16:30:00 GMT+0300';
        expect(formatDate(date)).toBe('рік тому');
    });
    test('should return date and month (locale ua)', () => {
        const date = '321 invalid date format 123';
        expect(() => formatDate(date)).toThrow();
    });
});
