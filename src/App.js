import React from "react";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import Movie from "./pages/Movie/Movie";
import { LoginPage } from "./pages/User/LoginPage";
import { RegisterPage } from "./pages/User/RegisterPage";

import { history } from './user_store/helper';
import { alertAction } from './user_store/action';
import { PrivateRoute } from './user_store/component';
import "./assets/scss/_style_base.scss";
class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // location 변경시 alert 지우기
            this.props.clearAlerts();
        });
    }
    render() {
        // const { alert } = this.props;

        function Mobile(){
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
        if (Mobile()){//모바일일 경우
            document.getElementsByTagName('html')[0].classList.add('mobile'); 
        } else {//모바일 외
            document.getElementsByTagName('html')[0].classList.add('web');
        }
        return(
            <>
                {/* {alert.message && (
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                )} */}
                <Router history={history}>
                    <Header />
                    <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute path="/movie"  component={Movie} />

                        <Route path="/login" render={() => 
                            <LoginPage>
                                {alert.message && (
                                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                                )}
                            </LoginPage>
                            }
                         />

                        <Route path="/register" component={RegisterPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
                {/* <BrowserRouter history={history}>
                    <Header />
                        <Switch>
                            <Route path="/login" render={() => <LoginPage />} />
                            <Route path="/register"  render={() => <RegisterPage />} />
                            <PrivateRoute path="/"  render={() => <Home />} />
                            <PrivateRoute path="/movie"  render={() => <Movie />} />
                        </Switch>
                </BrowserRouter> */}
            </>
        )
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
  }
const actionCreators = {
    clearAlerts: alertAction.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
