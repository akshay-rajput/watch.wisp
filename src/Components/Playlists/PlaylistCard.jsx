import React, {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import {usePlaylists} from '../../Store/PlaylistsContext';
import {MdEdit, MdSave, MdDeleteForever} from 'react-icons/md';
import styles from './PlaylistCard.module.css';

export default function PlaylistCard({playlistData}) {
    const isEditable = playlistData.name.toLowerCase() !== "saved videos"

    const [editingPlaylist, setEditingPlaylist] = useState(false);
    const [playlistUpdateOn, setPlaylistUpdateOn] = useState('')

    const [playlistName, setPlaylistName] = useState("")

    const {playlistsState, playlistsDispatch} = usePlaylists();
    
    // format update date
    useEffect(() => {
        let update = new Date(playlistData.updatedAt);
        
        update = update.getDate() +'-'+ update.toLocaleString('default', { month: 'short' }) +'-' + update.getFullYear()
        
        setPlaylistUpdateOn(update);
        
        setPlaylistName(playlistData.name);

        return () => {
            setPlaylistUpdateOn('');
        }
    }, [playlistData])

    function toggleEditPlaylist(){
        setEditingPlaylist(editingPlaylist => !editingPlaylist);
    }

    function inputChange(event){
        setPlaylistName(event.target.value);
    }

    async function savePlaylist(){
        let playlistToUpdate = {...playlistData};
        playlistToUpdate.name = playlistName;
            
        console.log("saving playlist: ", playlistToUpdate);

        try{
            const response = await axios.post('https://watch-wisp.herokuapp.com/playlists', playlistToUpdate, {
                        // const response = await axios.post('http://localhost:4000/playlists', playlistToUpdate, {
                            headers: {
                                playlistid: playlistToUpdate._id
                            }
                        })
            console.log('response of edit playlsit: ', response)
            
            playlistsDispatch({
                type: 'EDIT_PLAYLIST_NAME',
                payload: {
                    playlistId: playlistData._id,
                    playlistName: playlistName
                }
            })
         
            // toggle back
            toggleEditPlaylist();
        }
        catch(error){
            console.log('error saving playlist..', error);
        }

    }

    return (
        <div className={`${styles.playlist_card}`}>
            <div className="displayGrid gridCols11 pl2 pr2 pt1 pb1">
                <div className="gridColSpan10">
                    {
                        !editingPlaylist ? 
                        <Link to={`/playlists/${playlistData._id}`} state={playlistData} className={`${styles.playlist_card_title} md:textRg pl2 pt1 pb1`}>
                            {
                                playlistData.name.length > 20 ? playlistData.name.substring(0,20)+'...' : playlistData.name
                            }
                        </Link>
                        : 
                        <input type="text" value={playlistName} onChange={inputChange} className={`rounded md:textRg pl2 pt1 pb1 border borderGray3 bgBlue1`}
                               placeholder="Enter playlist name" name="playlistName" id="playlistName" />
                    }
                    
                    <div className="textGray4 displayFlex flexWrap itemsCenter mt1 pl2 pr2 pt1 pb1">
                        <small className="mr1">{playlistData.videos.length} Videos</small>
                        &bull;
                        <small className="ml1 mr1">
                            {isEditable ? 'User Playlist' : "Default Playlist"}
                        </small>
                        &bull;
                        <small className="wFull mt1 mb2">
                            Updated: {playlistUpdateOn}
                        </small>
                    </div>

                    <button className={`bgTransparent borderNone p2 textBlue4 hover:textBlue6`}>
                        View Playlist
                    </button>
                </div>

                {
                    isEditable && 
                    <div className={`${styles.playlist_card_actions} displayFlex flexCol itemsCenter`}>
                        {
                            editingPlaylist ? 
                            <button onClick={savePlaylist}  className={`${styles.playlist_card_button} gridColSpan1`}>
                                <MdSave />                    
                            </button>
                            :
                            <button onClick={toggleEditPlaylist} className={`${styles.playlist_card_button} gridColSpan1`}>
                                <MdEdit />                    
                            </button>
                        }

                        
                        <button className={`gridColSpan1 displayFlex itemsCenter p1 mt3 bgTransparent borderNone textRed4 hover:bgRed1 hover:textRed6 rounded`}>
                            <MdDeleteForever className="textMd"/>
                        </button>
                    </div>
                }
            </div>
        
            
        </div>
    )
}
