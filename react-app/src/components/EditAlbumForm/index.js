import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneAlbumThunk } from "../../store/albums";
import { editAlbumThunk } from "../../store/albums";
import './EditAlbumForm.css';

const EditAlbumFormPage = () => {
  const {albumId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user)
  const album = useSelector(state => state.albums[albumId])

  useEffect(() => {
    if (album) {
      if (!sessionUser || sessionUser.id !== album.ownerId) {
        history.push('/')
      }
    }
  }, [album, sessionUser, history])

  const [name, setName] = useState("");
  const [styleId, setStyleId] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getOneAlbumThunk(albumId))
  }, [dispatch])

  useEffect(() => {
    if (album) {
      setName(album.name)
      setStyleId(album.styleId)
    }
  }, [album])

  useEffect(() => {
    const errors = [];
    // Only adding to the validation errors for fields that are nullable=False in the Song model
    if (!name) errors.push('Please enter a name!')
    if (!styleId) errors.push('Please enter a style!')
    setValidationErrors(errors)
  }, [name, styleId])

  if (!album) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    setHasSubmitted(true)
    if (validationErrors.length) return alert('Your Post has errors, cannot submit!')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('style_id', styleId)
    formData.append('id', album.id)

    const editedAlbum = await dispatch(editAlbumThunk(formData))

    setName('')
    setStyleId('')
    setValidationErrors([])
    setHasSubmitted(false)

    history.push(`/albums/${editedAlbum.id}`)

  }

  return (
    <div className="new-album-form">
        <h1 className="form-header edit-album-header">Update your Album</h1>
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
            className="new-album-form-details"
        >
            <div className="form-input-box name-input">
                <div><label for="name">Album Name:</label></div>
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

            <div className="form-input-box album-style-input">
                <div><label for="style">Album Style:</label></div>
                <select name="style" required={true} value={styleId} onChange={(e) => setStyleId(e.target.value)}>
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

            <div className="four album-four">
              <button className="confirm-submit" type="submit">Update Album</button>
            </div>
        </form>
    </div>
)

}

export default EditAlbumFormPage
