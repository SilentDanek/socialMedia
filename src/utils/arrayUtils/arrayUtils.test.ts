import { updateItemsByCondition } from './arrayUtils';

describe('arrayUtils', () => {
    test('should update items in the array when condition is met', () => {
        const items = [
            { id: 1, name: 'Item 1', status: 'active' },
            { id: 2, name: 'Item 2', status: 'inactive' }
        ];
        expect(updateItemsByCondition(items, 'status', 'inactive', { status: 'changed' })).toEqual([
            { id: 1, name: 'Item 1', status: 'active' },
            { id: 2, name: 'Item 2', status: 'changed' }
        ]);
    });
    test("shouldn't update elements in an array if a condition is not met", () => {
        const items = [
            { id: 1, name: 'Item 1', status: 'active' },
            { id: 2, name: 'Item 2', status: 'inactive' }
        ];
        expect(updateItemsByCondition(items, 'status', 'disabled', { status: 'changed' })).toEqual([
            { id: 1, name: 'Item 1', status: 'active' },
            { id: 2, name: 'Item 2', status: 'inactive' }
        ]);
    });
});
