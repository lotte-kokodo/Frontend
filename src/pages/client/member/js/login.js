import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {ServerConfigContext} from "../../../../context/serverConfigProvider"

import kakaoLogo from '../../../../src_assets/login/kakao-login-logo.png'
import naverLogo from '../../../../src_assets/login/naver-login-logo.png'

import "../css/login.css";

function Login() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [bCheked,setChecked] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);
    const history = useNavigate();
    const { url, frontUrl } = useContext(ServerConfigContext);

    useEffect(() => {
        if(cookies.rememberId !== undefined) {
            setInputId(cookies.rememberId);
            setChecked(true);
        }
    },[cookies.rememberId]);

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const checkHandler = () => {
        setChecked(!bCheked)
    }

    const onClickLogin = () => {
        const params = {"loginId":inputId,"password":inputPw};
        fetchLogin(params);
    }

    const onClickKakao = () => {
        const REST_API_KEY = "6eba566b2a92f612fb5cf08e93c15ac5";
        const REDIRECT_URI = frontUrl + "/login/kakao"
        const kakaoOAuthApi = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = kakaoOAuthApi;
    }

    const onClickNaver = () => {
        const CLIENT_ID = "Rjyho8H2B4sgRJf9JE1c"
        const REDIRECT_URI = frontUrl + "/login/naver";
        const naverOAuthApi = `https://nid.naver.com/oauth2.0/authorize?response_type=code&state=1234&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
        window.location.href = naverOAuthApi;
    }

    const fetchLogin = async (params) => {
        await axios({
            method: "post",
            url: url + "/member-service/login",
            data : params
        })
        .then(function(response){
            localStorage.setItem("memberId",response.data.memberId);
            localStorage.setItem("accessToken",response.data.accessToken);
            localStorage.setItem("refreshToken",response.data.refreshToken);

            if(localStorage.getItem("accessToken") !== null || localStorage.getItem("accessToken") !== ""){

                if(bCheked){
                    setCookie('rememberId', inputId, {maxAge: 2000});
                } else{
                    removeCookie('rememberId');
                }

                alert("로그인에 성공했습니다.");
                history("/");
                window.location.reload();
            }else {
                alert("로그인에 실패했습니다. 관리자에게 문의하세요.");
            }
        })
        .catch(function(error){
            alert("아이디와 비밀번호를 확인하세요.");
            console.log(error);
        })
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    {/*<div className="card-header">*/}
                    {/* <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span>
                        </div> */}
                    {/*</div>*/}
                    <div className="card-body">
                        <h3>로그인</h3><br/>

                        <form method='post'>
                            <div className="input-group form-group">
                                <input type="text" className="form-control" name='input_login_id' value={inputId} onChange={handleInputId} placeholder="아이디" />

                            </div>
                            <div className="input-group form-group">
                                <input type="password" className="form-control" name='input_login_pw' value={inputPw} onChange={handleInputPw} placeholder="비밀번호" autoComplete="on" />
                            </div>
                            <div className="form-check idCheck">
                                <input className="form-check-input" type="checkbox" id="flexCheckChecked" checked={bCheked} onChange={checkHandler}/>
                                <label className="form-check-label" >아이디 저장</label>
                            </div>
                        </form>
                        <div className="login-group">
                            <div className="form-group">
                                <button className="btn float-right login_btn" onClick={onClickLogin} >로그인하기 </button>
                            </div>
                            <div className="form-group">
                                <button className="btn float-right kakao" onClick={onClickKakao} >
                                    <img className="login-logo-img" src={kakaoLogo}/>카카오로 시작하기 </button>
                            </div>
                            <div className="form-group">
                                <button className="btn float-right naver" onClick={onClickNaver}>
                                    <img className="login-logo-img" src={naverLogo}/>네이버로 시작하기 </button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <span className="login-signup-suggestion-span">아직 회원이 아니신가요?</span>
                    </div>
                    <div className="d-flex justify-content-center links">
                        <Link to="/signup"><button className="btn signup-btn">회원가입</button></Link>
                    </div><br/>


                </div>
            </div>
        </div>
    )
}

export default Login;
