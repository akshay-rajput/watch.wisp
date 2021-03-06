import React, {useState, useEffect} from 'react';
import styles from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {MdExpandMore, MdExpandLess} from 'react-icons/md';
import {GiMoebiusStar} from 'react-icons/gi';

import NavUserOptions from './NavUserOptions';

import {useAuth} from '../../Store/AuthContext';

export default function Navbar({isUserLoggedIn, username}) {
    const [showOptions, setShowOptions] = useState(false);
    const {authState, authDispatch} = useAuth();

    function toggleUserOptions(){
        console.log('setting..', showOptions);
        setShowOptions(!showOptions);
    }
    return (
        <nav className={`${styles.navbar}`}>
            <div className={`${styles.nav_container} displayFlex justifyBetween itemsCenter p3 md:pl4 md:pr4 `}>
                
                <NavLink to="/" className={`${styles.nav_brand} logofont displayFlex itemsCenter`}>
                    <GiMoebiusStar />
                    Wisp
                </NavLink>

                <div className="displayFlex itemsCenter listNoStyle">
                    {   !isUserLoggedIn &&
                        <div className="">
                            <NavLink to="/login">
                                Login
                            </NavLink>
                            <NavLink to="/signup" className="ml3">
                                Signup
                            </NavLink>
                        </div>
                    }
                    
                    {
                        isUserLoggedIn && 
                        <div onClick={toggleUserOptions} className={`${styles.user_info} cursorPointer displayFlex itemsCenter textGray2`}>
                            <div className="avatar-wrapper displayFlex itemsCenter justifyCenter bgGray6 w10 h10 roundedFull p1">
                                {
                                    authState.userAvatar ?
                                    <img src={authState.userAvatar} alt="user" className="roundedFull wFull" />
                                    :
                                    <h4>{authState.username.substring(0,1)}</h4> 
                                }
                            </div>
                            
                            <button className="cursorPointer bgTransparent textRg textGray2 borderNone displayFlex itemsCenter">
                                <span className={`${styles.nav_username} ml2 mr1`}>{username}</span>
                                {!showOptions && <MdExpandMore className="textLg" />}
                                {showOptions && <MdExpandLess className="textLg" />}
                            </button>
                            
                        </div>
                    }
                    
                </div> 

                {  /* show dropdown of user options */
                    showOptions && <NavUserOptions setShowOptions={setShowOptions}/>
                }   
            </div>
        </nav>
    )
}
