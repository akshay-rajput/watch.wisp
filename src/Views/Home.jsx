import React, {useState, useEffect} from 'react'
import axios from 'axios';
import HomeVideoSlider from '../Components/HomeVideoSlider';

export default function Home() {
    // const [videos, setvideos] = useState([]);
    const [hindiVideos, setHindiVideos] = useState([]);
    const [pronunciationVideos, setPronunciationVideos] = useState([]);
    const [vocabularyVideos, setVocabularyVideos] = useState([]);

    // get all videos
    useEffect(() => {
        getVideos();
        console.log('this runs after request...');
    }, []);

    async function getVideos(){
        try{
            const response = await axios.get('https://watch-wisp.herokuapp.com/videos');

            // setvideos(response.data.videos)
            console.log('success videoList :', response)

            // sort
            sortVideos(response.data.videos);
        }
        catch(error){
            console.log('error getting videos: ', error);
        }
    }

    function sortVideos(videoList){
        let sortedHindiVideos = []
        let sortedVocabularyVideos = []
        let sortedPronunciationVideos = []
            
        videoList.map(video => {
            
            if(video.category == "Hindi"){
                sortedHindiVideos.push(video);
            }

            if(video.category == "Vocabulary"){
                sortedVocabularyVideos.push(video)
            }

            if(video.category == "Pronunciation"){
                sortedPronunciationVideos.push(video)
            }
        })

        setHindiVideos(sortedHindiVideos);
        setVocabularyVideos(sortedVocabularyVideos);
        setPronunciationVideos(sortedPronunciationVideos);
    }

    return (
        <div>
            <div className="">
                <HomeVideoSlider videoList = {vocabularyVideos} title = {'Vocabulary'} />
                <HomeVideoSlider videoList = {pronunciationVideos} title = {'Pronunciation'} />
                <HomeVideoSlider videoList = {hindiVideos} title = {'English through Hindi'} />
                
            </div>
        </div>
    )
}
