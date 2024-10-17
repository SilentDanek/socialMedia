import { deepNoRefEqual } from './objectUtils.ts';

describe('deepNoRefEqual', () => {
    const obj1 = { game: 'rust', skill: 'average' };

    test('should return false if some field value are not equal', () => {
        const obj2 = { game: 'dota', skill: 'noob' };

        expect(deepNoRefEqual(obj1, obj2)).toEqual(false);
    });
    test('should return true if all field value are equal', () => {
        const obj2 = { game: 'rust', skill: 'average' };

        expect(deepNoRefEqual(obj1, obj2)).toEqual(true);
    });
    test('should return false because second object have extra field', () => {
        const obj2 = { game: 'rust', skill: 'average', age: 20 };

        expect(deepNoRefEqual(obj1, obj2)).toEqual(false);
    });
});
