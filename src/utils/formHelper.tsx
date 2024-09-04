import { FieldError, FieldErrors, FieldValues, Path, RegisterOptions, useFormContext } from "react-hook-form";
import { ElementType, useId } from "react";

type FieldProps<T extends FieldValues, TC> = {
    name: Path<T>;
    labelText?: string
    validateOptions?: RegisterOptions<T, Path<T>>;
} & Partial<TC>;

export const getErrorByFieldPath = <T extends FieldValues>(pathToField: Path<T>, error: FieldErrors<T>):FieldError => {
    const keys = pathToField.split(".");

    // Проходимся по массиву ключей и создаем вложенные объекты
    keys.forEach((key) => {
        // Проверяем, существует ли ключ в объекте
        if (error && error[key]) {
            error = error[key] as FieldErrors<T>;
        } else {
            return
        }
    });

    return error as FieldError;
};

const createFormElement = <TC extends HTMLElement = any>(Component: ElementType) => {
    return <T extends FieldValues>({
                                       validateOptions,
                                       name,
                                       labelText,
                                       ...props
                                   }: FieldProps<T, TC>) => {
        const id = useId();
        const { register, formState: { errors } } = useFormContext<T>();
        const fieldError = getErrorByFieldPath(name, errors);

        return <div>
            {labelText && <label htmlFor={id} style={{ display: "block" }}>{labelText}</label>}
            <Component
                id={id}
                {...props}
                {...register(name, validateOptions)}
                aria-invalid={Boolean(errors[name])}
            />
            {fieldError && <div>{fieldError.message}</div>}
        </div>;
    };
};


export const TextareaFL = createFormElement<HTMLTextAreaElement>("textarea");
export const InputFL = createFormElement<HTMLInputElement>("input");