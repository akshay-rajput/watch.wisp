import React from 'react'
import {MdArrowForward} from 'react-icons/md';
import HomeVideoCard from './HomeVideoCard';
import styles from './HomeVideoSlider.module.css';

export default function HomeVideoSlider({videoList, title}) {
    return (
        <div >
            <div className="displayFlex justifyBetween itemsCenter pl2 pr2">
                <div className="displayFlex itemsCenter">
                    <h4 className="textMd textGray5 mr1">{title} </h4>
                    {/* <span className="textSm textGray4">( {videoList.length} )</span> */}
                </div>
                <a href="" className="">
                    <MdArrowForward /> View All
                </a>
            </div>
            
            <div className={`${styles.video_slider}`}>
                {videoList.map(video => {
                    return (
                        <HomeVideoCard className="" key={video.id} video={video} />
                    )
                })}
            </div>
            
        </div>
    )
}
