import React, {useState, useEffect} from 'react'
import {usePlaylists} from '../../Store/PlaylistsContext';
import {useAuth} from '../../Store/AuthContext';
import PlaylistVideoCard from './PlaylistVideoCard';

export default function SavedVideos() {
    const {authState, authDispatch} = useAuth();
    // get all playlist names from context
    const {playlistsState, playlistsDispatch} = usePlaylists();
    
    const [savedVideoList, setSavedVideoList] = useState([])

    useEffect(() => {
        console.log('got saved videos..');
        
        if(playlistsState.savedVideos.videos){
            let videoList = [...playlistsState.savedVideos.videos];
        
            videoList.sort((a,b) => {
                return b.views - a.views
            })

            setSavedVideoList(videoList)
        }
        
        return () => {
            setSavedVideoList([])
        }
    }, [playlistsState.savedVideos])

    function sortPlaylist(event){
        let videoList = [...savedVideoList]

        console.log('videolist: ', videoList.length);

        if(event.target.value == 'views'){
            // sort by views
            videoList.sort((a,b) => {
                return b.views - a.views
            })
            setSavedVideoList(prevData => (
                [...prevData], videoList
            ))
        }else{
            // sort by likes
            videoList.sort((a,b) => {
                return b.likes - a.likes
            })
            
            setSavedVideoList(prevData => (
                [...prevData], videoList
            ))
        }
    }

    return (
        <div>
            {
                authState.token && savedVideoList ?
                <>
                    <div className="displayFlex justifyBetween itemsCenter mb6">
                        <h3 className="textLg fontSemiBold">Saved Videos <small className="textGray4">({savedVideoList.length})</small></h3>
                        <label className="textSm">
                            Sort by
                            <select name="sortby" id="sortby" onChange={sortPlaylist} className="p1 rounded ml2">
                                <option value="views">Views</option>
                                <option value="likes">Likes</option>
                            </select>
                        </label>
                    </div>
                    
                    <div className="displayGrid gridCols4 gridGap4 mb8">
                        {
                            savedVideoList.map(video => {
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
