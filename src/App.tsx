import "./App.css"
import MainContainer   from "./components/Main/Main";
import {Footer} from "./components/Footer/Footer";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavBarContainer from "./components/NavBar/NavBarContainer";


export function App() {
  return (
    <div className="app-wrapper">
        <HeaderContainer/>
        <NavBarContainer/>
        <MainContainer  />
        <Footer/>
    </div>
  );
}


