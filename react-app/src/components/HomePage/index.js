import React, { useState } from "react";
import { getAllSongsThunk } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../store/users";
import AudioPlayer from "../ReactAudioPlayer/AudioPlayer";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import LikeComponent from "../LikeComponent";
import { useHistory } from "react-router-dom";
import "./homepage.css";

import { useEffect } from "react";
import { faker } from "@faker-js/faker";
import SongFormPage from "../SongFormPage";

function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('')
  const songs = useSelector((state) => Object.values(state.songs));
  const users = useSelector((state) => (state.users));
  const sessionUser = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(getAllSongsThunk());
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const userIds = songs.map((song) => {
    return song.ownerId;
  });


  const songUsers = userIds.map(id => {
    return users[id]?.alias
    // return songs.map(song =>{
    // return (users[id].id === song.ownerId ? (<p>{users[id].alias}</p>) : null)
    // })
  })
  // console.log("songs", songUsers)

  const songUsers2 = songs.map((val, index) => {
    const username = songUsers[index]
    // console.log("this is the song content========", username)
    return (<>
      <a className='songLink' href={`/users/${val.ownerId}`}>{username}</a>
    </>)
  })

  if (!songs || !songUsers) {
    return <h1>testerrrrr</h1>;
  }

  return (

    <main id="homePage">
      <div>
        <img alt="placeholder" src={'https://cdn.pixabay.com/photo/2015/12/27/05/48/turntable-1109588_960_720.jpg'} className="mainImage" />
      </div>
      <div className='inputDiv'>
        <input type="search" placeholder="Search for songs" size={"50"} onChange={event => setQuery(event.target.value)}></input> or {' '}
        {!sessionUser ? (<OpenModalButton buttonText="Upload your Song" onItemClick="" modalComponent={<LoginFormModal />} />) : (<button onClick={() => history.push('/songs/new')}>Upload Your Song</button>)}
      </div>
      <h2>Hear what's trending for free in the Vibillow community</h2>
      <div id="songContainer">
        {songs?.filter(song => {
          if (query === '') {
            return song;
          } else if (song.name.toLowerCase().includes(query.toLocaleLowerCase())) {
            return song
          } //else if (song.ownerId == )
        }).map((song) => (
          <div className="songDiv" key={song.id}>
            <a className="songLink" href={`/songs/${song.id}`}>
              <img className="songImage" alt="" src={song.coverImage} />
              <p id='songNameHome'>{song.name}</p>
            </a>
            {songUsers2[song.id - 1]}
            {<LikeComponent song={song} sessionUser={sessionUser} />}

          </div>

        ))}{" "}
      </div>
      {/* {sessionUser ? <a href={`/songs`}><button>Explore trending playlists</button> </a> : <OpenModalButton buttonText="Explore trending playlists" onItemClick="" modalComponent={<LoginFormModal />} />} */}
      <section>
        <h2>Vibillow is an app where you can upload and listen to songs and albums.</h2>
      </section>
      <footer> <h2>Meet the contributers of Vibillow</h2>
        <a href="https://github.com/tchristenson">Tommy Christenson</a>{' '}
        <a href="https://github.com/anwersaad0">Saad Anwer</a>{' '}
        <a href="https://github.com/meyermatt22">Matt Meyer</a>{' '}
        <a href="https://github.com/sousyoshi">Joshua Johnson</a>
      </footer>
    </main>

  );
}
export default HomePage;
