import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllSongsThunk } from "../../store/songs";
import './SongPage.css'
import { getAllUsersThunk } from "../../store/users";
import AddToPlaylistButton from "../AddToPlaylistButton";
import { getAllAlbumsThunk } from "../../store/albums";
import { getAllStylesThunk } from "../../store/styles";


function SongPage() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("")

  useEffect(() => {
    dispatch(getAllSongsThunk());
    dispatch(getAllUsersThunk());
    dispatch(getAllAlbumsThunk());
    dispatch(getAllStylesThunk());
  }, [dispatch]);

  const songs = useSelector((state) => Object.values(state.songs));
  const users = useSelector((state) => (state.users));
  const albums = useSelector((state) => Object.values(state.albums))
  const styles = useSelector(state => Object.values(state.styles))


  const userIds = songs.map((song) => {
    return song.ownerId
  })
  const songUsers = userIds.map(id => {
    return users[id]?.alias
  })

  const albumIds = albums.map(album => {
    return album.name
  })

  const styleIds = styles.map(style =>
    style.genre)

  const songUsers2 = songs.map((val, index) => {
    const username = songUsers[index]
    // console.log("this is the styles========", styles)
    return (<>
      <a className='artistName' href={`/users/${val.ownerId}`}>{username}</a>
    </>)
  })

  // console.log("alubbbbbbbbbbbbums", albumIds)

  if (!songs || !users) {
    return <h1>testerrrrr</h1>;
  }
  return (
    <div id="songPage">
      <h1>Find Songs By Song Name</h1>
      <input id="searchBar" placeholder="Enter Song Name" onChange={event => setQuery(event.target.value)} />
      {songs?.filter(song => {
        if (query === '') {
          return song;
        } else if (song.name.toLowerCase().includes(query.toLocaleLowerCase())) {
          return song
        } //else if (validUsers.toLowerCase().includes(query.toLocaleLowerCase())) {
        // return song
        //}
      }).map(({ name, albumId, styleId, ownerId, runtime, coverImage, content, id }) => (
        <NavLink to={`/songs/${id}`} key={id}>
          <div className="song-div">
            <div className="song-picture-div">
              <img alt='songImage' className="song-picture" src={coverImage} />
            </div>

            <div>
              <div className="playlogo"></div>
              <div className="song-name">Title: {name}</div>
              <div>Artist: {songUsers2[id - 1]}  </div>
              <div>Genre: {styleIds[styleId - 1]}</div>
              <div>Album name: {albumIds[albumId - 1]} </div>

            </div>
            {/* <AddToPlaylistButton /> */}
          </div>
        </NavLink>
      ))}

    </div>
  );
}

export default SongPage;
