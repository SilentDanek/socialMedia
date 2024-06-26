import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";

function Dialogs(props:any){
    return(
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name={"Ярик"}   id={1}/>
                <DialogItem name={"Саша"}   id={2}/>
                <DialogItem name={"Славик"} id={3}/>
                <DialogItem name={"Миша"}   id={4}/>
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