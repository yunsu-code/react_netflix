import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Movie from "./pages/Movie/Movie";

import "./assets/scss/_style_base.scss";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" exact render={() => <Home />} />
                <Route path="/login"  render={() => <Login />} />
                <Route path="/register"  render={() => <Register />} />
                <Route path="/movie"  render={() => <Movie />} />
                
            </Switch>
        </BrowserRouter>
    )
}

export default App;