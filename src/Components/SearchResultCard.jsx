import React, {useState} from 'react'
import styles from './SearchResultCard.module.css';
import {MdVisibility, MdThumbUp, MdBookmark, MdBookmarkBorder, MdPlaylistAdd} from 'react-icons/md';
import {convertNumberScale} from '../utils';
import {Link} from 'react-router-dom';

import SaveVideoButton from './common/SaveVideoButton';
import PlaylistPopup from './common/PlaylistPopup';

export default function SearchResultCard({video}) {
    const [isPlaylistPopupOpen, setIsPlaylistPopupOpen] = useState(false)

    function openPlaylistPopup(){
        setIsPlaylistPopupOpen(!isPlaylistPopupOpen);
    }

    function closePopup(){
        setIsPlaylistPopupOpen(false);
    }

    return (
        <div className={`${styles.result_card} gridColSpan2 md:gridColSpan1`}>
            <img src={video.snippet.thumbnailUrl} alt="video" className={`${styles.result_card_image}`} />
            
            <div className={`${styles.result_card_info} displayFlex flexCol`}>
                <div className="flexGrow">
                    <Link to={`/video/${video._id}`} className={`${styles.result_card_title} displayBlock md:mb4 fontNormal`}>
                        {video.snippet.name}
                    </Link>

                    <div className="result_card_stats displayFlex itemsCenter mt1">
                        <span className="textXs textGray4 md:textSm mr4 displayFlex itemsCenter">
                            <MdVisibility className="mr1 " /> {convertNumberScale(video.views)}
                        </span>
                        <span className="textXs textGray4 md:textSm displayFlex itemsCenter">
                            <MdThumbUp className="mr1" /> {convertNumberScale(video.likes)}
                        </span>
                    </div>
                </div>

                <div className="result_card_actions displayFlex itemsCenter" style={{justifyContent: 'flex-end'}}>
                    
                    <SaveVideoButton video={video} />

                    <button onClick={openPlaylistPopup} className={`${styles.result_card_action} rounded`} title={'Add to playlist'}>
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
