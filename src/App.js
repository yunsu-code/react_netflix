import React from "react";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { LoginHeader } from "./components/header/LoginHeader";
import UnLoginHeader from "./components/header/UnLoginHeader";
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

        // location 변경시 alert 지우기
        history.listen((location, action) => {
            this.props.clearAlerts();
        })
    }
    render() {
        const { alert } = this.props;

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
            <Router history={history}>
            <Route
                render={({ location }) => {
                    console.log(location.pathname)
                    if (location.pathname === "/login" || location.pathname === "/register") {
                        return (
                            <UnLoginHeader />
                        );
                    } else {
                        return <LoginHeader />;
                    }
                }}
                ></Route>
                <Switch>
                    <PrivateRoute exact path="/home" component={Home} />
                    <PrivateRoute path="/movie"  component={Movie} />

                    <Route path="/login" render={() => 
                        // eslint-disable-next-line react/no-children-prop
                        <LoginPage children={
                            <>
                            {alert.message && (
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            )}
                            </>
                        }>
                        </LoginPage>
                        }
                    />
                    <Route path="/register" render={() => 
                        // eslint-disable-next-line react/no-children-prop
                        <RegisterPage children={
                            <>
                            {alert.message && (
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            )}
                            </>
                        }>
                        </RegisterPage>
                        }
                    />
                    <Redirect from="*" to="/login" />
                </Switch>
            </Router>
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
