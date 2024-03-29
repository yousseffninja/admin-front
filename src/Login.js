import {useRef, useState, useEffect, useContext} from "react";
import useAuth from "./hooks/useAuth";
import {Link, useNavigate, useLocation} from 'react-router-dom'

import axios from './api/axios';

const LOGIN_URL = '/api/v1/users/login'

const Login = () => {
    const {setAuth} = useAuth()

    const navigate = useNavigate();
    const location = useLocation();
    const from =  "/product";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({
                    email,
                    password: pwd
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
            console.log(response?.data);
            const token = response?.token;
            const role = response?.data.role
            setAuth({email, pwd, role, token})
            setEmail('');
            setPwd('');
            window.location.replace('/product')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('no server response!');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "err,sg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account? <br/>
                <span className="line">
                  <a href="/register">Sign Up</a>
              </span>
            </p>
        </section>
    )
}

export default Login