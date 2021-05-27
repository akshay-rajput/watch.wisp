import React, {useState, useEffect} from 'react'
import styles from './PlaylistPopup.module.css';
import {MdClose} from 'react-icons/md';
import axios from 'axios';
import {usePlaylists} from '../../Store/PlaylistsContext';
import {useAuth} from '../../Store/AuthContext';
import {checkExistanceInArray, truncateText} from '../../utils';

export default function PlaylistPopup({isOpen, closePopup, videoData}) {
    const [showToast, setShowToast] = useState(false);
    const [customPlaylistName, setCustomPlaylistName] = useState("");
    const {authState, authDispatch} = useAuth();
    // get all playlist names from context
    const {playlistsState, playlistsDispatch} = usePlaylists();

    useEffect(() => {
        console.log("playlist state change..", playlistsState);
    }, [playlistsState])

    // general action of adding to playlist
    async function toggleAddToPlaylist(event){
        if(authState.userId){
            
            let playlistToUpdate = {};
            
            playlistsState.playlists.forEach(playlist => {
                if(playlist.name === event.target.name){
                    playlistToUpdate = {...playlist}
                }
            })
            
            // dispatch add or remove depending on checkbox value
            if(event.target.checked){
                console.log('adding to ', event.target.name);
                try{
                    console.log("before: ", playlistToUpdate.videos.length);
                
                    playlistToUpdate.videos.push(videoData)
                    console.log('updating pl: ', playlistToUpdate);

                    const response = await axios.post('https://watch-wisp.herokuapp.com/playlists', playlistToUpdate, {
                    // const response = await axios.post('http://localhost:4000/playlists', playlistToUpdate, {
                        headers: {
                            playlistid: playlistToUpdate._id
                        }
                    })

                    console.log("resp of addToPlaylist - ", response);

                    playlistsDispatch({
                        type: 'ADD_TO_PLAYLIST',
                        payload: {
                            video: videoData,
                            playlistName: event.target.name
                        }
                    })
                }
                catch(error){
                    console.log('Error: adding to playlist - ', error);
                }
                
            }else{
                console.log('removing from ', event.target.name);

                console.log("before: ", playlistToUpdate.videos.length);

                let indexOfVideoToRemove = playlistToUpdate.videos.findIndex(video => video._id === videoData._id)

                console.log("index of vid: ", indexOfVideoToRemove);

                playlistToUpdate.videos.splice(indexOfVideoToRemove, 1);

                console.log('updated pl: ', playlistToUpdate.videos);

                const response = await axios.post('https://watch-wisp.herokuapp.com/playlists', playlistToUpdate, {
                // const response = await axios.post('http://localhost:4000/playlists', playlistToUpdate, {
                        headers: {
                        playlistid: playlistToUpdate._id
                    }
                })

                console.log("resp of removeFromPlaylist - ", response);

                playlistsDispatch({
                    type: 'REMOVE_FROM_PLAYLIST',
                    payload: {
                        video: videoData,
                        playlistName: event.target.name
                    }
                })
            }
        }
        else{
            console.log("cannot change playlist without login..");
        }
    }

    // create new playlist
    async function createPlaylist(event){
        event.preventDefault();
        
        if(authState.userId){
            try{
                let playlistData = {
                    name: customPlaylistName,
                    userId: authState.userId,
                    videos: [videoData]
                }
                console.log("pdata: ", playlistData);
                // dispatch action to create playlist and add video to it
                const response = await axios.post("https://watch-wisp.herokuapp.com/playlists", playlistData);
                // const response = await axios.post("http://localhost:4000/playlists", playlistData);
                console.log('resp of create playlist: ', response)

                // clear input
                setCustomPlaylistName('');

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
            console.log('cannot create playlist without logging in')
        }
    }

    function handleInputChange(event){
        setCustomPlaylistName(event.target.value);
    }

    return (
        <div className={`${styles.modal}`}>
            <div onClick={closePopup} className={`${styles.modal_backdrop}`}></div>

            <div className={`${styles.modal_dialog} p4 rounded`}>
                <h4 className="textMd fontNormal">Add to Playlist</h4>
                <small className="mt1 mb4">
                    Selected video:
                    <span className="textGray4 fontSemiBold"> {truncateText(videoData.snippet.name, 30)}</span>
                </small>

                <form onSubmit={createPlaylist} className="displayFlex flexCol">
                    <div className="mb4">
                        {
                            playlistsState.playlists.map(playlist => {
                                console.log('exists: ', playlist.videos.length)
                                return(
                                    <label key={playlist._id} className="mb2 displayBlock">
                                        <input type="checkbox" checked={checkExistanceInArray(playlist.videos, videoData._id)} 
                                                name={playlist.name} onChange={toggleAddToPlaylist} /> {playlist.name}
                                    </label>
                                )
                            })
                        }
                    </div>
                    
                    <input type="text" value={customPlaylistName} onChange={handleInputChange}
                            placeholder="Enter playlist name" className="mb2 textRg p2 rounded border borderGray4" />
                    <button className="p2 rounded borderNone bgBlue5 hover:bgBlue4 textWhite">Create Playlist</button>
                </form>

                {   showToast &&
                    <p className="p2 rounded bgGreen2 textGreen6 mt4" >
                        Successfully added to {"playlist"}!
                    </p>
                }

                <button type="button" className={`${styles.btn_close}`} onClick={closePopup}>
                    <MdClose />
                </button>

            </div>

        </div>
    )
}
