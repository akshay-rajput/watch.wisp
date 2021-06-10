import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// import useWindowDimensions from "./Hooks/useWindowDimensions";
import {useAuth} from './Store/AuthContext';
import {usePlaylists} from './Store/PlaylistsContext';
import { useLocation } from "react-router-dom";
import AppNavbar from "./Components/common/Navbar";
import FeatureNavbar from './Components/common/FeatureNavbar';

import { ToastContainer, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// render routes
import ROUTES, {RenderRoutes} from './routes';

import "./App.css";

function App() {
    const { pathname } = useLocation();
    // scroll to top on load
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [pathname]);
    
    // authentication
    const {authState, authDispatch} = useAuth();
    const {playlistsState, playlistsDispatch} = usePlaylists();
    
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    // auth
    useEffect(() => {
        // console.log('app token: ', authState.token);

        if(authState.token){
            setIsUserLoggedIn(true);
        }else{
            setIsUserLoggedIn(false);
        }
        
    }, [authState.token])

    // user playlists
    useEffect(() => {    
        // console.log('===> authstate token Null: ', authState.token === null || authState.token === 'null');
        if(authState.token){
            // console.log('token available: ', authState.token.length);
            (async function getUserPlaylists(){
                try{
                    let response = await axios.get('https://watch-wisp.herokuapp.com/playlists', {
                    // let response = await axios.get('http://localhost:4000/playlists', {
                        headers: {
                            userId: authState.userId
                        }
                    })  
                    let userPlaylists = response.data.userPlaylists;
                    console.log('response of getUserPlaylist: ', userPlaylists)
                    
                    let savedVideos = {};
                    userPlaylists.map(playlist => {
                        if(playlist.name === "Saved Videos"){
                            savedVideos = {...playlist};
                        }
                    })

                    playlistsDispatch(
                        {
                            type: "GET_ALL_PLAYLISTS",
                            payload: {
                                userId: authState.userId,
                                playlists: userPlaylists,
                                savedVideos: savedVideos,
                            }
                        }
                    )
                }
                catch(error){
                    console.log('error gettingUserPlaylsit: ', error.message);
                }
            })()            
        }
        else{
            console.log('reset playlists..');
            playlistsDispatch({type: "RESET_PLAYLISTS"});
        }
            
    }, [authState.userId]);

    return (
        <div className="App textGray6">
            <AppNavbar isUserLoggedIn={isUserLoggedIn} username={authState.username}/>

            <div className="app-main">
				{/* sidebar or bottom nav */}
				<FeatureNavbar />

				{/* main content */}
				<div className="app-content pl3 pr3">
                    {/* route */}
                    <RenderRoutes routes={ROUTES}></RenderRoutes>
                </div>
			</div>

            <ToastContainer pauseOnHover={false} autoClose={3000} transition={Slide}/>
        </div>
    );
}

export default App;
