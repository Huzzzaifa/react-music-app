import {React, useEffect, useState} from "react";
import "./songCard.css";
import pauseButton from "../../images/pause-button.png";
import moveSongButton from "../../images/play-button.png";
import emptyTrack from "../../images/failed_to_load.png";
import { ColorExtractor } from "react-color-extractor";



export default function SongCard({ currentTrack }) {

    const [cardColour, setCardColour] = useState();

    return (
        <div>
            {currentTrack ?

                <div 
                    style={{
                        background: `linear-gradient(180deg, ${cardColour} 80%, rgba(30, 30, 30, 0.2))`
                    }}
                    className="songcard-container">
                    <ColorExtractor getColors={colors => setCardColour(colors[0])}>
                        <img 
                            className="current-song-cover"
                            src={currentTrack.track.album.images[0].url}>
                        </img>
                    </ColorExtractor>
                    <h2 className="current-song-title">
                        { currentTrack.track.name.length < 34 ? 
                            currentTrack.track.name : 
                            currentTrack.track.name.slice(0, 34) + "..."}
                    </h2>
                    <p className="current-track-artist">
                        {currentTrack.track.artists[0].name}
                    </p>
                    <div className="btn-row">
                        <img 
                            className="prev-song-btn"
                            src={moveSongButton} />
                        <img
                            className="current-song-play-btn"
                            src={pauseButton} />
                        <img
                            className="next-song-btn"
                            src={moveSongButton} />
                    </div>
                </div>

                    :
                
                <div className="songcard-container">
                    <img 
                        className="current-song-cover"
                        src={emptyTrack}>
                    </img>
                </div>
            }
        </div>
    );
}