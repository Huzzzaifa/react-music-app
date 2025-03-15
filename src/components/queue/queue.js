import { React, useState } from "react";
import "./queue.css";

export default function Queue({ queue }) {

    const [currentTrack, setCurrentTrack] = useState();

    return (
        <div className="queue-container">
            {queue.map((track)=> (
                <div className="songs-column">
                    <div className="song" onClick={() => setCurrentTrack(track)}>                 
                        <div className="track-artist-name">
                            <strong className="track-name">{track.track.name}</strong>
                            <p className="artist-name">{track.track.artists[0].name || "Uknown Artist"}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}