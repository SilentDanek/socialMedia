// Quick way to check calls and props
export const testArr = new Proxy([], {
    get(target, prop, receiver) {
        // Перехватываем методы массива
        if (prop === 'push') {
            return function (...args: never) {
                console.log(args[0]);
                Reflect.apply(target[prop], target, args);
            };
        }
        return Reflect.get(target, prop, receiver);
    }
});

declare global {
    interface Window {
        testArr: typeof testArr;
    }
}

window.testArr = testArr;
