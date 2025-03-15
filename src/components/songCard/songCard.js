import {React, useEffect, useState} from "react";
import "./songCard.css";
import pauseButton from "../../images/pause-button.png";
import moveSongButton from "../../images/play-button.png";
import emptyTrack from "../../images/failed_to_load.png";
import { ColorExtractor } from "react-color-extractor";
import { motion } from "framer-motion";



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
                        { currentTrack.track.name.length < 34 ? currentTrack.track.name : 
                            <motion.div
                                className="current-song-title"
                                animate={{ x: [200, 200, 0] }} // Move right, then left, then reset
                                transition={{
                                    ease: "easeInOut",
                                    duration: 8, // Adjust speed
                                    repeat: Infinity, // Infinite loop
                                }}>
                                <span>{currentTrack.track.name}</span>
                            </motion.div>
                        }
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