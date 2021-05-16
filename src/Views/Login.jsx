import React, {useState, useRef} from 'react'
import styles from './Login.module.css';
import {MdVisibility, MdVisibilityOff} from 'react-icons/md';
import {Link} from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const password = useRef(null);

    function doLogin(event){
        event.preventDefault();
    }

    function togglePasswordVisibility(){
        
        if(showPassword){
            password.current.type = 'text';
        }else{
            password.current.type = 'password';
        }

        setShowPassword(showPassword => !showPassword);
        
        
    }

    return (
        <div className={styles.login_form + " border borderGray2"}>
            <h3 className={styles.login_heading}>Login</h3>
            <small className="pl4 pr4 mb12 displayBlock textGray4">Sign-in with your account to use all features</small>
            
            <form onSubmit={doLogin}>
                <div className={"displayFlex flexCol pl4 pr4 mb4"}>
                    <label htmlFor="user_email" className="textSm textGray4 mb1">Email</label>
                    <input type="email" id="user_email" autoComplete="true" placeholder="abc@example.com" className={styles.form_input}/>
                </div>

                <div className={"displayFlex flexCol pl4 pr4 mb4"}>
                    <label htmlFor="user_password" className="textSm textGray4 mb1">Password</label>
                    <div className="" style={{position: 'relative'}}>
                        <input type="password" id="user_password" ref={password} placeholder="Enter Password" className={styles.form_input + " wFull"}/>
                        <span onClick={togglePasswordVisibility} className={styles.password_visibility_toggler + " cursorPointer displayBlock textGray4"}>
                            {
                                showPassword ? <MdVisibility /> : <MdVisibilityOff /> 
                            }
                        </span>
                    </div>
                </div>

                <div className="p4 mt8">
                    <button className="displayBlock wFull p3 textRg bgBlue4 textWhite borderNone rounded">
                        Login
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
