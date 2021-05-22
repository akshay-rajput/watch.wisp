import React from "react";
import Home from "./Views/Home";
import Video from "./Views/Video";

import Playlists from "./Views/Playlists";
import SavedVideos from "./Components/Playlists/SavedVideos";
import LikedVideos from "./Components/Playlists/LikedVideos";

import Search from "./Views/Search";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import Profile from "./Views/Profile";
import PageNotFound from './Views/PageNotFound';

import {useRoutes} from 'react-router-dom';

const ROUTES = [
    {
        path: "/",
        key: "Home",
        end: true,
        exact: true,
        element: <Home />, 
    },
    {
        path: "/video/:videoId",
        key: "Video",
        element: <Video/>, 
    },
    
    // playlist routes - order matters
    {   path: '/playlists/likedVideos',
        key: "likedVideos",
        end: true,
        exact: true,
        element: <LikedVideos />
    },
    {   path: '/playlists/savedVideos',
        key: "savedVideos",
        end: true,
        exact: true,
        element: <SavedVideos />
    },
    {
        path: "/playlists",
        key: "Playlists",
        end: true,
        exact: true,
        element: <Playlists/>,
    },

    {
        path: "/search",
        key: "Search",
        element: <Search/>, 
    },
    {
        path: "/login",
        key: "Login",
        end: true,
        exact: true,
        element: <Login/>, 
    },
    {
        path: "/signup",
        key: "Signup",
        end: true,
        exact: true,
        element: <Signup/>, 
    },
    {
        path: "/profile",
        key: "Profile",
        element: <Profile/>, 
    },
    {
        path: "*",
        key: "PageNotFound",
        element: <PageNotFound/>, 
    },  
];

export function RenderRoutes({ routes }) {
    // useRoutes to render routes object - alternative to Routes & Route of react-router-dom
    let selectedRoute = useRoutes(routes);
    // console.log('select: ', selectedRoute);
    return selectedRoute;
}

export default ROUTES;

