export const updateItemsByCondition = (items:any[], fieldName:string, conditionValue:any, newValues:any) => {
    return items.map(
        (item) => {
            // @ts-ignore
            if (item[fieldName] === conditionValue) {
                return {...item, ...newValues};
            }
            return item;
        })
};