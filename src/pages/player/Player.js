import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard/songCard";
import Queue from "../../components/queue/queue";
import error_rendering_logo from '../../images/failed_to_load.png';
import { motion } from "framer-motion";

export default function Player() {
    const location = useLocation();
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState();
    const [currentIndex, setCurrentIndex] = useState();
    const [playlist, setPlaylist] = useState([]);
    const [showSongCard, setShowSongCard] = useState(false);
    const [queue, setQueue] = useState(false);

    useEffect(() => {
      if (location.state) {
        apiClient.get("playlists/" + location.state?.id)
          .then(res => {
            if (res.data?.tracks?.items) {
              setTracks(res.data.tracks.items);
              setPlaylist(res.data);
            } else {
              console.error("Unexpected API response structure:", res.data);
            }
          })
          .catch(error => {
            console.error("Error fetching playlist:", error);
          });
        }
    }, [location.state]);

    useEffect(() => {
          setQueue(tracks.slice(currentIndex + 1, tracks.length));
      }, [currentIndex])
    
    return (
      <>
      
      <div className="screen-container flex">
        <div className="left-player-body">
          <div className="playlist-details">
            <img 
              className="playlist-cover"
              src={playlist.images?.[0]?.url || error_rendering_logo}
              alt={error_rendering_logo}>
            </img>
            <h1 className="playlist-name">{playlist.name}</h1>
            <p className="playlist-description">{playlist.description}</p>
          </div>
          {tracks.map((track, index)=> (
            <div className="songs-column">
              <div className="song" onClick={() => {
                  setCurrentTrack(track);
                  setCurrentIndex(index) 
                  setShowSongCard(true);
                  }}>
                  <img 
                    className="album-cover"
                    src={track.track.album.images?.[2]?.url || {error_rendering_logo}}>
                  </img>                  
                  <div className="track-artist-name">
                    <strong className="track-name">{track.track.name}</strong>
                    <p className="artist-name">{track.track.artists[0].name || "Uknown Artist"}</p>
                  </div>
              </div>
            </div>
          ))}
        </div>
        {showSongCard &&
        <motion.div
            className="right-player-body"
            initial={{ x: "100%" }}
            animate={{ x: showSongCard ? "0%" : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut"}}
        >
            <div className="songcard">
              <SongCard currentTrack={currentTrack}/>
            </div>
            {/*<h1>{tracks.indexOf(currentTrack)}</h1>
            <h1>{tracks.length}</h1>*/}
            <Queue queue={queue}/>
            <h1>{currentIndex}</h1>
        </motion.div>
        }
      </div>
    </>
    );
}