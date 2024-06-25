import s from "./Dialogs.module.css"

function Dialogs(){
    return(
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog}>
                    Ярик
                </div>
                <div className={s.dialog}>
                    Саша
                </div>
                <div className={s.dialog}>
                    Славик
                </div>
                <div className={s.dialog}>
                    Миша
                </div>
            </div>
            <div className={s.massages}>
                <div className={s.massage}>
                    Hi
                </div>
                <div className={s.massage}>
                    Hello
                </div>
                <div className={s.massage}>
                    Привет
                </div>
                <div className={s.massage}>
                    Хай
                </div>
            </div>
        </div>
    )
}

export default Dialogs;