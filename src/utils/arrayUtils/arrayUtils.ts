export const updateItemsByCondition = <T>(
    items: T[],
    fieldName: keyof T,
    conditionValue: T[keyof T],
    { ...newValues }: Partial<T>
) => {
    return items.map((item) => {
        if (item[fieldName] === conditionValue) {
            return { ...item, ...newValues };
        }
        return item;
    });
};
