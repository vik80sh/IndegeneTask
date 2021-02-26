import React from 'react'
import './popup.css'
const Popup = ({ handleClose, data,isPopup }) => {
    return <div className="popup-box">
        <div className="box">
           {isPopup && <span className="close-icon" onClick={handleClose}>x</span>}
            <div className="content">
                <figure>
                    <img src={data.Poster} alt="poster" />
                    <figcaption><b>{data.Title}</b></figcaption>
                </figure>
            </div>
            <div className="details">
                <p>Actors : {data.Actors}</p>
                <p>Director: {data.Director}</p>
                <p>Released: {data.Released}</p>
                <p>Rating: {data.imdbRating}</p>
                <p>{data.imdbRating>7 ? "boxoffice: hit":"boxoffice: flop"}</p>
            </div>
            <div>Plot: {data.Plot}</div>
        </div>
    </div>
}
export default Popup;
