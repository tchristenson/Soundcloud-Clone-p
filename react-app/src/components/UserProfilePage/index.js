import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneUserThunk } from "../../store/users";
import { getAllAlbumsThunk } from "../../store/albums";
import { getAllSongsThunk } from "../../store/songs";
import './UserProfilePage.css';

function UserProfilePage() {
  const dispatch = useDispatch();
  //const profileUser = useSelector((state));
  const sessionUser = useSelector(state => state.session.user);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getOneUserThunk(userId));
    dispatch(getAllSongsThunk());
    dispatch(getAllAlbumsThunk())
  }, [userId, dispatch]);

  const user = useSelector((state) => state.users[userId]);
  const userAlbums = useSelector((state) => Object.values(state.albums));
  const userSongs = useSelector(state => Object.values(state.songs));

  const userAlbumsArr = [];
  const userSongsArr = [];

  for (let i = 0; i < userAlbums.length; i++) {
    if (userAlbums[i].ownerId === parseInt(userId)) {
      userAlbumsArr.push(userAlbums[i]);
    }
  }

  for (let i = 0; i < userSongs.length; i++) {
    if (userSongs[i].ownerId === parseInt(userId)) {
      userSongsArr.push(userSongs[i]);
    }
  }


  if (!user) {
    return null;
  }

  return (
    <div className="user-profile-page-div">
      <h1 className="user-profile-header">{user.alias}'s Profile Page</h1>

      <div className="user-main-details">
        <div className="user-image-div">
          <img className="user-image" src={user.profileImage}/>
        </div>
        
        <div className="user-text-details">
          <p className="user-text-username">{user.username}</p>
          <div className="user-text-full-name">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      {sessionUser && sessionUser.id === user.id && (
        <div className="user-profile-ui">
          <div>
            <NavLink className="user-profile-ui-link" to={`/songs/new`}>Create Song</NavLink>
          </div>

          <div>
            <NavLink className="user-profile-ui-link" to={`/albums/new`}>Create Album</NavLink>
          </div>
        </div>
      )}

      <div>
        <div>
          <h2 className="user-album-header">{user.alias}'s Albums</h2>
          <div className="user-albums-div">
            {userAlbumsArr?.map(({name, ownerId, coverImage, id}) => (
              <NavLink to={`/albums/${id}`} key={id}>
                <div className="user-album-div" key={id}>
                  <div className="user-album-pic-div">
                    <img className="user-album-pic" src={coverImage} />
                  </div>
                  <div className="user-album-name">{name}</div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <h2 className="user-song-header">{user.alias}'s Songs</h2>
          <div className="user-songs-div">
            {userSongsArr?.map(({name, ownerId, coverImage, id}) => (
              <NavLink to={`/songs/${id}`} key={id}>
                <div className="user-song-div" key={id}>
                  <div className="user-song-pic-div">
                    <img className="user-song-pic" src={coverImage} />
                  </div>
                  <div className="user-song-name">{name}</div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
