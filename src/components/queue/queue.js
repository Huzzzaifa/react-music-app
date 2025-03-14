import React from "react";
import "./queue.css";

export default function Queue({ queue }) {
    console.log(queue)
    return (
        <div className="queue-container">
            {queue.map((track, index)=> (
                <div className="songs-column">
                    <div className="song">                 
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