import React, {useState, useEffect} from 'react'
import styles from './PlaylistPopup.module.css';
import {MdClose} from 'react-icons/md';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {usePlaylists} from '../../Store/PlaylistsContext';
import {useAuth} from '../../Store/AuthContext';
import {checkExistanceInArray, truncateText} from '../../utils';
import {ImSpinner10} from 'react-icons/im';

import { toast } from 'react-toastify';

export default function PlaylistPopup({isOpen, closePopup, videoData}) {
    const [showToast, setShowToast] = useState(false);
    const [customPlaylistName, setCustomPlaylistName] = useState("");
    const {authState, authDispatch} = useAuth();

    // get all playlist names from context
    const {playlistsState, playlistsDispatch} = usePlaylists();

    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
    const [updatingPlaylist, setUpdatingPlaylist] = useState(false);

    useEffect(() => {
        console.log("playlist state change..", playlistsState);
    }, [playlistsState])

    // general action of adding to playlist
    async function toggleAddToPlaylist(event){
        setUpdatingPlaylist(true);

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

                    toast.info(`Added to playlist`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                    setUpdatingPlaylist(false);
                }
                catch(error){
                    console.log('Error: adding to playlist - ', error);
                    toast.error(`Couldn't add video to playlist.`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    setUpdatingPlaylist(false);
                }
                
            }else{
                try{
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

                    toast.info(`Removed from playlist`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                    setUpdatingPlaylist(false);
                }
                catch(error){
                    console.log('Error removing video: ', error)
                    toast.error(`There was a problem when trying to remove this video.`, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            }
        }
        else{
            toast.error(`You need to login to update the playlist.`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setUpdatingPlaylist(false);
        }
    }

    // create new playlist
    async function createPlaylist(event){
        event.preventDefault();

        // loading
        setIsCreatingPlaylist(true);
        
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
                toast.success(`Playlist created.`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                setIsCreatingPlaylist(false);
            }
            catch(error){
                console.log('Error creating playlist: ', error);
                toast.error(`There was an error while creating the playlist.`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                setIsCreatingPlaylist(false);
            }
    
        }
        else{
            console.log('cannot create playlist without logging in');
            toast.error(`You need to login to create a playlist.`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsCreatingPlaylist(false);

        }
    }

    function handleInputChange(event){
        setCustomPlaylistName(event.target.value);
    }

    return (
        <div className={`${styles.modal}`}>
            <div onClick={closePopup} className={`${styles.modal_backdrop}`}></div>

            <div className={`${styles.modal_dialog} p4 rounded`}>
                
                {
                    authState.token ?
                    <div>
                        <h4 className="textMd fontNormal">Add to Playlist</h4>
                        <small className="mt1 mb4 displayBlock">
                            Selected video:
                            <span className="textGray4 fontSemiBold"> {truncateText(videoData.snippet.name, 30)}</span>
                        </small> 
                        <form onSubmit={createPlaylist} className="displayFlex flexCol">
                            <div className={`${styles.list_of_playlists}`}>
                                {
                                    playlistsState.playlists.map(playlist => {
                                        return(
                                            <label key={playlist._id} className="mb2 displayBlock">
                                                <input type="checkbox" checked={checkExistanceInArray(playlist.videos, videoData._id)} 
                                                    name={playlist.name} onChange={toggleAddToPlaylist} />
                                                <span className="pl2">{playlist.name}</span>
                                            </label>
                                        )
                                    })
                                }

                                {/* overlay when updating playlist */}
                                {
                                    updatingPlaylist &&
                                    <div className={`${styles.playlist_updating}`}>
                                        <ImSpinner10 className="loadingIcon"/> 
                                        <br />
                                        Updating playlist..
                                    </div>
                                } 
                            </div>
                            
                            <input type="text" value={customPlaylistName} onChange={handleInputChange}
                                    placeholder="Enter playlist name" className="mb2 mt4 textRg p2 rounded border borderGray4" required />
                            <button className="p2 rounded borderNone bgBlue5 hover:bgBlue4 textWhite" disabled={isCreatingPlaylist}>
                                {
                                    isCreatingPlaylist?
                                    "Please wait": "Create Playlist"
                                }
                            </button>
                        </form>
                    </div>
                    :
                    <div className="textCenter pt8 pb8">
                        <h3 className="textLg mb2">
                            Login required
                        </h3>
                        <p className="mb8 textSm textGray4">You need to be logged in to add video to playlist.</p>
                        <Link to="/login" className="link-button pt2 pb2 pl4 pr4 hover:textBlue5 hover:bgBlue3 mr6 rounded bgBlue5 textWhite">Login</Link>
                        <Link to="/signup" className="link-button pt2 pb2 pl4 pr4 rounded bgBlue2 textBlue6">Signup</Link>
                        
                    </div>
                }

                <button type="button" className={`${styles.btn_close}`} onClick={closePopup}>
                    <MdClose />
                </button>

            </div>

        </div>
    )
}
