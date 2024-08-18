import React, {useEffect, useState} from "react";

export function ProfileStatus({status, updateStatus}: any) {
    const [isStatusEditMode, setStatusEditMode] = useState(false);
    const [statusText, setStatusText] = useState(status as string);

    useEffect(() => setStatusText(status),[status])


    const toggleEditMode = () => {
        setStatusEditMode(!isStatusEditMode);
        if (isStatusEditMode && statusText !== status) {
            updateStatus(statusText);
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
                        <span onDoubleClick={toggleEditMode}>{status || "No status"}</span>
                    </div>
                }
            </div>
        </div>
    );
}