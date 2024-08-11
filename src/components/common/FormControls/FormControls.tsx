import s from "./FormControls.module.css"


export const ValidatedElement = (Element: string) => ({input, meta, ...props}: any) => {
    const hasError = meta.touched && meta.error;
    Element = Element.toLowerCase();
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <Element {...input} {...props}/>
            {hasError && <span className={s.errorText}> {meta.error} </span>}
        </div>
    );
};