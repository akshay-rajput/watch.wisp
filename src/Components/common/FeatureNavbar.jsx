import React from 'react'
import styles from './FeatureNavbar.module.css';
import {NavLink} from 'react-router-dom';
import {MdHome, MdAddToPhotos, MdVideoLibrary, MdBookmark} from 'react-icons/md'

export default function FeatureNavbar() {
    return (
        <div className={`${styles.feature_navbar}`}>
            <NavLink end activeClassName="active_link" to="/" className={`${styles.nav_link} borderNone  bgTransparent displayFlex flexCol itemsCenter`}>
                <MdHome className="textLg" />
                <span className="textXs pt2">Home</span>
            </NavLink>

            <NavLink end activeClassName="active_link" to="/addVideo" className={` ${styles.nav_link} borderNone  bgTransparent displayFlex flexCol itemsCenter`}>
                <MdAddToPhotos className="textLg"/>
                <span className="textXs pt2">Add Video</span>
            </NavLink>
            
            <NavLink end activeClassName="active_link" to="/playlists/savedVideos" className={` ${styles.nav_link} borderNone  bgTransparent displayFlex flexCol itemsCenter`}>
                <MdBookmark className="textLg" />
                <span className="textXs pt2">Saved Videos</span>

            </NavLink>
            
            <NavLink end activeClassName="active_link" to="/playlists" className={` ${styles.nav_link} borderNone  bgTransparent displayFlex flexCol itemsCenter`}>
                <MdVideoLibrary className="textLg" /> 
                <span className="textXs pt2">Playlists</span>
            </NavLink>
        </div>
    )
}
