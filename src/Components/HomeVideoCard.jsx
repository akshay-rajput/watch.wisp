import React, {useState} from 'react'
import styles from './HomeVideoCard.module.css';
import {MdPlaylistAdd} from 'react-icons/md';
import {convertNumberScale, truncateText, convertDuration, checkExistanceInArray} from '../utils';
import PlaylistPopup from '../Components/common/PlaylistPopup';
import SaveVideoButton from '../Components/common/SaveVideoButton';

import useWindowDimensions from "../Hooks/useWindowDimensions";

export default function HomeVideoCard({video}) {
    const {width} = useWindowDimensions();

    const [isPlaylistPopupOpen, setIsPlaylistPopupOpen] = useState(false)

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
                    
                    <SaveVideoButton video={video} />
                    
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
