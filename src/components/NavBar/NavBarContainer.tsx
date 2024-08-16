
import {connect} from "react-redux";
import {NavBar} from "./NavBar";
import {IState} from "../../redux/store";


export function UsersContainer(props: any) {
    return<NavBar id={props.id}/>
}


const mapStateToProps = (state: IState) => {
    return {
        id: state.auth.id,
    };
}

export default connect(mapStateToProps)(UsersContainer);