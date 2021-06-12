import React, {useState, useEffect, useContext, useRef} from 'react'
import styles from './Login.module.css';
import {MdVisibility, MdVisibilityOff} from 'react-icons/md';
import {ImSpinner8} from 'react-icons/im';
import {Link, useNavigate} from 'react-router-dom';

import axios from 'axios';
import useLocalStorage from '../Hooks/useLocalStorage';
import {useAuth} from '../Store/AuthContext';

import { toast } from 'react-toastify';

export default function Login() {
    const {authState, authDispatch} = useAuth();
    
    const [userId, setUserId] = useLocalStorage("userId", "");
    const [username, setUsername] = useLocalStorage("username", "");
    const [token, setToken] = useLocalStorage("token", null);
    const [userAvatar, setUserAvatar] = useLocalStorage("userAvatar", "");

    const initialState = {
        email: '',
        password: '',
        isSubmitting: false,
        errorMessage: null
    }
    const [loginData, setLoginData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const [processingLoginAsGuest, setProcessingLoginAsGuest] = useState(false);

    const password = useRef(null);

    let navigate = useNavigate();

    // if already logged in, navigate away
    useEffect(() => {
        if(authState.token){
            console.log("already logged in..");
            navigate('/');
        }
    }, [authState.token]);

    // usual login
    function loginUser(event){
        event.preventDefault();

        // loading
        setLoginData({
            ...loginData,
            isSubmitting: true,
            errorMessage: null
        }) 

        let loginAsGuest = false;
        doLogin(loginAsGuest);
    }

    // login as guest
    function loginGuestUser(){
        // loading
        let loginGuestData = {
            email:"test@test.com",
            password:"tester3",
            isSubmitting: true,
            errorMessage: null
        }

        setProcessingLoginAsGuest(true);

        let loginAsGuest = true;
        doLogin(loginAsGuest, loginGuestData);
    }

    // common function for login
    async function doLogin(loginAsGuest, loginGuestData){

        // make a request and dispatch
        try{
            let loginFormData = {}
            if(loginAsGuest){
                loginFormData = loginGuestData
            }
            else{
                loginFormData = {...loginData}
            }

            // console.log('loginFormData: ', loginFormData);

            const response = await axios.post("https://watch-wisp.herokuapp.com/login", loginFormData);
            // const response = await axios.post("http://localhost:4000/login", loginData);

            console.log('login response: ', response);

            if(response.data.success){
                let userData = {
                    name: response.data.user.name,
                    id: response.data.user._id,
                    token: response.data.token,
                    avatarUrl: response.data.user.avatarUrl
                }
    
                authDispatch({
                    type: 'LOGIN',
                    payload: userData
                })
    
                // store in local
                setUserId(userData.id);
                setUsername(userData.name);
                setToken(userData.token);
                setUserAvatar(userData.avatarUrl);

                // reset form
                resetFormState(loginAsGuest);

                toast.info(`Welcome back, ${response.data.user.name}!`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

                navigate('/');
            }
            else{
                console.log('response unsuccessful: ', response.message);
                
                // reset form
                resetFormState(loginAsGuest);
                
                toast.error(`Error: ${response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }

        }
        catch(error){
            console.log('Error login: ', error.response.data.message);

            // finish loading
            resetFormState(loginAsGuest);

            toast.error(`Error: ${error.response.data.message}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    function resetFormState(loginAsGuest){
        // console.log('while reset: ', loginAsGuest);
        if(loginAsGuest){
            setProcessingLoginAsGuest(false);
        }
        else{
            // finish loading
            setLoginData({
                ...loginData,
                isSubmitting: false,
            })
        }
    }

    function handleInputChange(event){
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className={styles.login_form + " border borderGray2 mb12"}>
            <h3 className={styles.login_heading}>Login</h3>
            <small className="pl4 pr4 mb12 displayBlock textGray4">Sign-in with your account to use all features</small>
            
            <form onSubmit={loginUser}>
                <div className={"displayFlex flexCol pl4 pr4 mb4"}>
                    <label htmlFor="user_email" className="textSm textGray4 mb1">Email</label>
                    <input type="email" id="user_email" name="email" value={loginData.email} onChange={handleInputChange}
                        autoComplete="true" placeholder="abc@example.com" className={styles.form_input} required/>
                </div>

                <div className={"displayFlex flexCol pl4 pr4 mb4"}>
                    <label htmlFor="user_password" className="textSm textGray4 mb1">Password</label>
                    <div className="" style={{position: 'relative'}}>
                        <input type={showPassword ? "text":"password"} id="user_password" name='password' ref={password}  onChange={handleInputChange}
                                placeholder="Enter Password" className={styles.form_input + " wFull"} required/>

                        <span onClick={() => setShowPassword(!showPassword)} className={styles.password_visibility_toggler + " cursorPointer displayBlock textGray4"}>
                            {
                                showPassword ? <MdVisibility /> : <MdVisibilityOff /> 
                            }
                        </span>
                    </div>
                </div>

                <div className="p4 mt8">
                    <button type="submit" className="displayBlock wFull p3 textRg bgBlue4 hover:bgBlue5 textWhite border borderBlue4 rounded" disabled={loginData.isSubmitting}>
                        { 
                            loginData.isSubmitting ? 
                            <span>
                                <ImSpinner8 className="loadingIcon mr1"/> Please wait
                            </span>
                            :
                            'Login'
                        }
                    </button>
                    
                    <span className="displayBlock mt4 mb4 textCenter textGray4 fontBold">OR</span>

                    <button type="button" onClick={loginGuestUser} className="displayBlock wFull p3 textRg bgBlue1 border borderBlue5 textBlue5 hover:bgBlue6 hover:textWhite rounded" disabled={processingLoginAsGuest}>
                        { 
                            processingLoginAsGuest ? 
                            <span>
                                <ImSpinner8 className="loadingIcon mr1"/> Please wait
                            </span>
                            :
                            'Login as Guest'}
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
