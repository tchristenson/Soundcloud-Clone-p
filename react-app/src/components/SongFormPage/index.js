import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSongThunk } from "../../store/songs";
import { getCurrentUsersAlbumsThunk } from "../../store/albums"
import {BarLoader} from "react-spinners"
import './songFormPage.css'

function SongFormPage() {

    const dispatch = useDispatch();
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        if (!sessionUser) {
          history.push('/')
        }
      }, [sessionUser, history])

    useEffect(() => {
        // console.log('useEffect running in SongFormPage to get current users albums')
        dispatch(getCurrentUsersAlbumsThunk())
        .then((data) => {
            setAlbums(data);
            // console.log('useEffect complete. Here are the users albums ======>', albums)
        })
    }, [dispatch])

    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [albums, setAlbums] = useState([]);
    const [selectedAlbumId, setSelectedAlbumId] = useState("") // Need to find a way to set this to the album name via redux or prop threading/context
    const [styleId, setStyleId] = useState(0); // Need to find a way to set this to the style name via redux or prop threading/context
    const [coverImage, setCoverImage] = useState("")
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)
        if (validationErrors.length) return alert('Your Post has errors, cannot submit!')

        const formData = new FormData()
        formData.append('name', name)
        formData.append('content', content)
        formData.append('album_id', selectedAlbumId)
        formData.append('cover_image', coverImage)
        formData.append('style_id', styleId)

        for (let key of formData.entries()) {
            // console.log(key[0] + '----->' + key[1]);
        }

        const newSong = await dispatch(createSongThunk(formData))

        setName('')
        setContent('')
        setAlbums([])
        setSelectedAlbumId(0)
        setStyleId(0)
        setCoverImage('')
        setValidationErrors([])
        setHasSubmitted(false)

        history.push(`/songs/${newSong.id}`)
    }

    useEffect(() => {
        const errors = [];
        // Only adding to the validation errors for fields that are nullable=False in the Song model
        if (!name) errors.push('Please enter a name!')
        if (!content) errors.push('Please provide an audio file!')
        if (!coverImage) errors.push('Please provide an image file!')
        if (!styleId) errors.push('Please enter a style!')
        // if (!selectedAlbumId) errors.push('Please enter album details!')
        setValidationErrors(errors)
    }, [name, content, styleId, coverImage, selectedAlbumId])

    return (
        <div className="newSongForm">
            <h1 className="form-header">Create a New Song</h1>
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
            <div className="loadingArea">
                {hasSubmitted &&  validationErrors.length === 0 &&(
                    <BarLoader color="#36d7b7" className="loadingBar" />
                )}
            </div>
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

                <div className="ui-portion two">
                    <div className="form-input-box">
                        <div><label for="image">Cover Image:</label></div>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => setCoverImage(e.target.files[0])}
                            required={true}
                            >
                        </input>
                    </div>

                    <div className="form-input-box">
                        <div><label for="audio">Audio File:</label></div>
                        <input
                            type="file"
                            name="audio"
                            accept="audio/*"
                            onChange={(e) => setContent(e.target.files[0])}
                            required={true}
                            >
                        </input>
                    </div>
                </div>

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
                    <button className="confirm-submit" type="submit">Create Song</button>
                </div>
            </form>
        </div>
    )
}

export default SongFormPage
