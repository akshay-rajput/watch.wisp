import axios from 'axios';

let hindiVideos = []
let vocabularyVideos = []
let pronunciationVideos = []

export const getVideos = async () => {

    try{
        const response = await axios.get('https://watch-wisp.herokuapp.com/videos');

        console.log('success videoList :', response)

        // sort
        sortVideos(response.data.videos);        
    }
    catch(error){
        console.log('error getting videos: ', error);
    }
}

function sortVideos(videoList){
        
    videoList.map(video => {
        
        if(video.category == "Hindi"){
            hindiVideos.push(video);
        }

        if(video.category == "Vocabulary"){
            vocabularyVideos.push(video)
        }

        if(video.category == "Pronunciation"){
            pronunciationVideos.push(video)
        }
    })

}

export {hindiVideos, vocabularyVideos, pronunciationVideos}