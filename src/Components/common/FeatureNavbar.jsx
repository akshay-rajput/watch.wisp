import React from 'react'
import styles from './FeatureNavbar.module.css';
import {NavLink} from 'react-router-dom';
import {MdHome, MdVideoLibrary, MdBookmark, MdSearch} from 'react-icons/md'

export default function FeatureNavbar() {
    return (
        <div className={`${styles.feature_navbar}`}>
            <NavLink end activeClassName="active_link" to="/" className={`${styles.nav_link} borderNone  bgTransparent`}>
                <MdHome className="textLg" />
                <span className={`${styles.nav_label} pt2`}>Home</span>
            </NavLink>

            <NavLink end activeClassName="active_link" to="/search" className={` ${styles.nav_link} borderNone  bgTransparent`}>
                <MdSearch className="textLg"/>
                <span className={`${styles.nav_label} pt2`}>Search</span>
            </NavLink>
            
            <NavLink end activeClassName="active_link" to="/playlists/savedVideos" className={` ${styles.nav_link} borderNone  bgTransparent`}>
                <MdBookmark className="textLg" />
                <span className={`${styles.nav_label} pt2`}>Saved Videos</span>
            </NavLink>
            
            <NavLink end activeClassName="active_link" to="/playlists" className={` ${styles.nav_link} borderNone  bgTransparent`}>
                <MdVideoLibrary className="textLg" /> 
                <span className={`${styles.nav_label} pt2`}>Playlists</span>
            </NavLink>
        </div>
    )
}
