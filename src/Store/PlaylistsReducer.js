
const actionTypes = {
    getAllPlaylists: "GET_ALL_PLAYLISTS",
    addToPlaylist: 'ADD_TO_PLAYLIST',
    removeFromPlaylist: "REMOVE_FROM_PLAYLIST",
    createPlaylist: "CREATE_PLAYLIST",
    deletePlaylist: "DELETE_PLAYLIST"
}

export const initialState = {
    userId: '',
    playlists: []
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
                playlists: payload.playlists
            }
        
        case actionTypes.addToPlaylist:
            let updatedPlaylists = state.playlists.map(playlist => {
                if(playlist.name === payload.playlistName){
                    return {  
                        ...playlist, 
                        videos: [ ...playlist.videos, payload.videoId ]
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
                    updatedVideos.splice(playlist.videos.indexOf(payload.videoId), 1);
                    
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
            
        case actionTypes.createPlaylist:
            console.log('creating playlist')
            break;
        

        case actionTypes.deletePlaylist:
            console.log('delete playlist')
            break;
            
        default:
            return state
    }
}

export default PlaylistsReducer;