import React from 'react'
import styles from './FeatureNavbar.module.css';
import {MdHome, MdAddToPhotos, MdVideoLibrary, MdBookmarkBorder} from 'react-icons/md'

export default function FeatureNavbar() {
    return (
        <div className={`${styles.feature_navbar}`}>
            <button className={`${styles.active_link} borderNone textGray3 bgTransparent displayFlex flexCol itemsCenter md:mb8`}>
                <MdHome className="textLg" />
                <span className="textXs pt2">Home</span>
            </button>
            <button className={` borderNone textGray3 bgTransparent displayFlex flexCol itemsCenter md:mb8`}>
                <MdAddToPhotos className="textLg"/>
                <span className="textXs pt2">Add Video</span>
            </button>
            <button className={` borderNone textGray3 bgTransparent displayFlex flexCol itemsCenter md:mb8`}>
                <MdBookmarkBorder className="textLg" />
                <span className="textXs pt2">Saved Videos</span>

            </button>
            <button className={` borderNone textGray3 bgTransparent displayFlex flexCol itemsCenter md:mb8`}>
                <MdVideoLibrary className="textLg" /> 
                <span className="textXs pt2">Playlists</span>
            </button>
        </div>
    )
}
