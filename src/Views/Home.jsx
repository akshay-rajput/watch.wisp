import React, {useState, useEffect} from 'react'
// import axios from 'axios';
import HomeVideoSlider from '../Components/HomeVideoSlider';
import {
    getVideos,
    hindiVideos,
    vocabularyVideos,
    pronunciationVideos
} from '../getVideos';

import {usePlaylists} from '../Store/PlaylistsContext';


export default function Home() {
    const {playlistsState, playlistsDispatch} = usePlaylists();

    // get all videos
    useEffect(() => {
        if(playlistsState.vocabularyVideoList.length < 1){
            ( async () => {
                try{
                    await getVideos();
    
                    playlistsDispatch(
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
                    console.log('Home - Error getting videos:', error)
                }
            })()
        }

    }, [getVideos, playlistsState.vocabularyVideoList]);

    return (
        <div>
            <div className="">
                <HomeVideoSlider videoList = {playlistsState.vocabularyVideoList} title = {'Vocabulary'} />
                <HomeVideoSlider videoList = {playlistsState.pronunciationVideoList} title = {'Pronunciation'} />
                <HomeVideoSlider videoList = {playlistsState.hindiVideoList} title = {'English through Hindi'} />
                
            </div>
        </div>
    )
}
