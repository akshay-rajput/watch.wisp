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
                <div className="displayGrid gridCols1 md:gridCols4 gridGap4">
                    <div className="md:gridColSpan4 mb4">
                        <h2 className="displayFlex itemsCenter">
                            Playlists <small className="ml1 textRg textGray4">({playlistsState.playlists.length})</small>
                        </h2>
                        {
                            playlistsState.playlists.length > 1 && 
                            <p className="mt2 textSm textGray4">
                                You can edit your playlists here. Default Playlists cannot be edited. 
                            </p>
                        }
                    </div>
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
