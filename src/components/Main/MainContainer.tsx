import {useAppSelector} from "../../redux/store";
import {getErrorPageMessage, getIsInitialized} from "../../redux/ducks/main/selectors";
import {useActions} from "../../hooks/useActions";
import {initialize} from "../../redux/ducks/main/thunks";
import {Main} from "./Main";

const MainContainer = () => {
    const isInitialized = useAppSelector(getIsInitialized);
    const errorMessage = useAppSelector(getErrorPageMessage);
    const [initializeD] = useActions([initialize]);

    return (<Main isInitialized={isInitialized} initialize={initializeD} errorMessage={errorMessage}/>);
}

export default MainContainer;