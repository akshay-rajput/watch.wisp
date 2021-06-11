import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../Store/AuthContext';
import {Link} from "react-router-dom";
import styles from './Profile.module.css';
import {MdEdit, MdSave} from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Profile() {

    const {authState, authDispatch} = useAuth();

    const [userData, setUserData] = useState({});
    
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        console.log("user ", authState.userId);
        if(authState.token){
            getUserData();
        }

        return () => {
            setUserData({});
            setIsEditingUsername(false);
            setUserName("");
        }
    }, [authState.token]);

    async function getUserData(){
        try{
            const {data} = await axios.get('https://watch-wisp.herokuapp.com/users/'+authState.userId);
            console.log("response of user: ", data.user);

            setUserName(data.user.name);

            setUserData(prevData => (
                {...prevData},
                data.user
            ));

            if(data.user.name !== authState.username){
                authDispatch({
                    type: 'UPDATE_USERNAME',
                    payload:{
                        name: data.user.name
                    }
                })
            }
        }
        catch(error){
            console.log("error getting user: ", error);
        }
    }

    async function updateUsername(){
        try{
            let updatedUserData = {...userData}

            updatedUserData.name = userName

            const response = await axios.post('https://watch-wisp.herokuapp.com/users/'+authState.userId, updatedUserData);
            // const response = await axios.post('http://localhost:4000/users/'+authState.userId, updatedUserData)
            console.log("response of user update: ", response);

            if(response.data.success){
                setUserData(prevData => (
                    {
                        ...prevData,
                        name: response.data.user.name
                    }
                ));

                setIsEditingUsername(false);

                authDispatch({
                    type: 'UPDATE_USERNAME',
                    payload:{
                        name: response.data.user.name
                    }
                })

                toast.success(`User profile updated successfully.`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
            else{
                console.log("unsuccessul while saving user.. ", response.data.message);
                toast.error(`Error while updating user profile.`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                setIsEditingUsername(false);
                setUserName(userData.name);
            }

        }
        catch(error){
            console.log("error saving username", error);
            toast.error(`There was a problem while updating user profile.`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsEditingUsername(false);
            setUserName(userData.name);
        }
    }

    function handleUsernameChange(event){
        setUserName(event.target.value);
    }

    return (
        <div>
            {
                authState.token ?
                <div>
                    <h2 className="textMd textGray4 fontSemiBold pl2">Account details</h2>
                    <div className="mt4 displayGrid gridCols2 mb24">
                        <div className="gridColSpan2 md:gridColSpan1">
                            <div className={`${styles.form_grid} p2`}>
                                <div className={`${styles.form_label}`}>
                                    <label className={`textGray4 textRg displayBlock mb1`}>Avatar</label>
                                    <p className="textGray4 lineHeightSm textXs">Option to change avatar will be added in future updates.</p>
                                </div>
                                <div className={`${styles.form_input}`}>
                                    <img src={authState.userAvatar} alt="avatar" className={` roundedFull border p2 borderGray2 bgBlue1`} style={{width: "8rem"}} />
                                </div>
                            </div>

                            
                            <div className={`${styles.form_grid} p2 mt4 mb4`}>
                                <div className={`${styles.form_label} pt2`}>
                                    <label className={`textGray4 textRg displayBlock mb1`}>Email</label>
                                    <p className="textGray4 lineHeightSm textXs">Email once set cannot be changed.</p>
                                </div>
                                <div className={`${styles.form_input}`}>
                                    <p className="p2 bgRose1 textGray4 rounded">{userData.email}</p>
                                </div>
                            </div>

                            
                            <div className={`${styles.form_grid} p2`}>
                                <div className={`${styles.form_label} pt2`}>
                                    <label className={`textGray4 textRg displayBlock`}>Username</label>
                                </div>
                                <div className={`${styles.form_input} displayFlex itemsCenter`}>
                                    {
                                        isEditingUsername ? 
                                        <input type="text" onChange={handleUsernameChange} value={userName} className="p2 border borderGray2 textGray4 rounded flexGrow" />
                                        :
                                        <p className="p2 bgRose1 textGray4 rounded flexGrow">{userData.name}</p>
                                    }
                                    <div className="displayFlex ml4">
                                        {
                                            !isEditingUsername ? 
                                            <button className="bgTransparent borderNone hover:bgBlue2 p1 textGray4 hover:textBlue5 rounded">
                                                <MdEdit onClick={() => setIsEditingUsername(true)} className="textLg" />
                                            </button>
                                            :
                                            <button className="bgTransparent borderNone hover:bgBlue2 p1 textGray4 hover:textBlue5 rounded">
                                                <MdSave onClick={updateUsername} className="textLg"/>
                                            </button>
                                        }
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    </div>
                </div>
                :
                <div className="textCenter pt8 pb8">
                    <h3 className="textLg mb2">
                        Login required
                    </h3>
                    <p className="mb8 textSm textGray4">You need to be logged in to view this page.</p>
                    <Link to="/login" className="link-button pt2 pb2 pl4 pr4 hover:textBlue5 hover:bgBlue3 mr6 rounded bgBlue5 textWhite">Login</Link>
                    <Link to="/signup" className="link-button pt2 pb2 pl4 pr4 rounded bgBlue2 textBlue6">Signup</Link>
                </div>
            }
        </div>
    )
}
