import React, {useState} from "react";

export function ProfileStatus(props: any) {
    const [isStatusEditMode, setStatusEditMode] = useState(false);
    const [statusText, setStatusText] = useState(props.status as string);

    const toggleEditMode = () => {
        setStatusEditMode(!isStatusEditMode);
        if(isStatusEditMode){
            props.updateStatus(statusText);
        }
    }

    const onStatusChange = (e:React.ChangeEvent<HTMLInputElement>) => setStatusText(e.target.value);

    return (
        <div>
            <div>
                {isStatusEditMode ?
                    <div>
                        <input autoFocus
                               type="text"
                               onBlur={toggleEditMode}
                               onChange={onStatusChange}
                               value={statusText}/>
                    </div>:
                    <div>
                        <span onDoubleClick={toggleEditMode}>{props.status || "No status"}</span>
                    </div>
                }
            </div>
        </div>
    );
}