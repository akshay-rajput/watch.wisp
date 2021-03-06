import React from 'react'
import {usePlaylists} from '../Store/PlaylistsContext';
import {useAuth} from '../Store/AuthContext';
import PlaylistCard from '../Components/Playlists/PlaylistCard';
import {Link} from 'react-router-dom';
import nodataImage from '../../public/nodata.svg';
import styles from './Search.module.css';

export default function Playlists() {
    const {authState, authDispatch} = useAuth();
    // get all playlist names from context
    const {playlistsState, playlistsDispatch} = usePlaylists();

    return (
        <div>
            {
                authState.token && playlistsState.playlists ? 
                <div className="displayGrid gridCols1 md:gridCols4 gridGap4 mb12">
                    <div className="md:gridColSpan4 mb4">
                        <h2 className="displayFlex itemsCenter">
                            Playlists <small className="ml1 textRg textGray4">({playlistsState.playlists.length})</small>
                        </h2>
                        {
                            playlistsState.playlists.length > 1 && 
                            <p className="mt2 textSm textGray4">
                                You can edit your playlists here. Default Playlists cannot be edited. 
                            </p>
                        }
                    </div>
                    {
                        playlistsState.playlists.length > 0 ? 
                        
                        playlistsState.playlists.map(playlist => {
                            return(
                                <PlaylistCard playlistData = {playlist} key={playlist._id} />
                            )
                        })
                        :
                        <div className="md:gridColSpan4 displayFlex flexCol justifyCenter itemsCenter p8">
                            <img src={nodataImage} alt="No data" className={`${styles.nodata} mt4`} />

                            <div className="mt6 textCenter">
                                <h4 className="textGray4 textMd mb2">No playlists</h4>
                                <span className="textGray4">You have not created any playlists yet.</span>
                            </div>
                        </div>
                    }
                    
                </div>
                :
                <div className="textCenter pt8 pb8">
                    <h3 className="textLg mb2">
                        Login required
                    </h3>
                    <p className="mb8 textSm textGray4">You need to be logged in to view playlists.</p>
                    <Link to="/login" className="link-button pt2 pb2 pl4 pr4 hover:textBlue5 hover:bgBlue3 mr6 rounded bgBlue5 textWhite">Login</Link>
                    <Link to="/signup" className="link-button pt2 pb2 pl4 pr4 rounded bgBlue2 textBlue6">Signup</Link>
                </div>
            }
        </div>
    )
}
