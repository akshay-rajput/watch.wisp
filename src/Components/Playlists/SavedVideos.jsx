import React from 'react'
import {usePlaylists} from '../../Store/PlaylistsContext';
import {useAuth} from '../../Store/AuthContext';
import PlaylistVideoCard from './PlaylistVideoCard';

export default function SavedVideos() {
    const {authState, authDispatch} = useAuth();
    // get all playlist names from context
    const {playlistsState, playlistsDispatch} = usePlaylists();

    return (
        <div>
            {
                authState.token && playlistsState.savedVideos.videos ?
                <>
                    <div className="displayFlex justifyBetween itemsCenter mb6">
                        <h3 className="textLg fontSemiBold">Saved Videos <small className="textGray4">({playlistsState.savedVideos.videos.length})</small></h3>
                        <label className="textSm">
                            Sort by
                            <select name="sortby" id="sortby" className="p1 rounded ml2">
                                <option value="views">Views</option>
                                <option value="likes">Likes</option>
                            </select>
                        </label>
                    </div>
                    
                    <div className="displayGrid gridCols4 gridGap4 mb8">
                        {
                            playlistsState.savedVideos.videos.map(video => {
                                return(
                                    <PlaylistVideoCard video={video} key={video._id}/>
                                )
                            })
                        }
                    </div>
                </>
                :
                <>
                    <p className="">Login to view this playlist</p>
                </>
            }
        </div>
    )
}
