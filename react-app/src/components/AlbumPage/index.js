import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams, Link, useHistory } from "react-router-dom"
import { useEffect } from "react"
import { getOneAlbumThunk } from "../../store/albums";
import { getAllSongsThunk } from "../../store/songs";
import AlbumDeleteModal from "../AlbumDeleteModal";
import OpenModalButton from "../OpenModalButton";
import './AlbumPage.css';
import AudioPlayer from "../ReactAudioPlayer/AudioPlayer";
import { getAllUsersThunk } from "../../store/users";
import { getAllStylesThunk } from "../../store/styles";

function AlbumPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { albumId } = useParams();

  const songs = useSelector(state => Object.values(state.songs));
  const users = useSelector(state => Object.values(state.users))
  const songsArr = Object.values(songs);
  const styles = useSelector(state => Object.values(state.styles))
  const albumSongs = [];
  const styleIds = styles.map(style =>
    style.genre)

  useEffect(() => {
    dispatch(getOneAlbumThunk(albumId))
    dispatch(getAllSongsThunk());
    dispatch(getAllUsersThunk())
    dispatch(getAllStylesThunk())
  }, [albumId, dispatch])

  const album = useSelector(state => state.albums[albumId]);
  const user = users.map(user => user?.alias)



  for (let i = 0; i < songsArr.length; i++) {
    if (songsArr[i].albumId === parseInt(albumId)) {
      albumSongs.push(songsArr[i]);
    }
  }

  if (!album) return null;
  if(!user ) return null
  return (
    <div className="album-page-div">
      <h1 className="album-name-header">{album.name}</h1>

      <div className="album-details-1">
        <div className="album-page-pic-div">
          <img alt="img" className="album-page-pic" src={album.coverImage} />
        </div>

        <div>
          <div><a href={`/users/${album.ownerId}`}>By {users[album.ownerId - 1]?.username}</a></div>
          <div>Number of tracks: {albumSongs.length}</div>
          <div>Genre: {styleIds[album.styleId - 1]}</div>
        </div>
      </div>

      <div>
        <h2 className="album-song-header">Songs in {album.name}</h2>
        <div className="album-songs-div">
          {albumSongs?.map(({name, albumId, styleId, ownerId, coverImage, id, content}) => (
            <NavLink to={`/songs/${id}`} key={id}>
              <div className="album-song-div" key={id}>
                <div className="album-song-pic-div">
                  <img alt="img" className="album-song-pic" src={coverImage} />
                </div>
                <div className="album-song-name">{name}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {sessionUser && sessionUser.id === album.ownerId && (
        <div className="album-user-settings">
          <h2 className="album-user-settings-header">Album Settings</h2>
          <div className="album-user-settings-ui">
            <OpenModalButton buttonClass="album-user-settings-del" buttonText="Delete Album" modalComponent={<AlbumDeleteModal albumId = {albumId}/>} />
            
            <button className="album-user-settings-edit" onClick={() => history.push(`/albums/${album.id}/edit`)}>Edit Album</button>
            
          </div>
        </div>
      )}
    </div>
  )
}

export default AlbumPage;
