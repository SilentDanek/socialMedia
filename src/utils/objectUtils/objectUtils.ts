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
