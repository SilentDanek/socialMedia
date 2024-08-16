import "./App.css"
import MainContainer from "./components/Main/Main";
import {Footer} from "./components/Footer/Footer";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";

// @ts-ignore
window.store = store;

export function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <NavBarContainer/>
                    <MainContainer/>
                    <Footer/>
                </div>
            </Provider>
        </BrowserRouter>
    );
}


