import { testArr } from './debugUtils.ts';

describe('testArr Proxy', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        while (testArr.pop()) {
            /* empty */
        }
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('should call console.log with the correct argument when push is called', () => {
        testArr.push('testValue');

        expect(consoleSpy).toHaveBeenCalledWith('testValue');
    });

    test('should add an element to the array when push is called', () => {
        testArr.push('newElement');

        expect(testArr.length).toBe(1);
        expect(testArr[0]).toBe('newElement');
    });

    test('should handle multiple pushes correctly', () => {
        testArr.push('firstElement');
        testArr.push('secondElement');

        expect(testArr.length).toBe(2);
        expect(testArr[0]).toBe('firstElement');
        expect(testArr[1]).toBe('secondElement');
    });

    test('should not interfere with other array methods', () => {
        testArr.push('element');

        expect(testArr.pop()).toBe('element');
        expect(testArr.length).toBe(0);
    });
});
