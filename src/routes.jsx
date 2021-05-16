import React from "react";
import Home from "./Views/Home";
import AddVideo from "./Views/AddVideo";
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
        exact: true,
        element: <Home />, 
    },
    {
        path: "/addvideo",
        key: "AddVideo",
        end: true,
        element: <AddVideo/>, 
    },
    {
        path: "/video/:videoId",
        key: "Video",
        end: true,
        element: <Video/>, 
    },
    
    // playlist routes - order matters
    {   path: '/playlists/likedVideos',
        key: "likedVideos",
        end: true,
        element: <LikedVideos />
    },
    {   path: '/playlists/savedVideos',
        key: "savedVideos",
        end: true,
        element: <SavedVideos />
    },
    {
        path: "/playlists",
        key: "Playlists",
        end: true,
        element: <Playlists/>,
    },

    {
        path: "/search",
        key: "Search",
        end: true,
        element: <Search/>, 
    },
    {
        path: "/login",
        key: "Login",
        end: true,
        element: <Login/>, 
    },
    {
        path: "/signup",
        key: "Signup",
        end: true,
        element: <Signup/>, 
    },
    {
        path: "/profile",
        key: "Profile",
        end: true,
        element: <Profile/>, 
    },
    {
        path: "*",
        key: "PageNotFound",
        end: true,
        element: <PageNotFound/>, 
    },  
];

export function RenderRoutes({ routes }) {
    // useRoutes to render routes object - alternative to Routes & Route of react-router-dom
    let selectedRoute = useRoutes(routes);
    console.log('select: ', selectedRoute);
    return selectedRoute;
}

export default ROUTES;

