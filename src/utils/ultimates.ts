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

export const generateRandomPercentage = (min: number, max: number) => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber + '%';
};

declare global {
    interface Window {
        testArr: typeof testArr;
    }
}

window.testArr = testArr;

export const deepNoRefEqual = <T>(obj1: T, obj2: T): boolean => {
    // Проверка на null или undefined
    if (!obj1 || !obj2) return obj1 === obj2;

    // Проверка на тип данных; если не объект, то сравниваем значения напрямую
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return obj1 === obj2;
    }

    // Получаем массивы ключей объектов
    const keys1 = Object.keys(obj1) as Array<keyof T>;
    const keys2 = Object.keys(obj2) as Array<keyof T>;

    // Сравниваем количество ключей в обоих объектах
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Проверяем наличие и равенство значений по каждому ключу
    for (const key of keys1) {
        if (!keys2.includes(key) || !deepNoRefEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
};
