import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md';
import {Link} from 'react-router-dom';

export default function About() {
    let features = [
        "JWT Authentication", "User Management", 
        "Create Playlist", "Add/Remove from playlist",
        "Save videos", "Search video",
        "Dynamic routing", "Handling empty states"
    ]

    return (
        <div className="md:ml4">
            <h2 className="textMd md:textLg">About</h2>
            <p className="textGray4 lineHeightMd mt2 mb2">
                Wisp is a video library app which shows curated youtube videos related to vocabulary and english speaking.
            </p>
            <p className="textGray4 lineHeightMd mt2 mb2">
                This is a MERN stack app. More information about libraries used is on
                <Link to="/acknowledgements" className="ml1 mr1 textBlue5 hover:textBlue6">acknowledgements</Link> page.
            </p>
            <div className="textGray5 lineHeightMd mt2 mb2">
                Some of the implemented features are:
                <ul className="">
                    {
                        features.map(feature => {
                            return(
                                <li key={feature} className="displayFlex itemsCenter">
                                    <MdKeyboardArrowRight /> {feature}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <p className="mt4 mb4 lineHeightMd">
            This app was made by
                <a href="https://www.linkedin.com/in/akshay-rajput/" target="_blank" rel='noopener noreferrer' className="ml1 mr1 textPurple4 hover:textPurple6">Akshay Rajput</a> 
                 as a project for <a href="https://neog.camp" target="_blank" rel='noopener noreferrer' className="textPurple4 hover:textPurple6">NeogCamp</a>.
            </p>
        </div>
    )
}
