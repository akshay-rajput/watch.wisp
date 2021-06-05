import React, {useEffect} from 'react'
import styles from './NavUserOptions.module.css';
import {MdExitToApp, MdSettings} from 'react-icons/md';
import {useAuth} from '../../Store/AuthContext';
import useLocalStorage from '../../Hooks/useLocalStorage';
import {Link} from 'react-router-dom';

export default function NavUserOptions({setShowOptions}) {
    const {authState, authDispatch} = useAuth();
    

    function logOutUser(){
        setShowOptions(false);
        authDispatch({ type: 'LOGOUT'});
    }

    return (
        <div className={`${styles.user_options_bottom_drawer} displayFlex flexCol`}>
            <Link to="/profile" onClick={() => setShowOptions(false)} className={`${styles.user_options} displayFlex itemsCenter p2 `}>
                <MdSettings className="mr1 " />
                Account
            </Link>
            <button onClick={logOutUser} className={`${styles.user_options} displayFlex itemsCenter p2`}>
                <MdExitToApp className="mr1" />
                Logout
            </button>
        </div>
    )
}
