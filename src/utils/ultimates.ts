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

// Quick way to check calls and props
export const testArr:any = new Proxy([], {
    get(target, prop, receiver) {
        // Перехватываем методы массива
        if (prop === 'push') {
            return function(...args:any) {
                console.log(args[0])
                Reflect.apply(target[prop], target, args);
            };
        }
        return Reflect.get(target, prop, receiver);
    }
})
// @ts-ignore
window.testArr = testArr;