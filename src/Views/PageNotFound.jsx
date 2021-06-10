import React from 'react'
import pageNotFoundImage from '../../public/pageBurnt.png';
import {Link, useNavigate} from 'react-router-dom';

export default function PageNotFound() {
    let navigate = useNavigate();

    return (
        <div className="mb24 displayFlex flexCol justifyCenter itemsCenter">
            <img src={pageNotFoundImage} alt="Page not found" className=" mb4" style={{width: "200px", margin: "auto"}} />
            <h2 className="fontSemiBold textLg mb2">This page is burnt to crisp!</h2>
            <p className="textGray4 mb1">The page you are looking for, cannot be found.</p>
            <p className="textGray4 mb1">Here are some helpful links instead.</p>
            
            <div className="displayFlex itemsCenter mt4">
                <button className="bgTransparent border borderBlue4 pl4 pr4 pt2 pb2 rounded textBlue6 hover:bgBlue2 mr8" onClick={() => navigate(-1)}>Back</button>
                <Link to="/" className="link-button bgBlue4 pl4 pr4 pt2 pb2 rounded textWhite hover:textWhite hover:bgBlue6">Home</Link>
            </div>
        </div>
    )
}
