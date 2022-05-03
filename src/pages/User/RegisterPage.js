import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../user_store/action';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
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

// function RegisterPage(props) {
//     const login = () => {
//         var content = document.getElementById("content")
//         const form = document.getElementsByClassName("form-wrap")[0]
//         const submit = document.querySelector(".sign-in-btn")
//         function formChange() {
//             console.log("sssssssss")
//             const form = document.login_form;
//             const chkEmail = checkValidEmail(form);
//             const chkPw = checkValidPassword(form);
            
//             if (chkEmail) {
//                 document.getElementById('alert_email').innerText = "";
//                 form.user_email.style.border = '2px solid';
//                 form.user_email.style.borderColor = '#00D000';
//             } else {
//                 form.user_email.style.border = '2px solid';
//                 form.user_email.style.borderColor = '#FF0000';
//                 document.getElementById('alert_email').style.color = '#FF0000';
//             }
//             if (chkPw) {
//                 document.getElementById('alert_password').innerText = "";
//                 form.user_password.style.border = '2px solid';
//                 form.user_password.style.borderColor = '#00D000';
//             } else {
//                 form.user_password.style.border = '2px solid';
//                 form.user_password.style.borderColor = '#FF0000';
//                 document.getElementById('alert_password').style.color = '#FF0000';
//             }

//             if(content.classList.contains("login")) {
//                 if (chkEmail && chkPw) {
//                     console.log('complete. form.submit();');
//                     submit.classList.add("red")
//                     submit.disabled = false;
//                     //form.submit();
//                 } else {
//                     submit.classList.remove("red")
//                     submit.disabled = true;
//                 }
//             }

//             if(content.classList.contains("join")) {
//                 const chkUsername = checkValidUsername(form);
//                 const chkPw2 = checkValidPassword2(form);
//                 if (chkUsername) {
//                     document.getElementById('alert_username').innerText = "";
//                     form.user_name.style.border = '2px solid';
//                     form.user_name.style.borderColor = '#00D000';
//                 } else {
//                     form.user_name.style.border = '2px solid';
//                     form.user_name.style.borderColor = '#FF0000';
//                         document.getElementById('alert_username').style.color = '#FF0000';
//                 }
//                 if (chkPw2) {
//                     document.getElementById('alert_password2').innerText = "";
//                     form.user_password2.style.border = '2px solid';
//                     form.user_password2.style.borderColor = '#00D000';
//                 } else {
//                     form.user_password2.style.border = '2px solid';
//                     form.user_password2.style.borderColor = '#FF0000';
//                     document.getElementById('alert_password2').style.color = '#FF0000';
//                 }
            
//                 if (chkUsername && chkEmail && chkPw && chkPw2) {
//                     console.log('complete. form.submit();');
//                     submit.classList.add("red")
//                     submit.disabled = false;
//                     //form.submit();
//                 } else {
//                     submit.classList.remove("red")
//                     submit.disabled = true;
    
//                 }

//                 function checkValidUsername(form) {

//                         if (form.user_name.value === "") {
//                             document.getElementById('alert_username').innerText = "이름을 입력해주세요.";
//                             //form.username.focus();
//                             return false;
//                         }
                
//                     return true;
//                 }
//                 function checkValidPassword2(form) {
//                     if (form.user_password2.value === "") {
//                         document.getElementById('alert_password2').innerText = "비밀번호 확인을 입력해주세요.";
//                         //form.password.focus();
//                         return false;
//                     }
                
//                     if (form.user_password.value !== form.user_password2.value) {
//                         document.getElementById('alert_password2').innerText = "비밀번호가 일치하지 않습니다.";
//                         form.user_password.style.border = '2px solid';
//                         form.user_password.style.borderColor = '#FF0000';
//                         document.getElementById('alert_password').style.color = '#FF0000';
//                         return false;
//                     }
                
//                     return true;
//                 }
//             }
//         }
//     }
    
//     function checkValidEmail(form) {
//         if (form.user_email.value === "") {
//             document.getElementById('alert_email').innerText = "이메일을 입력해주세요.";
//             //form.email.focus();
//             return false;
//         }
    
//         const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    
//         // "ㅁ@ㅁ.ㅁ" 이메일 형식 검사.
//         if (exptext.test(form.user_email.value) === false) {
//             document.getElementById('alert_email').innerText = "이메일 형식이 아닙니다.";
//             //form.email.select();
//             return false;
//         }
    
