import React, {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import {usePlaylists} from '../../Store/PlaylistsContext';
import {MdEdit, MdSave, MdDeleteForever, MdChevronRight} from 'react-icons/md';
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

    async function deletePlaylistClicked(){
        try{
            console.log("deleting > ", playlistData._id);
            const response = await axios.delete('https://watch-wisp.herokuapp.com/playlists', {
                        // const response = await axios.post('http://localhost:4000/playlists', playlistToUpdate, {
                            headers: {
                                playlistid: playlistData._id
                            }
                        })

            console.log('Delete playlist: ', response);
            
            if(response.data.deleted){
                playlistsDispatch({
                    type: 'DELETE_PLAYLIST',
                    payload: {
                        playlistId: playlistData._id,
                        playlistName: playlistName
                    }
                })
            }
            else{
                console.log('Problem deleting the playlist..', response.data);
            }
        }
        catch(error){
            console.log('Error deleting: ', error);
        }
    }

    return (
        <div className={`${styles.playlist_card}`}>
            <div className="displayGrid hFull gridCols11 pl2 pr2 pt1 pb1">
                <div className="gridColSpan10 displayFlex justifyBetween flexCol pt1">
                    {
                        !editingPlaylist ? 
                        <Link to={`/playlists/${playlistData._id}`} className={`${styles.playlist_card_title} md:textRg pl2 `} title={playlistData.name}>
                            {
                                playlistData.name.length > 26 ? playlistData.name.substring(0,25)+'...' : playlistData.name
                            }
                        </Link>
                        : 
                        <input type="text" value={playlistName} onChange={inputChange} className={`rounded md:textRg pl2 pt1 pb1 border borderGray3 bgBlue1`}
                               placeholder="Enter playlist name" name="playlistName" id="playlistName" />
                    }
                    
                    <div className="textGray4 flexGrow displayFlex flexWrap itemsCenter mt1 pl2 pr2 pt1 pb1">
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

                    <div className={`${styles.playlist_card_viewlink}`}>
                        <Link to={`/playlists/${playlistData._id}`} className={`displayFlex itemsCenter p2 textBlue4 hover:textBlue6`}>
                            View Playlist
                            <MdChevronRight className="textMd" />
                        </Link>
                    </div>
                </div>

                {
                    isEditable && 
                    <div className={`${styles.playlist_card_actions} displayFlex flexCol itemsCenter mt1`}>
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
                        
                        <button onClick={deletePlaylistClicked} className={`gridColSpan1 displayFlex itemsCenter p1 mt2 bgTransparent borderNone textRed4 hover:bgRed1 hover:textRed6 rounded`}>
                            <MdDeleteForever className="textMd"/>
                        </button>
                    </div>
                }
            </div>
        
            
        </div>
    )
}
