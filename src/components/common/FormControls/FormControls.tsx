import s from "./FormControls.module.css"
import {ElementType, FC} from "react";
import {WrappedFieldProps} from "redux-form";

type ValidatedElementType = (Element: ElementType) => FC<WrappedFieldProps>;

export const ValidatedElement: ValidatedElementType = (Element) =>
    ({input, meta: {touched, error}, ...props}) => {
        const hasError = touched && error;
        return (
            <div className={s.formControl + " " + (hasError ? s.error : "")}>
                <Element {...input} {...props}/>
                {hasError && <span className={s.errorText}> {error} </span>}
            </div>
        );
    };

type FormErrorProps = {
    error: string;
    style?: string;
}
export const FormError: FC<FormErrorProps> = ({style, error}) => {
    return <div className={style || s.formError}>
        {error}
    </div>;
};