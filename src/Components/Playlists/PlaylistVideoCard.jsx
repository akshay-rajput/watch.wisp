import React from 'react';
import styles from './PlaylistVideoCard.module.css';
import {MdVisibility, MdThumbUp, MdBookmark, MdBookmarkBorder, MdPlaylistAdd} from 'react-icons/md';
import {convertNumberScale} from '../../utils';

export default function PlaylistVideoCard({video}) {
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
                    <button className={`${styles.playlist_video_card_action} rounded ml2 mr2`}>
                        <MdBookmark />
                        <MdBookmarkBorder />
                    </button>

                    <button className={`${styles.playlist_video_card_action} rounded`}>
                        <MdPlaylistAdd />
                    </button>
                </div>

            </div>
            
        </div>
    )
}
