import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../user_store/action';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                useremail: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.passBtnCLick = this.passBtnCLick.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault() 

        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.username && user.useremail && user.password) {
            this.props.register(user);
        }
    };
    
    passBtnCLick = (e) => {
        e.preventDefault() 
        
        const password = document.getElementsByClassName("password")[0]
        e.target.classList.toggle("show");

        if(e.target.classList.contains("show")){
            console.log("hide")
            e.target.innerText = "HIDE"
            password.setAttribute("type", "text")
        } else {
            console.log("show")
            e.target.innerText = "SHOW"
            password.setAttribute("type", "password")
        }
    };

    formChange = () => {
        const form = document.form;
        const submit = document.querySelector(".sign-in-btn")
        const chkEmail = checkValidEmail(form);
        const chkPw = checkValidPassword(form);
        const chkUsername = checkValidUsername(form);
        const chkPw2 = checkValidPassword2(form);
        
        if (chkEmail) {
            document.getElementById('alert_email').innerText = "";
            form.useremail.style.border = '2px solid';
            form.useremail.style.borderColor = '#00D000';
        } else {
            form.useremail.style.border = '2px solid';
            form.useremail.style.borderColor = '#FF0000';
            document.getElementById('alert_email').style.color = '#FF0000';
        }
        if (chkPw) {
            document.getElementById('alert_password').innerText = "";
            form.password.style.border = '2px solid';
            form.password.style.borderColor = '#00D000';
        } else {
            form.password.style.border = '2px solid';
            form.password.style.borderColor = '#FF0000';
            document.getElementById('alert_password').style.color = '#FF0000';
        }
        
        if (chkUsername) {
            document.getElementById('alert_username').innerText = "";
            form.username.style.border = '2px solid';
            form.username.style.borderColor = '#00D000';
        } else {
            form.username.style.border = '2px solid';
            form.username.style.borderColor = '#FF0000';
            document.getElementById('alert_username').style.color = '#FF0000';
        }
        if (chkPw2) {
            document.getElementById('alert_password2').innerText = "";
            form.password2.style.border = '2px solid';
            form.password2.style.borderColor = '#00D000';
        } else {
            form.password2.style.border = '2px solid';
            form.password2.style.borderColor = '#FF0000';
            document.getElementById('alert_password2').style.color = '#FF0000';
        }
    
        if (chkUsername && chkEmail && chkPw && chkPw2) {
            console.log('complete. form.submit();');
            console.log(submit)
            submit.classList.add("red")
            submit.disabled = false;
        } else {
            submit.classList.remove("red")
            submit.disabled = true;
        }

        function checkValidUsername(form) {
            if (form.username.value === "") {
                document.getElementById('alert_username').innerText = "????????? ??????????????????.";
                return false;
            }
            return true;
        }
        function checkValidPassword2(form) {
            if (form.password2.value === "") {
                document.getElementById('alert_password2').innerText = "???????????? ????????? ??????????????????.";
                return false;
            }
        
            if (form.password.value !== form.password2.value) {
                document.getElementById('alert_password2').innerText = "??????????????? ???????????? ????????????.";
                form.password.style.border = '2px solid';
                form.password.style.borderColor = '#FF0000';
                document.getElementById('alert_password').style.color = '#FF0000';
                return false;
            }
            return true;
        }

        function checkValidEmail(form) {
            if (form.useremail.value === "") {
                document.getElementById('alert_email').innerText = "???????????? ??????????????????.";
                return false;
            }
        
            const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        
            // "???@???.???" ????????? ?????? ??????.
            if (exptext.test(form.useremail.value) === false) {
                document.getElementById('alert_email').innerText = "????????? ????????? ????????????.";
                return false;
            }
        
            return true;
        }
        
        function checkValidPassword(form) {
            const pass_btn = document.getElementsByClassName("pass-btn")[0]
            const password = document.getElementsByClassName("password")[0]
            pass_btn.style.display = "inline-block"
        
            if (form.password.value === "") {
                document.getElementById('alert_password').innerText = "??????????????? ??????????????????.";
                pass_btn.style.display = "none"
                pass_btn.innerText = "SHOW"
                password.setAttribute("type", "password")
                //form.password.focus();
                return false;
            }
        
            const pw = form.password.value;
            // number
            const num = pw.search(/[0-9]/g);
            // alphabet
            const eng = pw.search(/[a-z]/ig);
            // special characters
            const spe = pw.search(/[`~!@@#$%^&*|?????????'???";:???/?]/gi);
        
            if (pw.length < 6) {
                // ?????? 6??????.
                document.getElementById('alert_password').innerText = "6?????? ????????? ??????????????? ??????????????????.";
                return false;
            } else if (pw.search(/\s/) != -1) {
                // ?????? ??????.
                document.getElementById('alert_password').innerText = "?????? ?????? ??????????????????.";
                return false;
            } else if (num < 0 && eng < 0 && spe < 0) {
                // ????????? ?????? ????????? ?????? ??????.
                document.getElementById('alert_password').innerText = "???????????? ????????? ????????????.";
                return false;
            }
            return true;
        }
    };

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;

        return (
            <div id="content" className="join">
                <div className="bg"></div>
                <div className="login-container">
                    { this.props.children }
                    <div className="login-box">
                        <h2>????????????</h2>
                        <form name="form" className="form-wrap" onSubmit={this.handleSubmit} onChange={this.formChange}>
                            <div className='form-group'>
                                <label className="tit" htmlFor="username">??????</label>
                                <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} placeholder="??????" />
                                <span id="alert_username" className="alert_txt"></span>
                            </div>
                            <div className='form-group'>
                                <label className="tit" htmlFor="useremail">?????????</label>
                                <input type="text" className="form-control" name="useremail" value={user.useremail} onChange={this.handleChange}  placeholder="?????????" />
                                <span id="alert_email" className="alert_txt"></span>
                            </div>
                            <div className='form-group'>
                                <label className="tit" htmlFor="password">????????????</label>
                                <div className='input-group'>
                                    <input type="password" className="form-control password" name="password" value={user.password} onChange={this.handleChange}  placeholder="????????????" />
                                    <button type="button" className="pass-btn" onClick={this.passBtnCLick}>SHOW</button>
                                </div>
                                <span id="alert_password" className="alert_txt"></span>
                            </div>
                            <div className='form-group'>
                                <label className="tit" htmlFor="password">????????????</label>
                                <input type="password" className="form-control" name="password2" placeholder="???????????? ??????" />
                                <span id="alert_password2" className="alert_txt"></span>
                            </div>
                            <div className="form-group">
                                <div className="btn-wrap">
                                    <button type="submit" className="full sign-in-btn btn btn-primary" disabled={true}>
                                        {registering && 
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        ????????????
                                    </button>
                                </div>
                            </div>
                            <div className="before-sign-up">
                                <Link to="/login" className="full sign-in-btn">????????? ?????? ??????</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default RegisterPage

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };