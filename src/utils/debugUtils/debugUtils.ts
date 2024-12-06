// Quick way to check calls and props
export const testArr = new Proxy([], {
    get(target: any, prop, receiver) {
        if (prop === 'push') {
            return function (...args: any) {
                console.log(args[0]);
                Reflect.apply(target[prop], target, args);
            };
        }
        return Reflect.get(target, prop, receiver);
    }
});
