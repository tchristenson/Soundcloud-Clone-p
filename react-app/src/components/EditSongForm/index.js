import SongFormPage from "../SongFormPage";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneSongThunk } from "../../store/songs";
import { getCurrentUsersAlbumsThunk } from "../../store/albums";
import { editSongThunk } from "../../store/songs";
import './EditSongForm.css'

const EditSongFormPage = () => {
  const {songId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  // console.log('songId inside EditSongFormPage', songId)

  const sessionUser = useSelector(state => state.session.user)
  const song = useSelector(state => state.songs[songId])
  // console.log('song inside EditSongFormPage', song)

  useEffect(() => {
    if (song) {
      if (!sessionUser || sessionUser.id !== song.ownerId) {
        history.push('/')
      }
    }
  }, [song, sessionUser, history])

  const [name, setName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState("") // Need this to prefill the album dropdown with the current album
  const [styleId, setStyleId] = useState(0); //Need this to prefill the style dropdown with the current album
//   const [coverImage, setCoverImage] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Maybe this would be easier just with a use selector instead
  // of an albums slice of state? Or add to the backend route to include albums when returning a song
  useEffect(() => {
    dispatch(getCurrentUsersAlbumsThunk())
    .then((data) => setAlbums(data))
    // console.log('albums inside of SongFormPage', albums)

    dispatch(getOneSongThunk(songId))

}, [dispatch])

  useEffect(() => {
    if (song) {
      setName(song.name)
      setSelectedAlbumId(song.albumId)
      setStyleId(song.styleId) // This isn't correctly filling in. Return album model with song from backend route?
    //   setSelectedAlbumId(song.albumId)
    //   setCoverImage(song.coverImage)
    }
  }, [song])

  useEffect(() => {
    const errors = [];
    // Only adding to the validation errors for fields that are nullable=False in the Song model
    if (!name) errors.push('Please enter a name!')
    if (!styleId) errors.push('Please enter a style!')
    setValidationErrors(errors)
}, [name, styleId])

  if (!song) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log('handleSubmit running on EditSongForm')

    setHasSubmitted(true)
    if (validationErrors.length) return alert('Your Post has errors, cannot submit!')

    // const payload = {
    //   name: name,
    //   album_id: selectedAlbumId,
    //   style_id: styleId,
    //   id: song.id
    // }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('album_id', selectedAlbumId)
    // formData.append('cover_image', coverImage)
    formData.append('style_id', styleId)
    formData.append('id', song.id)
    // console.log('formData inside handleSubmit', formData)
    // formData.append('content', song.content)

    for (let key of formData.entries()) {
      // console.log('is this hitting')
      // console.log('formData before sending to Thunk', '---', key[0] + '---' + key[1]);
  }
  // console.log('payload before sending to thunk', payload)

    const editedSong = await dispatch(editSongThunk(formData))

    setName('')
    setAlbums([])
    setSelectedAlbumId(0)
    setStyleId(0)
    // setCoverImage('')
    setValidationErrors([])
    setHasSubmitted(false)

    history.push(`/songs/${editedSong.id}`)

  }

  return (
    <div className="newSongForm">
        <h1 className="form-header edit-song-header">Update your Song</h1>
        {hasSubmitted && validationErrors.length > 0 && (
            <div>
                <h2>The following errors were found:</h2>
                <ul>
                    {validationErrors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
        )}
        <form
            onSubmit={(e) => handleSubmit(e)}
            encType="multipart/form-data"
            className="newSongFormDetails"
        >
            <div className="form-input-box name-input">
                  <div><label for="name">Song Name:</label></div>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required={true}
                >
                </input>
            </div>

            {/* <div className="form-input-box">
                <label>Cover Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    >
                </input>
            </div> */}
{/* defaultValue={albums?.Albums[selectedAlbumId]?.id} */}

            <div className="ui-portion three">
                      <div className="form-input-box album-input">
                          <div><label for="album">Album:</label></div>
                          <select name="album" required={true} value={selectedAlbumId} onChange={(e) => setSelectedAlbumId(e.target.value)}>
                              <option value="" disabled>{'(select one)'}</option>
                              <option key={null} value={null}>{`No Album`}</option>
                              {albums && albums.Albums && (albums.Albums.map((album, idx) => (
                                  <option key={album.id} value={album.id}>{album.name}</option>
                              )))}
                          </select>
                      </div>

                      <div className="form-input-box">
                          <div><label for="style">Song Style:</label></div>
                          <select name="style" required={true} onChange={(e) => setStyleId(e.target.value)}>
                              <option value="" disabled>{'(select one)'}</option>
                              <option value={1}>Reggae</option>
                              <option value={2}>Rock</option>
                              <option value={3}>Punk</option>
                              <option value={4}>Pop</option>
                              <option value={5}>Electronic</option>
                              <option value={6}>Jazz</option>
                              <option value={7}>Blues</option>
                              <option value={8}>Country</option>
                              <option value={9}>Metal</option>
                              <option value={10}>Folk</option>
                              <option value={11}>Funk</option>
                              <option value={12}>Soul</option>
                              <option value={13}>Classical</option>

                          </select>
                      </div>
              </div>

            <div className="four">
              <button className="confirm-submit" type="submit">Update Song</button>
            </div>

        </form>
    </div>
)
}

export default EditSongFormPage
