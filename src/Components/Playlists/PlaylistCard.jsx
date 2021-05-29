import React, {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {MdEdit, MdSave, MdDeleteForever} from 'react-icons/md';
import styles from './PlaylistCard.module.css';

export default function PlaylistCard({playlistData}) {
    const isEditable = playlistData.name.toLowerCase() !== "saved videos"

    const [editingPlaylist, setEditingPlaylist] = useState(false);
    const [playlistUpdateOn, setPlaylistUpdateOn] = useState('')

    useEffect(() => {
        let update = new Date(playlistData.updatedAt);
        
        update = update.getDate() +'-'+ update.toLocaleString('default', { month: 'short' }) +'-' + update.getFullYear()
        
        setPlaylistUpdateOn(playlistUpdateOn => update);

        return () => {
            setPlaylistUpdateOn('');
        }
    }, [playlistData])

    function toggleEditPlaylist(){
        setEditingPlaylist(editingPlaylist => !editingPlaylist);
    }

    return (
        <div className={`${styles.playlist_card}`}>
            <div className="displayGrid gridCols11 pl2 pr2 pt1 pb1">
                <div className="gridColSpan10">
                    <Link to={`/playlists/${playlistData._id}`} state={playlistData} className="md:textRg pl2 pt1 pb1">
                        {
                            playlistData.name.length > 20 ? playlistData.name.substring(0,20)+'...' : playlistData.name
                        }
                    </Link>
                    
                    <div className="textGray4 displayFlex flexWrap itemsCenter pl2 pr2 pt1 pb1">
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
                            <button onClick={toggleEditPlaylist}  className={`${styles.playlist_card_button} gridColSpan1`}>
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
