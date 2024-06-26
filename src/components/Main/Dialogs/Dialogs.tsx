import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Massage from "./Massage/Massage";

function dialogsElements(tempStoreUsers:any) {
    return tempStoreUsers.map(({name, id}:{name:string, id:number})=> {
        return <DialogItem name={name} id={id}/>;
    });
}

function massagesElements(tempStoreMes:string[]) {
    return tempStoreMes.map((massage) => <Massage massage={massage}/>);

}

function Dialogs(props:any){
    const tempStoreUsers = [{name:"Ярик", id:1}, {name:"Саша", id:2}, {name:"Славик", id:3}, {name:"Миша", id:4}];
    const tempStoreMes = ["Hi", "Hello", "Привет", "Хай"];


    return(
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements(tempStoreUsers)}
            </div>
            <div className={s.massages}>
                {massagesElements(tempStoreMes)}
            </div>
        </div>
    )
}

export default Dialogs;