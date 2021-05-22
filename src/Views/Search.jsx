import React, {useState} from 'react'
import styles from './Search.module.css';
import {MdSearch} from 'react-icons/md';
import {ImSpinner9} from 'react-icons/im';
import nodataImage from '../../public/nodata.svg';
import axios from 'axios';
import SearchResultCard from '../Components/SearchResultCard';

export default function Search() {
    const initialState = {
        loading: false,
        error: null,
        query: ''
    }

    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [searchState, setSearchState] = useState(initialState)

    async function searchHandler(event){
        event.preventDefault();

        setSearchState({
            ...searchState,
            loading: true
        })

        console.log("searching.. ", searchQuery);
        try{
            const response = await axios.get(`https://watch-wisp.herokuapp.com/search?q=${searchQuery}`);
            console.log('response of search: ', response);
            
            let videoList = response.data.videos;
            
            if(videoList?.length > 0){
                // sort by views by default
                videoList.sort((a,b) => {
                    return b.views - a.views
                })

                setResults(videoList);

                setSearchState({
                    ...searchState,
                    loading: false,
                    error: null,
                    query: response.data.queryPassed
                })
            }
            else{
                // reset results
                setResults([]);

                setSearchState({
                    ...searchState,
                    loading: false,
                    error: response.data.message
                })
            }
        }
        catch(error){
            console.log('error in search: ', error);
        
            setSearchState({
                ...searchState,
                error: error.message,
                loading: false
            })
        }
    }
    function handleInput(event){
        setSearchQuery(event.target.value);

        // reset results
        setResults([]);

        // reset any errors if input empty
        if(event.target.value == ''){
            setSearchState({
                ...searchState,
                error: null,
                loading:false
            })
        }
    }

    function sortResults(event){
        console.log('sort by: ', event.target.value);
        
        let videoList = [...results]
            
        if(event.target.value == 'views'){
            // sort by views
            videoList.sort((a,b) => {
                return b.views - a.views
            })
            setResults(videoList)
        }else{
            // sort by likes
            videoList.sort((a,b) => {
                return b.likes - a.likes
            })
            setResults(videoList)
        }
    }

    return (
        <div className={`displayFlex flexCol md:mt8`}>
            <form onSubmit={searchHandler} className={`${styles.search_form}`}>
                <label className="textXs textGray4 flexGrow displayFlex flexCol" >
                    Search
                    <input type="search" name="q" id="search_query" 
                            onChange={handleInput} value={searchQuery}
                            placeholder="Search video" className={`${styles.search_input} p2 textMd md:textLg rounded border borderGray3 mt1`}/>
                </label>

                <button className=" pt2 pb1 pl2 pr2 bgBlue2 textMd md:textLg rounded borderNone" title="Search">
                    {   searchState.loading ?
                        <ImSpinner9 className={`${styles.loadingIcon} mt1`} /> :
                        <MdSearch className={"mt1"} />
                    }
                </button>
            </form>
            
            {   searchState.error && 
                <div className="displayFlex flexCol justifyCenter itemsCenter p8">
                    <img src={nodataImage} alt="No data" className={`${styles.nodata} mt4`} />

                    <div className="mt6 textCenter">
                        <h4 className="textGray4 textMd mb2">No Results Found</h4>
                        <span className="textGray4">We couldn't find any videos based on your search</span>
                    </div>
                </div>
            }


            {
                searchQuery == '' && 
                <div className="displayFlex flexCol textCenter mt8 md:mt20 p8">
                    <span className="text3Xl textGray3">◔_◔</span>
                    <span className="mt4 textGray4">Enter some text above to search</span>
                </div>
            }
            {/* show results */}
            {
                results.length > 0 &&
                <>
                    <div className="displayGrid gridCols12 itemsCenter mt4 mb4 md:mt12">
                        <span className="gridColSpan7 md:gridColSpan9 pt2 pb2">
                            Showing {results.length} results for {searchState.query}
                        </span>

                        <label className="gridColSpan5 md:gridColSpan3 displayFlex itemsCenter pt2 pb2" style={{justifyContent: "flex-end"}}>
                            Sort by 
                            <select name="" id="" onChange={sortResults} className="ml2 rounded p1">
                                <option value="views">Views</option>
                                <option value="likes">Likes</option>
                            </select>
                        </label>
                    </div>

                    <div className="displayGrid gridCols2">
                        {/* videolist */}
                        {
                            results.map(result => {
                                return (
                                    <SearchResultCard key={result.id} video={result} />
                                )
                            })
                        }
                    </div>
                </>
                
            }
        </div>
    )
}
