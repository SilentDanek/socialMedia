import React from 'react';
import "./App.css"
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="app-wrapper">
        <Header/>
        <NavBar/>
        <Main/>
        <Footer/>
    </div>
  );
}

export default App;
