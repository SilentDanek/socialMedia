import {ChangeEvent, FC, useEffect, useState} from "react";


type ProfileStatusProps = {
    status: string;
    updateStatus: (newStatus:string) => void;
}
// mb
export const ProfileStatus:FC<ProfileStatusProps> = ({status, updateStatus}) => {
    const [isStatusEditMode, setStatusEditMode] = useState(false);
    const [statusText, setStatusText] = useState(status);

    useEffect(() => setStatusText(status),[status]);

    const toggleEditMode = () => {
        setStatusEditMode(!isStatusEditMode);
        if (isStatusEditMode && statusText !== status) {
            updateStatus(statusText);
        }
    }

    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => setStatusText(e.target.value);

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