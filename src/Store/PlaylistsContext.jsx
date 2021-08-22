import React,{ createContext, useContext, useReducer } from "react";
import PlaylistsReducer, {initialState} from './PlaylistsReducer';

const PlaylistsContext = createContext({});

export const usePlaylists = () => {
    return useContext(PlaylistsContext);
}

export function PlaylistsProvider({children}) {

    const [playlistsState, playlistsDispatch] = useReducer(PlaylistsReducer, initialState);
    // console.count('inside playlist context..')
    return <PlaylistsContext.Provider value = {{ playlistsState, playlistsDispatch }}>
        {children}
    </PlaylistsContext.Provider>
}