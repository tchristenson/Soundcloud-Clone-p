import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUsersSongsThunk } from "../../store/songs";
import { getAllStylesThunk } from "../../store/styles";
import { getAllAlbumsThunk } from "../../store/albums";
import './UsersSongPage.css';


function UsersSongsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersSongsThunk());
        dispatch(getAllStylesThunk());
        dispatch(getAllAlbumsThunk());
    }, [dispatch]);

    const songs = useSelector((state) => Object.values(state.songs));
    const sessionUser = useSelector(state => state.session.user);

    const styles = useSelector(state => Object.values(state.styles));
    const albums = useSelector((state) => Object.values(state.albums));
    //console.log(sessionUser)
    //console.log(songs[0]);

    const albumIds = albums.map(album => {
      return album.name
    })

    const styleIds = styles.map(style =>
      style.genre)

    if(!songs) {
        return <h1>no current users songs found</h1>
    }

    return (
        // <div>
        //     <div>current users songs foundish</div>
        //     <div>{songs}</div>
        //     <h4>song name above?</h4>
        // </div>
        <div id="usersSongPage">
          <h1 className="user-songs-title">{sessionUser.username}'s Songs</h1>
        {songs?.map(({name,albumId, styleId, ownerId, runtime, coverImage, content, id})=>(
          <NavLink to={`/songs/${id}`} key={id}>
            <div className="song-div" key={id}>
              <div className="song-picture-div">
                <img className="song-picture" src={coverImage}/>
              </div>
              
              <div>
                <div className="playlogo"></div>
                <div className="song-name">Title: {name}</div>
                <div>Artist: {sessionUser.username}</div>
                <div>Genre: {styleIds[styleId - 1]}</div>
                <div>Album name: {albumIds[albumId - 1]}</div>
                {/* <div>wav thing</div> */}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    )
}

export default UsersSongsPage;
