import {Dialogs} from "./Dialogs";
import {useAppSelector} from "../../../redux/store";
import {sendMessage} from "../../../redux/ducks/dialogs/actions";
import {getDialogsPage} from "../../../redux/ducks/dialogs/selectors";
import {useAuthRedirect} from "../../../hooks/useAuthRedirect";
import {useActions} from "../../../hooks/useActions";


const DialogsContainer = () => {
    useAuthRedirect();

    const dialogsPage = useAppSelector(getDialogsPage);
    const [sendMessageD] = useActions([sendMessage]);

    return <Dialogs dialogsPage={dialogsPage} sendMessage={sendMessageD}/>
}

//Default export for lazy load
export default DialogsContainer;