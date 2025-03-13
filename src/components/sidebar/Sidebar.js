import React from "react";
import './sidebar.css';
import profilePic from './profile-pic.jpeg';
import './SidebarButton';
import SidebarButton from "./SidebarButton";
import { MdFavorite } from 'react-icons/md';
import { FaGripfire, FaPlay } from 'react-icons/fa';
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { useEffect, useState } from "react";
import apiClient from "../../spotify";

export default function Sidebar() {
    const [image, setImage] = useState({profilePic});
    useEffect(() => {
        apiClient.get("me").then((response) => {
            setImage(response.data.images[0].url)
})}, [])
    return (
      <div className="sidebar-container">
            <img 
            src={image}
            alt="profile-pic"
            className="profile-img">
           </img>

           <div>
               <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />}/>
               <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />}/>
               <SidebarButton title="Player" to="/player" icon={<FaPlay />}/>
               <SidebarButton title="Favorites" to="/favourites" icon={<MdFavorite />}/>
               <SidebarButton title="Library" to="/" icon={<IoLibrary />}/>
           </div>
           <SidebarButton
           title="Sign Out" 
           to="" 
           icon={<FaSignOutAlt/>} />
           </div>
    )
}