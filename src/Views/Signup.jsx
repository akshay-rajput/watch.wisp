import React, {useState, useContext, useRef} from 'react'
import styles from './Login.module.css';
import {MdVisibility, MdVisibilityOff} from 'react-icons/md';
import {Link, useNavigate} from 'react-router-dom';

import useLocalStorage from '../Hooks/useLocalStorage';
import {useAuth} from '../Store/AuthContext';
import axios from 'axios';

import { toast } from 'react-toastify';

export default function Signup() {
    const {authState, authDispatch} = useAuth();
    
    const [userId, setUserId] = useLocalStorage("userId", "");
    const [username, setUsername] = useLocalStorage("username", "");
    const [token, setToken] = useLocalStorage("token", null);

    let navigate = useNavigate();

    const initialState = {
        name: "",
        email: '',
        password: '',
        avatarUrl: '',
        isSubmitting: false,
        errorMessage: null
    }
    const [signupData, setSignupData] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const password = useRef(null);
    const confirm_password = useRef(null);

    async function doSignup(event){
        event.preventDefault();
        
        let avatarImage = `https://avatars.dicebear.com/api/bottts/${signupData.email}.svg`;
        
        // loading
        setSignupData({
            ...signupData,
            isSubmitting: true,
            errorMessage: null
        })

        let formData = {
            ...signupData,
            avatarUrl: avatarImage,
        }
        // console.log("formData: ", formData);
        // make a request and dispatch
        try{
            const response = await axios.post("https://watch-wisp.herokuapp.com/signup", formData);
            console.log('user response: ', response);

            if(response.data.success){
                let userData = {
                    name: response.data.user.name,
                    id: response.data.user._id,
                    avatarUrl: response.data.user.avatarUrl
                }
    
                // finish loading
                setSignupData({
                    ...signupData,
                    isSubmitting: false,
                    errorMessage: null
                })
    
                // show toast of successful signup and navigate
                console.log("signed up : ", userData);

                toast.success(`Signed up successfully`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

                navigate('/login');
            }
            else{
                console.log('response unsuccessful')
                // finish loading
                setSignupData({
                    ...signupData,
                    isSubmitting: false,
                    errorMessage: response.data.message
                })

                toast.error(`Error: ${response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
        catch(error){
            console.log('Error signup: ', error.response.data);

            // finish loading
            setSignupData({
                ...signupData,
                isSubmitting: false,
                errorMessage: error.response.data.message
            })

            toast.error(`Error: ${error.response.data.message}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

    }

    function handleInputChange(event){
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className={styles.login_form + " border borderGray2"}>
            <h3 className={styles.login_heading}>Sign up</h3>
            <small className="pl4 pr4 mb12 displayBlock textGray4">Sign-up to use all features</small>
            
            <form onSubmit={doSignup}>
                <div className={"displayFlex flexCol pl4 pr4 mb4"}>
                    <label htmlFor="user_email" className="textSm textGray4 mb1">Email</label>
                    <input type="email" id="user_email" name="email" value={signupData.email} onChange={handleInputChange}
                        placeholder="abc@example.com" className={styles.form_input} required/>
                </div>

                <div className={"displayFlex flexCol pl4 pr4 mb4"}>
                    <label htmlFor="user_email" className="textSm textGray4 mb1">Username</label>
                    <input type="text" id="user_name" name="name" value={signupData.name} onChange={handleInputChange}
                        placeholder="What should we call you?" className={styles.form_input} minLength='2' required/>
                </div>

                <div className={"displayFlex flexCol pl4 pr4 mb4"}>
                    <label htmlFor="user_password" className="textSm textGray4 mb1">Password</label>
                    <div className="" style={{position: 'relative'}}>
                        <input type={showPassword ? "text" : "password"} id="user_password" name='password' ref={password}  onChange={handleInputChange}
                                placeholder="Enter Password" className={styles.form_input + " wFull"} minLength='6' required/>

                        <span onClick={() => setShowPassword(!showPassword)} className={styles.password_visibility_toggler + " cursorPointer displayBlock textGray4"}>
                            {
                                showPassword ? <MdVisibility /> : <MdVisibilityOff /> 
                            }
                        </span>
                    </div>
                </div>

                <div className="p4 mt8">
                    <button className="displayBlock wFull p3 textRg bgBlue4 textWhite borderNone rounded" disabled={signupData.isSubmitting}>
                        { signupData.isSubmitting? 'Please wait..':'Sign up'}
                    </button>

                    <p className="mt8 textCenter textGray4">
                        Already a member? 
                        <Link to="/login" className="ml1 textBlue4">
                            Login
                        </Link>
                    </p>
                </div>

            </form>

        </div>
    )
}
