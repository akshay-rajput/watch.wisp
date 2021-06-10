import React from 'react'
import {MdChevronRight} from 'react-icons/md';
import {Link} from 'react-router-dom';
import HomeVideoCard from './HomeVideoCard';
import styles from './HomeVideoSlider.module.css';
import Skeleton from 'react-loading-skeleton';

export default function HomeVideoSlider({videoList, title, loading}) {
    return (
        <div className="mb12">
            <div className="displayFlex justifyBetween itemsCenter pl2 pr2 mb2">
                <div className="displayFlex itemsCenter">
                    <h4 className="textMd textGray5 mr1">{title} </h4>
                    {/* <span className="textSm textGray4">( {videoList.length} )</span> */}
                </div>
                <Link to={title !== "Pronunciation" && title !=="Vocabulary" ? "category/hindi": "category/"+title} className=" displayFlex itemsCenter">
                    View All <MdChevronRight />
                </Link>
            </div>
            
            <div className={`${styles.video_slider}`}>
                {
                    !loading ?
                    videoList.map(video => {
                        return (
                            <HomeVideoCard className="" key={video.id} video={video} />
                        ) 
                    }) 
                    : 
                    [...Array(6)].map((child, index) => {
                        return(
                            <Skeleton key={index} style={{ width: '300px', height: "250px", }}/>
                        )
                    })
                }
                
            </div>
            
        </div>
    )
}
