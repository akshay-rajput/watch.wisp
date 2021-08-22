import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import styles from './Video.module.css';
import PlaylistVideoCard from '../Components/Playlists/PlaylistVideoCard';
import VideoPlayer from '../Components/VideoPlayer';
import {usePlaylists} from '../Store/PlaylistsContext';
import Skeleton from 'react-loading-skeleton';
import {
    getVideos,
    hindiVideos,
    vocabularyVideos,
    pronunciationVideos
} from '../getVideos';

export default function Video() {
    const {playlistsState, playlistsDispatch} = usePlaylists();

    const {videoId} = useParams();
    const [videoData, setVideoData] = useState({});
    const [similarVideos, setSimilarVideos] = useState([]);

    const [videoLoaded, setVideoLoaded] = useState(false);
    const [similarVideosLoaded, setSimilarVideosLoaded] = useState(false);

    useEffect(() => {
        if(videoId){
            (async ()=>{
                try{
                    await getVideoDetails();
                }
                catch(error){
                    console.log('error in useeffect of video: ', error)
                }
            })()
        }
        return () => {
            setVideoData({});
        }
    }, [videoId])

    async function getVideoDetails(){
        try{
            const response = await axios.get('https://watch-wisp.herokuapp.com/videos/'+videoId)
            
            let categoryOfVideo = response.data.video.category;
            
            setVideoData(response.data.video);
            
            setVideoLoaded(true);

            await findSimilarVideos(categoryOfVideo);

        }
        catch(error){
            console.log("error getting video: ", error);
        }
    }

    async function findSimilarVideos(category){
        console.log("passed category : ", category);

        let videoList = []

        if(category == 'Vocabulary' || videoData.category == 'Vocabulary'){
            videoList = playlistsState.vocabularyVideoList
        }
        else if(category == "Pronunciation" || videoData.category == "Pronunciation"){
            videoList = playlistsState.pronunciationVideoList
        }
        else{
            videoList = playlistsState.hindiVideoList;
        }

        // if page refreshed, categorize again
        if(playlistsState.vocabularyVideoList.length < 1){
            try{
                console.log("categorizing..");
                await getVideos();
                
                switch (category) {
                    case "Vocabulary":
                        videoList = vocabularyVideos
                        break;
                    case "Pronunciation":
                        videoList = pronunciationVideos
                        break;
                    case "Hindi":
                        videoList = hindiVideos
                        break;
                            
                    default:
                        break;
                }

                await playlistsDispatch(
                    {
                        type: "CATEGORIZE_VIDEOS",
                        payload: {
                            hindiVideos,
                            vocabularyVideos,
                            pronunciationVideos
                        }
                    }
                )
            }
            catch(error){
                console.log('VideoPage - Error getting videos for category:', error)
            }
        }

        let similarvids = videoList.filter(video => {
            return video._id !== videoId
        })
        
        setSimilarVideos(similarvids)

        setSimilarVideosLoaded(true);
    }

    return (
        <div className={`displayGrid gridCols12`}>
            <div className={`${styles.video_container} md:pr12`}>
                {
                    videoLoaded ? 
                    <VideoPlayer video={videoData} />
                    :
                    <Skeleton style={{ width: '100%', height: "500px", }}/>
                }
            </div>
            <div className={`${styles.video_others} mb12`}>
                {
                    similarVideosLoaded ?
                    <div>
                        <h4 className="textGray4 fontSemiBold mb4">Similar videos</h4>
                        {
                            similarVideos.map((similarVideo, index) => {
                                return(
                                    <div className="mb4" key={similarVideo._id}>
                                        <PlaylistVideoCard video={similarVideo} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    [...Array(6)].map((child, index) => {
                        return(
                            <Skeleton key={index} style={{ width: '100%', height: "200px", }}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
