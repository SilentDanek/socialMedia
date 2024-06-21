import React from 'react';
import "./App.css"
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className="app-wrapper">
        <Header/>
        <Nav/>
        <Main/>
        <Footer/>
    </div>
  );
}

export default App;
