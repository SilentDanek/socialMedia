export class FormError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FormError';
    }
}

export class ContactFormError extends FormError {
    constructor(message: string) {
        super(message);
        this.name = 'ContactFormError';
    }

    getInvalidField<T>() {
        const field = this.message
            .match(/\((.*?)\)/)?.[1]
            .replace(/->/, '.')
            .toLowerCase();
        return field as keyof T;
    }
}
