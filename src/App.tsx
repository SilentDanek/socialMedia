import "./App.css"
import {Main}   from "./components/Main/Main";
import {Footer} from "./components/Footer/Footer";
import {NavBar} from "./components/NavBar/NavBar";
import HeaderContainer from "./components/Header/HeaderContainer";


export function App() {
  return (
    <div className="app-wrapper">
        <HeaderContainer/>
        <NavBar/>
        <Main  />
        <Footer/>
    </div>
  );
}