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
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // make request only if playlist is empty in state
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

                    setLoading(false);
                }
                catch(error){
                    console.log('Home - Error getting videos:', error)
                }
            })()
        }
        else{
            setLoading(false);
        }

    }, []);

    return (
        <div>
            <div className="">
                <HomeVideoSlider loading={loading} videoList = {playlistsState.vocabularyVideoList} title = {'Vocabulary'} />
                <HomeVideoSlider loading={loading} videoList = {playlistsState.pronunciationVideoList} title = {'Pronunciation'} />
                <HomeVideoSlider loading={loading} videoList = {playlistsState.hindiVideoList} title = {'English through Hindi'} />
            </div>
        </div>
    )
}
