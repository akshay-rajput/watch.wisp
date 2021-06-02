import React, {useEffect} from 'react';
import HomeVideoCard from '../Components/HomeVideoCard';

import {
    getVideos,
    hindiVideos,
    vocabularyVideos,
    pronunciationVideos
} from '../getVideos';

import {usePlaylists} from '../Store/PlaylistsContext';

export default function HindiVideos() {
    const {playlistsState, playlistsDispatch} = usePlaylists();

    useEffect(() => {
        // make request only if playlist is empty in state
        if(playlistsState.hindiVideoList.length < 1){
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
                    console.log('Hindi - Error getting videos:', error)
                }
            })()
        }

    }, []);

    return (
        <div>
            <h3 className="textLg fontSemiBold mb8">English through Hindi <small className="textGray4">({playlistsState.hindiVideoList.length})</small></h3>
                
            <div className="displayGrid gridCols1 md:gridCols4 gridGap4 mb12">
                {playlistsState.hindiVideoList.map(video => {
                    return (
                        <HomeVideoCard className="" key={video.id} video={video} />
                    )
                })}
            </div>
        </div>
    )
}
