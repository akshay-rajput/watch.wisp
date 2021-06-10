import React, {useEffect} from 'react'
import styles from './NavUserOptions.module.css';
import {MdExitToApp, MdPerson, MdInfoOutline} from 'react-icons/md';
import {useAuth} from '../../Store/AuthContext';
import {Link, useNavigate} from 'react-router-dom';

export default function NavUserOptions({setShowOptions}) {
    const {authState, authDispatch} = useAuth();
    const navigate = useNavigate();

    function logOutUser(){
        setShowOptions(false);
        authDispatch({ type: 'LOGOUT'});

        navigate('/login');
    }

    return (
        <div className={`${styles.user_options_bottom_drawer} displayFlex flexCol`}>
            <Link to="/profile" onClick={() => setShowOptions(false)} className={`${styles.user_options} displayFlex itemsCenter p2 `}>
                <MdPerson className="mr1 " />
                Profile
            </Link>
            <Link to="/about" onClick={() => setShowOptions(false)} className={`${styles.user_options} displayFlex itemsCenter p2 `}>
                <MdInfoOutline className="mr1 " />
                About
            </Link>
            <hr className=" borderGray4 mt1 mb1"/>
            <button onClick={logOutUser} className={`${styles.user_options} displayFlex itemsCenter p2`}>
                <MdExitToApp className="mr1" />
                Logout
            </button>
        </div>
    )
}
