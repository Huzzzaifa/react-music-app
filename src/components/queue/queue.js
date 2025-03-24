import { React } from "react";
import "./queue.scss";

export default function Queue({ queue, setCurrentIndex, setCurrentTrack }) {

    return (
        <div className="queue-container">
            <div className="songs-column">
                {queue.map((track, index)=> (
                    <div className="song" onClick={() => {
                        setCurrentTrack(track);
                        setCurrentIndex(index);
                        }}>           
                        <div className="track-artist-name">
                            <strong className="track-name">{track.track.name}</strong>
                            <p className="artist-name">{track.track.artists[0].name || "Uknown Artist"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}