//         return true;
//     }
//     const pass_btn = document.getElementsByClassName("pass-btn")[0]
//     const password = document.getElementsByClassName("password")[0]
//     function passBtnCLick () {
//         pass_btn.classList.toggle("show");
//         if(pass_btn.classList.contains("show")){
//             console.log("hide")
//             pass_btn.innerText = "HIDE"
//             password.setAttribute("type", "text")
//         } else {
//             console.log("show")
//             pass_btn.innerText = "SHOW"

//             password.setAttribute("type", "password")
//         }
//     }
    
//     function checkValidPassword(form) {
//         pass_btn.style.display = "inline-block"

//         if (form.user_password.value === "") {
//             document.getElementById('alert_password').innerText = "비밀번호를 입력해주세요.";
//             pass_btn.style.display = "none"
//             pass_btn.innerText = "SHOW"
//             password.setAttribute("type", "password")
//             //form.password.focus();
//             return false;
//         }
    
//         const pw = form.user_password.value;
//         // String.prototype.search() :: 검색된 문자열 중에 첫 번째로 매치되는 것의 인덱스를 반환한다. 찾지 못하면 -1 을 반환한다.
//         // number
//         const num = pw.search(/[0-9]/g);
//         // alphabet
//         const eng = pw.search(/[a-z]/ig);
//         // special characters
//         const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    
//         if (pw.length < 6) {
//             // 최소 6문자.
//             document.getElementById('alert_password').innerText = "6글자 이상의 비밀번호를 입력해주세요.";
//             return false;
//         } else if (pw.search(/\s/) !== -1) {
//             // 공백 제거.
//             document.getElementById('alert_password').innerText = "공백 없이 입력해주세요.";
//             return false;
//         } else if (num < 0 && eng < 0 && spe < 0) {
//             // 한글과 같은 문자열 입력 방지.
//             document.getElementById('alert_password').innerText = "비밀번호 형식이 아닙니다.";
//             return false;
//         }
        
//         return true;
//     }
//     login()
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const [Name, setName] = useState("");
//   const [ConfirmPasword, setConfirmPasword] = useState("");
//   const dispatch = useDispatch();

//   const onEmailHandler = (e) => {
//     setEmail(e.currentTarget.value);
//   };

//   const onNameHandler = (e) => {
//     setName(e.currentTarget.value);
//   };

//   const onPasswordHanlder = (e) => {
//     setPassword(e.currentTarget.value);
//   };

//   const onConfirmPasswordHandler = (e) => {
//     setConfirmPasword(e.currentTarget.value);
//   };

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     if (Password === ConfirmPasword) {
//       let body = {
//         email: Email,
//         name: Name,
//         password: Password,
//       };
//       dispatch(registerUser(body)).then((res) => {
//         alert("가입이 정상적으로 완료되었습니다");
//         props.history.push("/login");
//       });
//     } else {
//       alert("비밀번호가 일치하지 않습니다");
//     }
//   };
//   return (
//     <div id="content" className="join">
//         <div className="bg"></div>
//         <div className="login-box">
//             <h2>회원가입</h2>
//             <form name="login_form" className="form-wrap" action="/Register" onChange={login.formChange} >
//                 <div className="input-wrap">
//                     <div className="tit">이름</div>
//                     <input type="text" name="user_name" v-model="user_name" placeholder="이름" className="form_input" />
//                     <span id="alert_username" className="alert_txt"></span>
//                 </div>
//                 <div className="input-wrap">
//                     <div className="tit">이메일</div>
//                     <input type="text" name="user_email"  v-model="user_email" className="form_input" placeholder="이메일" />
//                     <span id="alert_email" className="alert_txt"></span>
//                 </div>
//                 <div className="input-wrap">
//                     <div className="tit">비밀번호</div>
//                     <div className="relative">
//                         <input type="password" name="user_password" v-model="user_password" className="form_input password" placeholder="비밀번호" />
//                         <button type="button" className="pass-btn " onClick={passBtnCLick}>SHOW</button>
//                     </div>
//                     <span id="alert_password" className="alert_txt"></span>
//                 </div>
//                 <div className="input-wrap">
//                     <div className="tit">비밀번호 확인</div>
//                     <input type="password" name="user_password2"  placeholder="비밀번호 확인" className="form_input" />
//                     <span id="alert_password2" className="alert_txt"></span>
//                 </div>
//             </form>
//             <div className="btn-wrap">
//                 <button type="button" className="full sign-in-btn" disabled="">회원가입</button>
//             </div>
//         </div>
//     </div>
//   );
// }

// export default RegisterPage;