import React, {useState} from 'react'
import styles from './HomeVideoCard.module.css';
import {MdPlaylistAdd, MdBookmark, MdBookmarkBorder} from 'react-icons/md';
import {convertNumberScale, truncateText, convertDuration, checkExistanceInArray} from '../utils';
import PlaylistPopup from '../Components/common/PlaylistPopup';

import axios from 'axios';
import {usePlaylists} from '../Store/PlaylistsContext';
import {useAuth} from '../Store/AuthContext';

import useWindowDimensions from "../Hooks/useWindowDimensions";

export default function HomeVideoCard({video}) {
    const {width} = useWindowDimensions();

    const [isPlaylistPopupOpen, setIsPlaylistPopupOpen] = useState(false)

    const {authState, authDispatch} = useAuth();
    // get all playlist names from context
    const {playlistsState, playlistsDispatch} = usePlaylists();

    // add to saved videos or remove
    async function toggleSaveVideo(playlistName){
        console.log('toggle playlist: ',playlistName)
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
                            playlist: response.data.playlist
                        }
                    })
                }
                catch(error){
                    console.log('Error creating playlist: ', error);
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
                    }
                    catch(error){
                        console.log('Error: adding to playlist - ', error);
                    }
                    
                }else{
                    // console.log('removing from ', playlistName);

                    console.log("before: ", playlistToUpdate.videos.length);

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
                }
            }
            
        }
        else{
            console.log("cannot change playlist without login..");
        }
    }

    function openPlaylistPopup(){
        setIsPlaylistPopupOpen(!isPlaylistPopupOpen);
    }

    function closePopup(){
        setIsPlaylistPopupOpen(false);
    }

    return (
        <div className={`${styles.video_card}`}>
            <div className={`${styles.video_card_imagewrap}`}>
                <img src={video.snippet.thumbnailUrl} alt="Video Thumbnail" title={video.snippet.name} className={`${styles.video_card_image}`} />
                <span className={`${styles.video_card_duration} textSm`}>{convertDuration(video.duration)}</span>

            </div>
            <div className={`pl2 pr2 pb2`}>
                <h4 title={video.snippet.name} className={`${styles.video_card_title} cursorPointer fontNormal`}>{video.snippet.name}</h4>

                <span className="textXs textGray4">
                    {width < 768 ? truncateText(video.channelTitle, 25) : truncateText(video.channelTitle, 40)} &bull; {convertNumberScale(video.views)} views
                </span>

                
                {/* add to playlist */}
                <div className={`${styles.video_card_button_group} mt2`}>
                    
                    <button onClick={() => toggleSaveVideo("Saved Videos")} className={`${styles.video_card_button} mr2`} title={'Add to saved videos'}>
                        {
                            playlistsState.savedVideos?.videos?.length > 0 && checkExistanceInArray(playlistsState.savedVideos.videos, video._id) ? 
                            <MdBookmark  className="textBlue4"/> : <MdBookmarkBorder className="textBlue4" />
                        }
                    </button>
                    
                    <button onClick={openPlaylistPopup} className={`${styles.video_card_button}`} title={'Add to playlist'}>
                        <MdPlaylistAdd />    
                    </button>
                </div>

                {   isPlaylistPopupOpen &&
                    <PlaylistPopup isOpen={isPlaylistPopupOpen} videoData={video} closePopup = {closePopup} />
                }
            </div>
        </div>
    )
}
