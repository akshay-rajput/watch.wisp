
const actionTypes = {
    getAllPlaylists: "GET_ALL_PLAYLISTS",
    addToPlaylist: 'ADD_TO_PLAYLIST',
    removeFromPlaylist: "REMOVE_FROM_PLAYLIST",
    addToSavedVideos: "ADD_TO_SAVEDVIDEOS",
    removeFromSavedVideos: "REMOVE_FROM_SAVEDVIDEOS",
    createPlaylist: "CREATE_PLAYLIST",
    deletePlaylist: "DELETE_PLAYLIST",
    resetPlaylists: "RESET_PLAYLISTS"
}

export const initialState = {
    userId: '',
    playlists: [],
    savedVideos: {},
    likedVideos: {}
}

const PlaylistsReducer = (state, action) => {
    
    const {type, payload} = action;
    // console.log('action is: ', action);

    switch (type) {
        case actionTypes.getAllPlaylists:
            console.log('payload playlists...', payload)
            return {
                ...state,
                userId: payload.userId,
                playlists: payload.playlists,
                savedVideos: payload.savedVideos
            }
        
        case actionTypes.addToPlaylist:
            let updatedPlaylists = state.playlists.map(playlist => {
                if(playlist.name === payload.playlistName){
                    // add only if video didn't exist in playlist
                    let videoIndex = playlist.videos.findIndex(video => video._id === payload.video._id);
                    if(videoIndex < 0){
                        return {  
                            ...playlist, 
                            videos: [ ...playlist.videos, payload.video ]
                        }
                    }
                }
                return playlist;
            })

            return {
                ...state,
                playlists: updatedPlaylists
            }
        
        case actionTypes.removeFromPlaylist:
            let playlistsAfterRemove = state.playlists.map(playlist => {
                if(playlist.name === payload.playlistName){
                    let updatedVideos = [...playlist.videos];
                    
                    let videoToRemoveIndex = playlist.videos.findIndex(singlevideo => singlevideo._id === payload.video._id);
                    // remove only if it exists
                    if(videoToRemoveIndex > -1){
                        updatedVideos.splice(videoToRemoveIndex, 1);
                    }
                    
                    return {  
                        ...playlist, 
                        videos: updatedVideos
                    }
                }
                return playlist;
            })

            return {
                ...state,
                playlists: playlistsAfterRemove
            }

        case actionTypes.addToSavedVideos:
            let savedVideosPlaylist = {...state.savedVideos}
            // add only if video didn't exist in playlist
            let videoIndex = savedVideosPlaylist.videos.findIndex(video => video._id === payload.video._id);
            if(videoIndex < 0){
                savedVideosPlaylist.push(payload.video)
            }
            
            return {
                ...state,
                savedVideos: savedVideosPlaylist
            }

        case actionTypes.removeFromSavedVideos:
            let savedVideosAfterRemove = {...state.savedVideos}
    
            let savedVideoToRemoveIndex = savedVideosAfterRemove.videos.findIndex(singlevideo => singlevideo._id === payload.video._id);
            // remove only if it exists
            if(savedVideoToRemoveIndex > -1){
                savedVideosAfterRemove.splice(savedVideoToRemoveIndex, 1);
            }

            return {
                ...state,
                savedVideos: savedVideosAfterRemove
            }

        case actionTypes.createPlaylist:
            let listOfPlaylists = [...state.playlists]
            listOfPlaylists.push(payload.playlist);

            return {
                ...state,
                playlists: listOfPlaylists
            }
        
        case actionTypes.deletePlaylist:
            let updatedListOfPlaylists = state.playlists.filter(playlist => {
                return playlist._id !== payload.playlist._id;
            })
            console.log('after delete: ', updatedListOfPlaylists);

            return {
                ...state,
                playlists: updatedListOfPlaylists
            }
        
        case actionTypes.resetPlaylists: 
            return {
                ...state,
                userId: "",
                playlists: [],
                savedVideos: {},
                likedVideos: {}
            }

        default:
            return state
    }
}

export default PlaylistsReducer;