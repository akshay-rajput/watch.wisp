import React, {useState} from 'react';
import styles from './PlaylistVideoCard.module.css';
import {MdVisibility, MdThumbUp, MdPlaylistAdd} from 'react-icons/md';
import {convertNumberScale} from '../../utils';
import {Link, useLocation} from 'react-router-dom';
import SaveVideoButton from '../common/SaveVideoButton';
import PlaylistPopup from '../common/PlaylistPopup';

export default function PlaylistVideoCard({video}) {
    const [isPlaylistPopupOpen, setIsPlaylistPopupOpen] = useState(false)

    const {pathname} = useLocation();
    let pathnameArray = pathname.split('/');

    function openPlaylistPopup(){
        setIsPlaylistPopupOpen(!isPlaylistPopupOpen);
    }

    function closePopup(){
        setIsPlaylistPopupOpen(false);
    }

    
    return (
        <div className={ pathnameArray[1] === "video" ? styles.playlist_video_card_horizontal : styles.playlist_video_card + ` gridColSpan4 md:gridColSpan1`}>
            <img src={video.snippet.thumbnailUrl} alt="video" className={`${styles.playlist_video_card_image}`} />
            
            <div className={`${styles.playlist_video_card_info} displayFlex flexCol`}>
                
                <div className="flexGrow">
                    <Link to={`/video/${video._id}`} className={`${styles.playlist_video_card_title} displayBlock md:mb2 fontNormal`}>
                        {video.snippet.name}
                    </Link>
                    <div className="playlist_video_card_stats displayFlex itemsCenter mt2">
                        <span className="textXs md:textSm mr4 displayFlex itemsCenter">
                            <MdVisibility className="mr1 textGray4" /> {convertNumberScale(video.views)}
                        </span>
                        <span className="textXs md:textSm displayFlex itemsCenter">
                            <MdThumbUp className="mr1 textGray4" /> {convertNumberScale(video.likes)}
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
