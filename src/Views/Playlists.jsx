import React from 'react'
import {usePlaylists} from '../Store/PlaylistsContext';
import {useAuth} from '../Store/AuthContext';
import PlaylistCard from '../Components/Playlists/PlaylistCard'

export default function Playlists() {
    const {authState, authDispatch} = useAuth();
    // get all playlist names from context
    const {playlistsState, playlistsDispatch} = usePlaylists();

    return (
        <div>
            {
                authState.token && playlistsState.playlists ? 
                <div className="displayGrid md:gridCols4 gridGap4">
                    {   playlistsState.playlists.map(playlist => {
                            return(
                                <PlaylistCard playlistData = {playlist} key={playlist._id} />
                            )
                        })
                    }
                </div>
                :
                <div className="">
                    you need to be logged in to view playlists.
                </div>
            }
        </div>
    )
}
