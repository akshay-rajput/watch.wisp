import React, {useState, useContext, useRef} from 'react'
import styles from './Login.module.css';
import {MdVisibility, MdVisibilityOff} from 'react-icons/md';
import {Link} from 'react-router-dom';

import axios from 'axios';
import useLocalStorage from '../Hooks/useLocalStorage';
import {useAuth} from '../Store/AuthContext';

export default function Login() {
    const {authState, authDispatch} = useAuth();
    
    const [userId, setUserId] = useLocalStorage("userId", "");
    const [username, setUsername] = useLocalStorage("username", "");
    const [token, setToken] = useLocalStorage("token", null);

    const initialState = {
        email: '',
        password: '',
        isSubmitting: false,
        errorMessage: null
    }
    const [loginData, setLoginData] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const password = useRef(null);

    async function doLogin(event){
        event.preventDefault();
        console.log('login: ', loginData);
        // loading
        setLoginData({
            ...loginData,
            isSubmitting: true,
            errorMessage: null
        })

        // make a request and dispatch
        try{
            const response = await axios.post("https://watch-wisp.herokuapp.com/login", loginData);
            console.log('login response: ', response);

            let userData = {
                name: response.data.user.name,
                id: response.data.user._id,
            }

            authDispatch({
                type: 'LOGIN',
                payload: userData
            })

            // store in local
            setUserId(userData.id);
            setUsername(userData.name);
            setToken(userData.id);

            // finish loading
            setLoginData({
                ...loginData,
                isSubmitting: false,
                errorMessage: null
            })

        }
        catch(error){
            console.log('Error signup: ', error);

            // finish loading
            setSignupData({
                ...signupData,
                isSubmitting: false,
                errorMessage: error
            })
        }

    }

    function handleInputChange(event){
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

    // function togglePasswordVisibility(){
    //     setShowPassword(showPassword => !showPassword);
        
    //     if(showPassword){
    //         password.current.type = 'text';
    //     }else{
    //         password.current.type = 'password';
    //     }
    // }

    return (
        <div className={styles.login_form + " border borderGray2"}>
            <h3 className={styles.login_heading}>Login</h3>
            <small className="pl4 pr4 mb12 displayBlock textGray4">Sign-in with your account to use all features</small>
            
            <form onSubmit={doLogin}>
                <div className={"displayFlex flexCol pl4 pr4 mb4"}>
                    <label htmlFor="user_email" className="textSm textGray4 mb1">Email</label>
                    <input type="email" id="user_email" name="email" value={loginData.email} onChange={handleInputChange}
                        autoComplete="true" placeholder="abc@example.com" className={styles.form_input}/>
                </div>

                <div className={"displayFlex flexCol pl4 pr4 mb4"}>
                    <label htmlFor="user_password" className="textSm textGray4 mb1">Password</label>
                    <div className="" style={{position: 'relative'}}>
                        <input type={showPassword ? "text":"password"} id="user_password" name='password' ref={password}  onChange={handleInputChange}
                                placeholder="Enter Password" className={styles.form_input + " wFull"}/>

                        <span onClick={() => setShowPassword(!showPassword)} className={styles.password_visibility_toggler + " cursorPointer displayBlock textGray4"}>
                            {
                                showPassword ? <MdVisibility /> : <MdVisibilityOff /> 
                            }
                        </span>
                    </div>
                </div>

                <div className="p4 mt8">
                    <button className="displayBlock wFull p3 textRg bgBlue4 textWhite borderNone rounded">
                        { loginData.isSubmitting? 'loading..':'Login'}
                    </button>

                    <p className="mt8 textCenter textGray4">
                        Not a member? 
                        <Link to="/signup" className="ml1 textBlue4">
                            Signup
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
