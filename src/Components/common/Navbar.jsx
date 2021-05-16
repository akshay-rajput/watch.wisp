import React, {useState} from 'react'
import styles from './Navbar.module.css'
import {MdExpandMore, MdExpandLess} from 'react-icons/md'
import NavUserOptions from './NavUserOptions'
import wisplogo from '../../../wisp.png'

export default function Navbar() {
    const [showOptions, setShowOptions] = useState(false);

    function toggleUserOptions(){
        console.log('setting..', showOptions);
        setShowOptions(!showOptions);
    }

    return (
        <nav className={`${styles.navbar}`}>
            <div className={`${styles.nav_container} displayFlex justifyBetween itemsCenter p3 md:pl4 md:pr4 `}>
                <a href="#" className={`${styles.nav_brand} logofont displayFlex itemsCenter`}>
                    <img src={wisplogo} alt="Wisp" className="h8 mr2"/>
                    Wisp
                </a>

                <div className="displayFlex itemsCenter listNoStyle flexWrap">
                    
                    <input type="search" autoComplete='text' placeholder="Search..." className="textWhite p2 mr6 md:mr10 textRg rounded bgTransparent border borderGray4" required/>
                        
                    <a href="" className="mr4 ">Login</a>
                    <a href="" className=" ">Signup</a>
                    
                    <div className={`${styles.user_info} displayFlex itemsCenter textGray2`}>
                        <div className="avatar-wrapper displayFlex itemsCenter mr2 bgGray6 w10 h10 roundedFull p1">
                            <img src="https://avatars.dicebear.com/api/avataaars/124562.svg" className="roundedFull wFull" />
                        </div>
                        
                        <button onClick={toggleUserOptions} className="cursorPointer bgTransparent textRg textGray2 borderNone displayFlex itemsCenter">
                            {"Akshay Rajput"}
                            {!showOptions && <MdExpandMore className="textLg" />}
                            {showOptions && <MdExpandLess className="textLg" />}
                        </button>
                        
                    </div>
                    
                </div> 

                {  /* show dropdown of user options */
                    showOptions && <NavUserOptions />
                }   
            </div>
        </nav>
    )
}
