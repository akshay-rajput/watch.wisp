import React, {useState, useEffect} from 'react';
import styles from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {MdExpandMore, MdExpandLess, MdSearch} from 'react-icons/md'
import NavUserOptions from './NavUserOptions';

import {useAuth} from '../../Store/AuthContext';

import wisplogo from '../../../wisp.png';

export default function Navbar({isUserLoggedIn, username}) {
    const [showOptions, setShowOptions] = useState(false);

    function toggleUserOptions(){
        console.log('setting..', showOptions);
        setShowOptions(!showOptions);
    }


    return (
        <nav className={`${styles.navbar}`}>
            <div className={`${styles.nav_container} displayFlex justifyBetween itemsCenter p3 md:pl4 md:pr4 `}>
                {/* <a href="#" className={`${styles.nav_brand} logofont displayFlex itemsCenter`}>
                    <img src={wisplogo} alt="Wisp" className="h8 mr2"/>
                    Wisp
                </a> */}
                <NavLink to="/" className={`${styles.nav_brand} logofont displayFlex itemsCenter`}>
                    <img src={wisplogo} alt="Wisp" className="h8 mr2"/>
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
                            <div className="avatar-wrapper displayFlex itemsCenter bgGray6 w10 h10 roundedFull p1">
                                <img src="https://avatars.dicebear.com/api/bottts/124562.svg" className="roundedFull wFull" />
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
