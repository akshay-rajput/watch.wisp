import React, { useState, useContext, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import axios from "axios";
import useWindowDimensions from "./Hooks/useWindowDimensions";
import {useAuth} from './Store/AuthContext';

import AppNavbar from "./Components/common/Navbar";
import FeatureNavbar from './Components/common/FeatureNavbar';

// render routes
import ROUTES, {RenderRoutes} from './routes';

import "./App.css";

function App() {

    // const [videosJson, setvideosJson] = useState([]);
    const { height, width } = useWindowDimensions();

    function resetVideos() {
        setvideos([]);
    }

    // authentication
    const {authState, authDispatch} = useAuth();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        console.log('init navbar: ', authState.token);

        if(authState.token){
            setIsUserLoggedIn(true);
        }else{
            setIsUserLoggedIn(false);
        }
        
    }, [authState.token])

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
