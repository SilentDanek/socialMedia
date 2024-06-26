import s from "./Massage.module.css";

type massage={
    massage:string;
}

function Massage(props:massage){
    return(
        <div className={s.massage}>
            {props.massage}
        </div>
    )
}


export default Massage;