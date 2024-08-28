import "./App.css"
import MainContainer from "./components/Main/MainContainer";
import {Footer} from "./components/Footer/Footer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {useEffect} from "react";

// @ts-ignore
window.store = store;

export function App() {
    useEffect(() => {
        const eventHandler = (event:PromiseRejectionEvent) => {
            console.error('Unhandled promise rejection:', event.reason);
            // Вы можете добавить дополнительную логику для обработки ошибки, например:
            // - Отправить ошибку на сервер
            // - Показать уведомление пользователю
            // - Логировать ошибку в файл
        }
        window.addEventListener('unhandledrejection', eventHandler);

        return () => window.removeEventListener('unhandledrejection', eventHandler);
    },[window]);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
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


