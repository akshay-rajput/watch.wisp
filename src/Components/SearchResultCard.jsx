import React from 'react'
import styles from './SearchResultCard.module.css';
import {MdVisibility, MdThumbUp, MdBookmark, MdBookmarkBorder, MdPlaylistAdd} from 'react-icons/md';
import {convertNumberScale} from '../utils';

export default function SearchResultCard({video}) {

    return (
        <div className={`${styles.result_card} gridColSpan2 md:gridColSpan1`}>
            <img src={video.snippet.thumbnailUrl} alt="video" className={`${styles.result_card_image}`} />
            
            <div className={`${styles.result_card_info} displayFlex flexCol`}>
                <div className="flexGrow">
                    <h4 className={`${styles.result_card_title} md:mb4 fontNormal`}>
                        {video.snippet.name}
                    </h4>

                    <div className="result_card_stats displayFlex itemsCenter mt1">
                        <span className="textXs md:textSm mr4 displayFlex itemsCenter">
                            <MdVisibility className="mr1" /> {convertNumberScale(video.views)}
                        </span>
                        <span className="textXs md:textSm displayFlex itemsCenter">
                            <MdThumbUp className="mr1" /> {convertNumberScale(video.likes)}
                        </span>
                    </div>
                </div>

                <div className="result_card_actions displayFlex itemsCenter" style={{justifyContent: 'flex-end'}}>
                    <button className={`${styles.result_card_action} rounded ml2 mr2`}>
                        <MdBookmark />
                        <MdBookmarkBorder />
                    </button>

                    <button className={`${styles.result_card_action} rounded`}>
                        <MdPlaylistAdd />
                    </button>
                </div>

            </div>
            
        </div>
    )
}
