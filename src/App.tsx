import "./App.css"
import {Footer} from "./components/Footer/Footer";
import {Header} from "./components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux";
import {useEffect} from "react";
import {NavBar} from "./components/NavBar/NavBar";
import {Main} from "./components/Main/Main";

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
                    <Header/>
                    <NavBar/>
                    <Main/>
                    <Footer/>
                </div>
            </Provider>
        </BrowserRouter>
    );
}


