import React, {useState} from 'react';
import styles from './PlaylistVideoCard.module.css';
import {MdVisibility, MdThumbUp, MdBookmark, MdBookmarkBorder, MdPlaylistAdd} from 'react-icons/md';
import {convertNumberScale} from '../../utils';
import SaveVideoButton from '../common/SaveVideoButton';
import PlaylistPopup from '../common/PlaylistPopup';

export default function PlaylistVideoCard({video}) {
    const [isPlaylistPopupOpen, setIsPlaylistPopupOpen] = useState(false)

    function openPlaylistPopup(){
        setIsPlaylistPopupOpen(!isPlaylistPopupOpen);
    }

    function closePopup(){
        setIsPlaylistPopupOpen(false);
    }

    
    return (
        <div className={`${styles.playlist_video_card} gridColSpan4 md:gridColSpan1`}>
            <img src={video.snippet.thumbnailUrl} alt="video" className={`${styles.playlist_video_card_image}`} />
            
            <div className={`${styles.playlist_video_card_info} displayFlex flexCol`}>
                <div className="flexGrow">
                    <h4 className={`${styles.playlist_video_card_title} md:mb2 fontNormal`}>
                        {video.snippet.name}
                    </h4>

                    <div className="playlist_video_card_stats displayFlex itemsCenter mt1">
                        <span className="textXs md:textSm mr4 displayFlex itemsCenter">
                            <MdVisibility className="mr1" /> {convertNumberScale(video.views)}
                        </span>
                        <span className="textXs md:textSm displayFlex itemsCenter">
                            <MdThumbUp className="mr1" /> {convertNumberScale(video.likes)}
                        </span>
                    </div>
                </div>

                <div className="playlist_video_card_actions displayFlex mt4 itemsCenter" style={{justifyContent: 'flex-end'}}>
                    
                    <SaveVideoButton video={video} />

                    <button onClick={openPlaylistPopup} className={`${styles.playlist_video_card_action} rounded`} title={'Add to playlist'}>
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
