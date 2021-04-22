import React, { useState } from 'react';
import './AccountPage.css';
import { signupUser, loginUser } from '_api/User';

function LoginPage() {
    const [HashPasswordConfirm, setHashPasswordConfirm] = useState('');
    const [Password, setPassword] = useState('');
    const [Loginpw, setLoginpw] = useState('');
    const [LoginEmail, setLoginEmail] = useState('');
    const [PasswordConfirm, setPasswordConfirm] = useState('');
    const [Email, setEmail] = useState('');
    const [Nickname, setNickname] = useState('');
    const accountclick = event => {
        const container = document.getElementById('container');
        if (event.type === 'click') {
            if (event.target.id === 'signUp') {
                container.classList.add('right-panel-active');
            } else {
                container.classList.remove('right-panel-active');
            }
        }
    };

    const NicknameHandler = event => {
        console.log(event.currentTarget.value);
        setNickname(event.currentTarget.value);
    };

    const passwordHandler = event => {
        let pw = event.currentTarget.value;
        setPassword(pw);
    };

    const passwordConfirmHandler = event => {
        const pwconfirm = document.getElementById('passwordConfirm');
        let pw = event.currentTarget.value;
        setPasswordConfirm(pw);
        const sha = require('sha256');
        if (Password === pw) {
            setHashPasswordConfirm(sha(pw));
            pwconfirm.style.backgroundColor = '#eee';
        } else {
            console.log('not same');
            pwconfirm.style.backgroundColor = '#ffdcdc';
        }
    };

    const postSignup = () => {
        const body = { email: Email, password: HashPasswordConfirm, name: Nickname };
        console.log(body);
        signupUser(body)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const postLogin = () => {
        const body = { email: LoginEmail, password: Loginpw };
        loginUser(body)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const ValidEmail = event => {
        const email = document.getElementById('email');
        let asValue = event.currentTarget.value;
        let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (regExp.test(asValue) === true) {
            email.style.backgroundColor = '#eee';
            setEmail(asValue);
        } else {
            email.style.backgroundColor = '#ffdcdc';
        }
    };

    const loginPassword = event => {
        let pw = event.currentTarget.value;
        const sha = require('sha256');
        setLoginpw(sha(pw));
    };

    const loginEmail = event => {
        setLoginEmail(event.currentTarget.value);
    };

    return (
        <div className="account-body">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email"
                                onChange={ValidEmail}
                            />
                            <button id="check-btn">확인</button>
                        </div>
                        <input type="text" placeholder="Nickname" onChange={NicknameHandler} />
                        <input type="password" placeholder="Password" onChange={passwordHandler} />
                        <input
                            id="passwordConfirm"
                            type="password"
                            placeholder="PasswordConfirm"
                            onChange={passwordConfirmHandler}
                        />

                        <button onClick={postSignup}>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>

                        <input type="email" placeholder="Email" onChange={loginEmail} />
                        <input
                            id="login_pw"
                            type="password"
                            placeholder="Password"
                            onChange={loginPassword}
                        />
                        <a href="#">비밀번호 찾고 싶어?</a>
                        <button onClick={postLogin}>Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>코드:RUN 입장</h1>
                            <p>어서 로그인 해줭!</p>
                            <button className="ghost" id="signIn" onClick={accountclick}>
                                Sign In
                            </button>
                        </div>

                        <div class="overlay-panel overlay-right">
                            <h1>
                                코드:RUN은<br></br>
                                처음이지?
                            </h1>
                            <p>너의 상세한 정보가 궁금해</p>
                            <button className="ghost" id="signUp" onClick={accountclick}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
