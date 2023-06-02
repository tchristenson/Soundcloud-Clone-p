import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getAllAlbumsThunk } from "../../store/albums"
import { NavLink } from "react-router-dom"
import './AllAlbums.css';
import { getAllUsersThunk } from "../../store/users";
import { getAllStylesThunk } from "../../store/styles";
import { getAllSongsThunk } from "../../store/songs";
import OpenModalButton from "../OpenModalButton";
import AlbumFormPage from "../AlbumFormPage";

function AllAlbums() {

  const dispatch = useDispatch()
  const [query, setQuery] = useState("")

  useEffect(() => {
    dispatch(getAllAlbumsThunk())
    dispatch(getAllUsersThunk())
    dispatch(getAllStylesThunk())
    dispatch(getAllSongsThunk())
  }, [dispatch])

  const albums = useSelector(state => state.albums)
  const users = useSelector(state => state.users)
  const styles = useSelector(state => Object.values(state.styles))
  const songs = useSelector(state => Object.values(state.songs))


  const songAlbumIds = songs.map(song => song.name)


  const styleIds = styles.map(style =>
    style.genre)
  // console.log("USERRSSSSSS", users)
  if (!albums) return null

  const albumsArr = Object.values(albums)


  // const albumList = albumsArr.map(album => (
  //   <NavLink to={`/albums/${album.id}`}>
  //     <div className="album-div">
  //       <div className="album-pic-div">
  //         <img className="album-pic" src={album.coverImage} />
  //       </div>
  //       <div>
  //         <div>{album.name}</div>
  //         <div></div>
  //       </div>
  //     </div>

  //   </NavLink>
  // ))

  return (
    <div id="albumPage">
      <h1>Find Albums By Album Name</h1>
      <input id="searchBar" placeholder="Enter Album Name" onChange={event => setQuery(event.target.value)}/>
      {albumsArr?.filter(album => {
        if (query === '') {
          return album;
      } else if (album.name.toLowerCase().includes(query.toLocaleLowerCase())) {
          return album
      }
      }).map(album => (
        <NavLink to={`/albums/${album.id}`}>
          <div className="album-div">
            <div className="album-pic-div">
              <img alt='' className="album-pic" src={album.coverImage} />
            </div>
            <div>
              <div>{album.name}</div>
              <div>alias: {users[album.ownerId]?.alias}</div> <div>Genre: {styleIds[album.styleId - 1]?.toUpperCase()}</div>
            </div>
          </div>

        </NavLink>
      ))}
    </div>
  )
}

export default AllAlbums
