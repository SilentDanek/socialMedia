import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Massage from "./Massage/Massage";

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
                <Massage massage={"Hi"}/>
                <Massage massage={"Hello"}/>
                <Massage massage={"Привет"}/>
                <Massage massage={"Хай"}/>
            </div>
        </div>
    )
}

export default Dialogs;