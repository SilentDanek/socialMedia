import { FieldError, FieldErrors, FieldValues, Path, RegisterOptions, useFormContext } from "react-hook-form";
import { ElementType, useId } from "react";

type FieldProps<T extends FieldValues, TC> = {
    name: Path<T>;
    labelText?: string
    validateOptions?: RegisterOptions<T, Path<T>>;
    children?: any;
} & TC;

export const getErrorByFieldPath = <T extends FieldValues>(pathToField: Path<T>, error: FieldErrors<T>): FieldError => {
    const keys = pathToField.split(".");

    // Проходимся по массиву ключей и создаем вложенные объекты
    keys.forEach((key) => {
        // Проверяем, существует ли ключ в объекте
        if (error && error[key]) {
            error = error[key] as FieldErrors<T>;
        } else {
            return;
        }
    });

    return error as FieldError;
};

/*
  This function creates a hoc for html tags that are passed as strings.
  The component received after the call automatically displays an error near itself
  Has protection against errors such as incorrect form name field and the tag itself that was passed.
  When transferring labelText, a label appears that is attached to it
*/
const createFormElement = <TC, >(Component: ElementType) => {
    return <T extends FieldValues>({
                                       validateOptions,
                                       name,
                                       labelText,
                                       children,
                                       ...props
                                   }: FieldProps<T, TC>) => {
        const id = useId();
        const { register, formState: { errors } } = useFormContext<T>();
        const fieldError = getErrorByFieldPath(name, errors);

        return <div>
            {labelText && <label htmlFor={id} style={{ display: "block" }}>{labelText}</label>}

            <Component id={id}
                       {...props}
                       {...register(name, validateOptions)}
                       aria-invalid={Boolean(errors[name])}>
                {children}
            </Component>

            {fieldError && <div>{fieldError.message}</div>}
        </div>;
    };
};


export const TextareaFL = createFormElement<JSX.IntrinsicElements["textarea"]>("textarea");
export const InputFL    = createFormElement<JSX.IntrinsicElements["input"]>("input");
export const SelectFL   = createFormElement<JSX.IntrinsicElements["select"]>("select");