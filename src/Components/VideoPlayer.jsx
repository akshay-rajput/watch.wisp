import React, {useEffect, useState, useRef} from 'react'
import ReactPlayer from "react-player/youtube";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdThumbDown, MdThumbUp, MdPlaylistAdd} from 'react-icons/md';
import {convertNumberScale} from '../utils';

import SaveVideoButton from './common/SaveVideoButton';
import PlaylistPopup from './common/PlaylistPopup';

import styles from './VideoPlayer.module.css';

export default function VideoPlayer({video}) {

    const [videoHeight, setVideoHeight] = useState(0);
    const [descriptionShow, setDescriptionShow] = useState(false);
    const [isPlaylistPopupOpen, setIsPlaylistPopupOpen] = useState(false)
    const videoBox = useRef(null);

    useEffect(() => {
        if(videoBox.current){
            setVideoHeight(videoBox.current.offsetWidth * 0.5625)
        }
        else{
            setVideoWidth(0)
        }
    }, [videoBox.current]);

    function toggleDescription(){
        console.log("toggle description");
        setDescriptionShow(prevState => !prevState);
    }

    function openPlaylistPopup(){
        setIsPlaylistPopupOpen(!isPlaylistPopupOpen);
    }

    function closePopup(){
        setIsPlaylistPopupOpen(false);
    }


    return (
        <div className="">
            <div ref={videoBox} className="mb4">
                <ReactPlayer url={'https://www.youtube.com/watch?v='+video.id} controls={true}  width={'100%'} height={videoHeight} style={{margin:'auto'}}/>
            </div>
            {
                video.snippet && 
                <div className=" pl2 pr2">

                    <h4 className="textGray5 fontNormal textMd md:textMd mb2">{video.snippet.name} </h4>
                    <div className="displayFlex flexWrap justifyBetween itemsCenter mt2">
                        <div className="displayFlex itemsCenter mb2">
                            {convertNumberScale(video.views)} views
                            <span className="mr2 ml2">&bull;</span>
                            {new Date(video.snippet.date).toDateString().substring(4)}

                            <span className="mr2 ml2">&bull;</span>

                            <div className="displayFlex mr2">
                                <span className="displayFlex itemsCenter mr4">
                                    <MdThumbUp className="mr1 textGray4" /> {convertNumberScale(video.likes)}
                                </span>
                                <span className="displayFlex itemsCenter">
                                    <MdThumbDown className="mr1 textGray4" /> {convertNumberScale(video.dislikes)}
                                </span>
                            </div>
                        </div>

                        <div className="displayFlex itemsCenter mb2">
                            <SaveVideoButton video={video} extendedButton={true} />

                            <button onClick={openPlaylistPopup} className={`${styles.video_add_to_playlist} ml2 rounded`} title={'Add to playlist'}>
                                <MdPlaylistAdd className="textMd mr1" />  Add to Playlist  
                            </button>
                        </div>
                        
                        {   isPlaylistPopupOpen &&
                            <PlaylistPopup isOpen={isPlaylistPopupOpen} videoData={video} closePopup = {closePopup} />
                        }
                    </div>

                    <hr className="border borderGray2" />
                    
                    <div className="mt3">
                        <span className="fontSemiBold textGray4">{video.channelTitle}</span>

                        <div className="displayFlex flexWrap gridGap2 mt2 mb2">
                            {
                                video.limitedTags.map(tag => {
                                    return(
                                        <label key={tag} className="p1 rounded textXs bgBlue1 textBlue5">{tag}</label>
                                    )
                                })
                            }
                        </div>


                        <p className={`${styles.video_description} textSm mt2 mb2`}>
                            <span className="">Description:</span>
                            {
                                descriptionShow ?
                                video.snippet.description
                                :
                                video.snippet.description.substring(0,150)+" ...."
                            }

                            <label onClick={toggleDescription} className="cursorPointer mt2 hover:textBlue4 hover:bgBlue1 textBlue6 displayFlex itemsCenter textSm" style={{width: 'fit-content'}}>
                                {
                                    descriptionShow ? "Show less" : "Show more"
                                }
                                {
                                    descriptionShow ? <MdKeyboardArrowUp className="textMd" /> : <MdKeyboardArrowDown className="textMd" />
                                }
                            </label>
                        </p>
                        
                    </div>
                </div>
            
            }
            
        </div>
    )
}
