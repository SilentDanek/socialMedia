export const generateRandomPercentage = (min: number, max: number) => {
    if (min < 0 || max < 0) {
        throw new Error('Only positive numbers are allowed');
    }
    if (max < min) {
        throw new Error('The max value cannot be less than the min');
    }
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber + '%';
};
