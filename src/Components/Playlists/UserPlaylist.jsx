import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../../Store/AuthContext';
import PlaylistVideoCard from './PlaylistVideoCard';
import {usePlaylists} from '../../Store/PlaylistsContext';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

export default function UserPlaylist() {
    let {playlistId} = useParams();
    const {playlistsState, playlistsDispatch} = usePlaylists();

    const [playlistData, setPlaylistData] = useState({})
    const {authState, authDispatch} = useAuth();

    useEffect(() => {
        getPlaylistData();

        return () => {
            setPlaylistData({});
        }
    }, [playlistId, playlistsState.playlists])

    async function getPlaylistData(){
        try{
            const response = await axios.get('https://watch-wisp.herokuapp.com/playlists', {
                headers: {
                    playlistid: playlistId
                }
            })

            console.log('fetched playlist: ', response);

            if(response.data.playlist.videos.length > 0){
                response.data.playlist.videos.sort((a,b) => {
                    return b.views - a.views
                })
            }   

            setPlaylistData(prevData => {
                return (
                    {...prevData},
                    response.data.playlist
                )
            })
        }
        catch(error){
            console.log('error getting playlist data: ', error)
        }
    }
    
    function sortPlaylist(event){
        let videoList = [...playlistData.videos]
        console.log('videolist: ', videoList.length);

        if(event.target.value == 'views'){
            // sort by views
            videoList.sort((a,b) => {
                return b.views - a.views
            })
            setPlaylistData(prevData => (
                {
                    ...prevData,
                    videos: videoList
                }
            ))
        }else{
            // sort by likes
            videoList.sort((a,b) => {
                return b.likes - a.likes
            })
            
            setPlaylistData(prevData => (
                {
                    ...prevData,
                    videos: videoList
                }
            ))
        }
    }

    return (
        <div>
        {   
            !authState.token ?
            <>
                <div className="">
                    <h3 className="textLg fontSemiBold">{playlistData.name}</h3>
                    <div className="displayFlex flexCol itemsCenter justifyCenter pt12 md:pt24">
                        <h4 className="textLg fontSemiBold">This playlist is private!</h4>
                        <p className="textGray4 textCenter textSm mt2">
                            You do not have permission to view this playlist. <br /> If you've created this playlist login, to view it.
                        </p>
                        <div className="displayFlex mt8 mb2">
                            <Link to={'/login'}>Login</Link>
                            <Link to={'/signup'} className="ml8">Signup</Link>
                        </div>
                    </div>
                </div>
            </>
            :
            authState.token && playlistData.videos?.length > 0 ?
            <>
                <div className="displayFlex justifyBetween itemsCenter mb6">
                    <h3 className="textLg fontSemiBold">{playlistData.name} <small className="textGray4">({playlistData.videos.length})</small></h3>
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
                        playlistData.videos.map(video => {
                            return(
                                <PlaylistVideoCard video={video} key={video._id}/>
                            )
                        })
                    }
                </div>
            </>
            :
            authState.token && playlistData.videos?.length < 1 ?
            <>
                <div className="">
                    <h3 className="textLg fontSemiBold">{playlistData.name} <small className="textGray4">({playlistData.videos.length})</small></h3>
                    <div className="displayFlex flexCol itemsCenter justifyCenter pt12 md:pt24">
                        <h4 className="textLg fontSemiBold">Playlist is empty!</h4>
                        <p className="textGray4 textCenter textSm mt2">
                            When you add videos to your playlist they appear here. <br /> You can add videos to this playlist from "Home" page or a particular video page.
                        </p>
                        <br />
                        <Link to={'/'}>View Videos</Link>
                    </div>
                </div>
            </>
            :
            <div className="displayGrid gridCols4 gridGap4 mb8">
                <h3 className="gridColSpan4 textLg fontSemiBold">
                    <Skeleton style={{ width: '100%' }}/>
                </h3>
                {
                    [...Array(4)].map((child, index) => {
                        return(
                            <div className="gridColSpan4 md:gridColSpan1" key={index}>
                            <Skeleton style={{ width: '100%', height: "200px", }}/>
                            </div>
                        )
                    })
                }
            </div>
            
        }
        </div>
    )
}
