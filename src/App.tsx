import "./App.css"
import {Main}   from "./components/Main/Main";
import {Footer} from "./components/Footer/Footer";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";


export function App() {
  return (
    <div className="app-wrapper">
        <HeaderContainer/>
        <NavBarContainer/>
        <Main  />
        <Footer/>
    </div>
  );
}