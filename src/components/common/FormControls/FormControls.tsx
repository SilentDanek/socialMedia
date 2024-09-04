import s from "./FormControls.module.css";
import { ElementType, FC } from "react";

type ValidatedElementType = (Element: ElementType) => FC;

export const ValidatedElement: ValidatedElementType = (Element) =>
    //@ts-ignore
    ({ input, meta: { touched, error }, ...props }) => {
        const hasError = touched && error;
        return (
            <div className={s.formControl + " " + (hasError ? s.error : "")}>
                <Element {...input} {...props} />
                {hasError && <span className={s.errorText}> {error} </span>}
            </div>
        );
    };

type FormErrorProps = {
    error: string;
    style?: string;
}
export const FormError: FC<FormErrorProps> = ({ style, error }) => {
    return <div className={style || s.formError}>
        {error}
    </div>;
};