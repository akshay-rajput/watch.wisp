import React, {useState} from 'react'
import { MdBookmark, MdBookmarkBorder} from 'react-icons/md';
import {checkExistanceInArray} from '../../utils';
import styles from '../HomeVideoCard.module.css';

import axios from 'axios';
import {usePlaylists} from '../../Store/PlaylistsContext';
import {useAuth} from '../../Store/AuthContext';
import {ImSpinner8} from 'react-icons/im';

import { toast } from 'react-toastify';

export default function SaveVideoButton({video, extendedButton}) {
    const {authState, authDispatch} = useAuth();
    // get all playlist names from context
    const {playlistsState, playlistsDispatch} = usePlaylists();

    const [updatingPlaylist, setUpdatingPlaylist] = useState(false);

    // add to saved videos or remove
    async function toggleSaveVideo(playlistName){
        console.log('toggle playlist: ',playlistName)
        
        setUpdatingPlaylist(true);

        if(authState.userId){
            
            let playlistToUpdate = {...playlistsState.savedVideos};
            
            console.log("saved video playlist: ", playlistToUpdate);

            // playlist doesn't exist, create
            if(!playlistToUpdate._id){
                // create new playlist
                try{
                    let playlistData = {
                        name: playlistName,
                        userId: authState.userId,
                        videos: [video]
                    }
                    console.log("pdata: ", playlistData);
                    // dispatch action to create playlist and add video to it
                    const response = await axios.post("https://watch-wisp.herokuapp.com/playlists", playlistData);
                    // const response = await axios.post("http://localhost:4000/playlists", playlistData);
                    console.log('resp of create playlist: ', response)

                    playlistsDispatch({
                        type: 'CREATE_PLAYLIST',
                        payload: {
                            playlist: response.data.playlist,
                            createSavedVideoPlaylist: true
                        }
                    })

                    toast.success(`Created Saved Videos playlist`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    setUpdatingPlaylist(false);
                }
                catch(error){
                    console.log('Error creating playlist: ', error);
                    toast.error(`There was a problem when trying to save this video.`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    setUpdatingPlaylist(false);
                }
            }
            else{
                let isVideoBookmarked = checkExistanceInArray(playlistsState.savedVideos.videos, video._id)
                // dispatch add or remove depending on value
                if(!isVideoBookmarked){
                    console.log('adding to ', playlistName);
                    try{
                        console.log("before: ", playlistToUpdate.videos.length);
                    
                        playlistToUpdate.videos.push(video)
                        console.log('pushed: ', playlistToUpdate);

                        const response = await axios.post('https://watch-wisp.herokuapp.com/playlists', playlistToUpdate, {
                        // const response = await axios.post('http://localhost:4000/playlists', playlistToUpdate, {
                            headers: {
                                playlistid: playlistToUpdate._id
                            }
                        })

                        console.log("resp of addToPlaylist - ", response);

                        playlistsDispatch({
                            type: 'ADD_TO_SAVEDVIDEOS',
                            payload: {
                                video: video,
                                playlistName: playlistName
                            }
                        })

                        toast.info(`Added to saved videos.`, {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });

                        setUpdatingPlaylist(false);
                    }
                    catch(error){
                        console.log('Error: adding to playlist - ', error.response.data);
                        toast.error(`Encountered a problem while saving this video.`, {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                        setUpdatingPlaylist(false);
                    }
                    
                }
                else{
                    // console.log('removing from ', playlistName);
                    try{
                            
                        let indexOfVideoToRemove = playlistToUpdate.videos.findIndex(singleVideo => singleVideo._id === video._id)

                        // console.log("index of vid: ", indexOfVideoToRemove);

                        playlistToUpdate.videos.splice(indexOfVideoToRemove, 1);

                        console.log('spliced: ', playlistToUpdate.videos);

                        const response = await axios.post('https://watch-wisp.herokuapp.com/playlists', playlistToUpdate, {
                        // const response = await axios.post('http://localhost:4000/playlists', playlistToUpdate, {
                                headers: {
                                playlistid: playlistToUpdate._id
                            }
                        })

                        console.log("resp of removeFromPlaylist - ", response);

                        playlistsDispatch({
                            type: 'REMOVE_FROM_SAVEDVIDEOS',
                            payload: {
                                video: video,
                                playlistName: playlistName
                            }
                        })

                        toast.info(`Video removed from playlist`, {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });

                        setUpdatingPlaylist(false);
                    }
                    catch(error){
                        console.log('error: ', error.response.data);
                        toast.error(`Problem while removing video from saved videos.`, {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                        setUpdatingPlaylist(false);
                    }
                }
            }
            
        }
        else{
            console.log("cannot change playlist without login..");
            toast.error(`You need to login to save this video`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setUpdatingPlaylist(false);
        }
    }

    return (
        <button onClick={() => toggleSaveVideo("Saved Videos")} className={`${styles.video_card_button} mr2`} disabled={updatingPlaylist} title={'Add to saved videos'}>
            {
                !updatingPlaylist ?
                <div>
                    {
                        playlistsState.savedVideos?.videos?.length > 0 && checkExistanceInArray(playlistsState.savedVideos.videos, video._id) ? 
                        <span className="displayFlex itemsCenter">
                            <MdBookmark className="textBlue4"/>
                            {
                                extendedButton === true ? <span className="textRg textBlue5 pt2 pb2 pl1 pr1"> Saved</span> : ""
                            }
                        </span> 
                        : 
                        <span className="displayFlex itemsCenter">
                            <MdBookmarkBorder className="textBlue4" />
                            {
                                !extendedButton === false ? <span className="textRg textBlue5 pt2 pb2 pl1 pr1"> Save</span>: ""
                            }
                        </span>
                        
                    }
                </div>
                :
                <span className="displayFlex itemsCenter">
                    <ImSpinner8 className="loadingIcon textBlue4"/>
                    {
                        !extendedButton === false ? <span className="textRg textBlue5 pt2 pb2 pl1 pr1"> Please wait</span>: ""
                    }
                </span>
            }
            
        </button>
    )
}
