import s from "./FormControls.module.css"

export const ValidatedElement = (Element: string) => ({input, meta:{touched, error}, ...props}:any) => {
    const hasError = touched && error;
    Element = Element.toLowerCase();
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <Element {...input} {...props}/>
            {hasError && <span className={s.errorText}> {error} </span>}
        </div>
    );
};

export const FormError = ({style, error}: any) => {
    return <div className={style || s.formError}>
        {error}
    </div>;
};