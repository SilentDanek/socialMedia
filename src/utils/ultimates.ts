export const updateItemsByCondition = <T>(items:T[], fieldName:keyof T, conditionValue:T[keyof T], {...newValues}:Partial<T>) => {
    return items.map(
        (item) => {
            if (item[fieldName] === conditionValue) {
                return {...item, ...newValues};
            }
            return item;
        })
};

// Quick way to check calls and props
export const testArr = new Proxy([], {
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
declare global {
    interface Window {
        testArr: typeof testArr;
    }
}

window.testArr = testArr;