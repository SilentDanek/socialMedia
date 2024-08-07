import {IState} from "../../interfaces/IState";
import {connect} from "react-redux";
import {NavBar} from "./NavBar";


export function UsersContainer(props: any) {
    return<NavBar id={props.id}/>
}


const mapStateToProps = (state: IState) => {
    return {
        id: state.auth.id,
    };
}

export default connect(mapStateToProps)(UsersContainer);