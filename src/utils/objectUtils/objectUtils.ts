export const deepNoRefEqual = <T>(obj1: T, obj2: T): boolean => {
    if (!obj1 || !obj2) return obj1 === obj2;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return obj1 === obj2;
    }

    const keys1 = Object.keys(obj1) as Array<keyof T>;
    const keys2 = Object.keys(obj2) as Array<keyof T>;

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepNoRefEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
};
