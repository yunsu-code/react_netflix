import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../user_store/action';
import "./user.scss";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // 로그인 상태 리셋
        this.props.logout();

        this.state = {
            useremail: "",
            password: "",
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { useremail, password } = this.state;
        if (useremail && password) {
            this.props.login( useremail, password );
        }
        console.log("submitted")
    }

    formChange = () => {
        const form = document.form;
        const submit = document.querySelector(".sign-in-btn")
        const chkEmail = checkValidEmail(form);
        const chkPw = checkValidPassword(form);

        if (chkEmail && chkPw) {
            console.log('complete. form.submit();');
            console.log(submit)
            submit.classList.add("red")
            submit.disabled = false;
            //form.submit();
        } else {
            submit.classList.remove("red")
            submit.disabled = true;
        }

        function checkValidEmail(form) {
            if (form.useremail.value === "") {
                return false;
            }
            return true;
        }

        function checkValidPassword(form) {
            if (form.password.value === "") {
                return false;
            }
            return true;
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { useremail, password, submitted } = this.state;
        return (
            <div id="content" className="login">
                <div className="bg"></div>
                <div className="login-container">
                    { this.props.children }
                    <div className="login-box">
                        <h2>로그인</h2>
                        <form name="form" className="form-wrap" onSubmit={this.handleSubmit} onChange={this.formChange}>
                            <div className={'form-group' + (submitted && !useremail ? ' has-error' : "")}>
                                <label className="tit" htmlFor="useremail">이메일</label>
                                <input type="text" className="form_input" name="useremail" value={useremail} onChange={this.handleChange} placeholder="이메일" />
                                {submitted && !useremail &&
                                    <span id="alert_email" className="alert_txt red">이메일이 일치 하지않습니다.</span>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : "")}>
                                <label className="tit" htmlFor="password">비밀번호</label>
                                <input type="password" className="form_input" name="password" value={password} onChange={this.handleChange}  placeholder="비밀번호" />
                                {submitted && !password &&
                                    <span id="alert_email" className="alert_txt red">비밀번호가 일치 하지않습니다.</span>
                                }
                            </div>
                            <div className="form-group mg0">
                                <button type="submit" className="full sign-in-btn btn btn-primary"  disabled={true}>
                                    {loggingIn &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    로그인
                                </button>
                            </div>
                            <div className="before-sign-up">
                                <p>아직 회원가입 전이신가요? <Link to="/register" className="full sign-in-btn">회원가입</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };