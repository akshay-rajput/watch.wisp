import React, {useState, useEffect} from 'react'
import {usePlaylists} from '../../Store/PlaylistsContext';
import {useAuth} from '../../Store/AuthContext';
import {Link} from 'react-router-dom';
import nodataImage from '../../../public/nodata.svg';
import styles from '../../Views/Search.module.css';
import PlaylistVideoCard from './PlaylistVideoCard';

export default function SavedVideos() {
    const {authState, authDispatch} = useAuth();
    // get all playlist names from context
    const {playlistsState, playlistsDispatch} = usePlaylists();
    
    const [savedVideoList, setSavedVideoList] = useState([])

    useEffect(() => {
        console.log('got saved videos..',playlistsState.savedVideos);
        
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
        <div className="mb24">
            {
                authState.token && savedVideoList ?
                <>
                    <div className="displayFlex justifyBetween itemsCenter mb6">
                        <h3 className="textLg fontSemiBold">Saved Videos <small className="textGray4">({savedVideoList.length})</small></h3>
                        {   
                            savedVideoList.length > 0 &&
                            <label className="textSm">
                                Sort by
                                <select name="sortby" id="sortby" onChange={sortPlaylist} className="p1 rounded ml2">
                                    <option value="views">Views</option>
                                    <option value="likes">Likes</option>
                                </select>
                            </label>}
                    </div>
                    
                    {
                        savedVideoList.length > 0 ?
                        <div className="displayGrid gridCols4 gridGap4 mb8">
                            {
                                savedVideoList.map(video => {
                                    return(
                                        <PlaylistVideoCard video={video} key={video._id}/>
                                    )
                                })
                            }
                        </div>
                        :
                        <div className="displayFlex flexCol justifyCenter itemsCenter p8">
                            <img src={nodataImage} alt="No data" className={`${styles.nodata} mt4`} />

                            <div className="mt6 textCenter">
                                <h4 className="textGray4 textMd mb2">Playlist is empty</h4>
                                <span className="textGray4">You have not saved any videos yet.</span>
                            </div>
                        </div>
                    }
                </>
                :
                <div className="textCenter pt8 pb8">
                    <h3 className="textLg mb2">
                        Login required
                    </h3>
                    <p className="mb8 textSm textGray4">You need to be logged in to view saved videos.</p>
                    <Link to="/login" className="link-button pt2 pb2 pl4 pr4 hover:textBlue5 hover:bgBlue3 mr6 rounded bgBlue5 textWhite">Login</Link>
                    <Link to="/signup" className="link-button pt2 pb2 pl4 pr4 rounded bgBlue2 textBlue6">Signup</Link>
                </div>
            }
        </div>
    )
}
