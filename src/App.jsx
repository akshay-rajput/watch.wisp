import React, { useState, useContext, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import axios from "axios";
import useWindowDimensions from "./Hooks/useWindowDimensions";
import {useAuth} from './Store/AuthContext';
import {usePlaylists} from './Store/PlaylistsContext';
import AppNavbar from "./Components/common/Navbar";
import FeatureNavbar from './Components/common/FeatureNavbar';

// render routes
import ROUTES, {RenderRoutes} from './routes';

import "./App.css";

function App() {

    // const [videosJson, setvideosJson] = useState([]);
    const { height, width } = useWindowDimensions();

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

        if(authState.userId){
            (async function getUserPlaylists(){
                try{
                    let response = await axios.get('https://watch-wisp.herokuapp.com/playlists', {
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
                    console.log('error gettingUserPlaylsit: ', error);
                }
            })()            
        }
        else{
            playlistsDispatch({type: "RESET_PLAYLISTS"});

            // console.log('user login required to fetch playlists...');
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

            {/* other test code */}
            <div className="mt7">
                {/* <span></span> */}

                {/* <div className="">
						<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' controls={true} width={width-32} height={width * 0.5625} style={{margin:'auto'}}/>
					</div> */}

                {/* <span></span> */}
            </div>
        </div>
    );
}

export default App;
