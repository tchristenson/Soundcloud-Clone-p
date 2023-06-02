import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbumThunk } from "../../store/albums"
import { bulkCreateSongThunk } from "../../store/songs";
import './AlbumFormPage.css';


function AlbumFormPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    if (!sessionUser) {
      history.push('/')
    }
  }, [sessionUser, history])

  const [name, setName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [styleId, setStyleId] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [files, setFiles] = useState([])
  const inputRef = useRef()

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    // console.log('files state var', files)
    let currFileNames = []
    if (files.length) {
        files.forEach(file => currFileNames.push(file.name))
    }

    // console.log('currFileNames', currFileNames)
    // console.log('e.dataTransfer.files', e.dataTransfer.files)

    let filesArr = Object.values(e.dataTransfer.files)
    filesArr = filesArr.filter(file => !currFileNames.includes(file.name))
    // console.log('filesArr', filesArr)
    setFiles((prevFiles) => [...prevFiles, ...filesArr])

    // console.log('e.dataTransfer.files', e.dataTransfer.files)
    // const filesArr = Object.values(e.dataTransfer.files)
    // console.log('filesArr', filesArr)
    // setFiles(filesArr)
  }

  const handleCancel = (canceledFile) => {
    setFiles((prevFiles) => {
      const filteredFiles = Array.from(prevFiles).filter((file) => file !== canceledFile);
      return filteredFiles.length === 0 ? [] : filteredFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('files inside handleSubmit', files)
    // console.log('files[0]', files[0])
    // console.log('files[1]', files[1])

    // files.forEach(file => console.log('file.name', file.name))

    setHasSubmitted(true)
    if (validationErrors.length) return alert('Your Post has errors, cannot submit!')

    const albumFormData = new FormData()
    albumFormData.append('name', name)
    albumFormData.append('cover_image', coverImage)
    albumFormData.append('style_id', styleId)

    for (let key of albumFormData.entries()) {
    //   console.log(key[0] + '----->' + key[1]);
    }

    const newAlbum = await dispatch(createAlbumThunk(albumFormData))
    // console.log('newAlbum after awaiting dispatch ---->', newAlbum)


    for (let i = 0; i < files.length; i++) {
        const songFormData = new FormData()
        // console.log('newAlbum.coverImage', newAlbum.coverImage)
        let currFile = files[i]
        // console.log('currFile ------> ', currFile)
        songFormData.append('name', currFile.name)
        songFormData.append('content', currFile)
        songFormData.append('album_id', newAlbum.id)
        songFormData.append('cover_image', newAlbum.coverImage)
        songFormData.append('style_id', newAlbum.styleId)

        // for (let key of songFormData.entries()) {
        //     console.log('Inside SongForm: ' + key[0] + '----->' + key[1]);
        //   }

        const newSong = await dispatch(bulkCreateSongThunk(songFormData))
        // console.log('newly created song ------>', newSong)
    }

    setName('')
    setCoverImage('')
    setStyleId('')
    setValidationErrors([])
    setHasSubmitted(false)
    setFiles([])
     if(newAlbum) history.push(`/albums/${newAlbum.id}`)
  }

  useEffect(() => {
    const errors = [];
    // Only adding to the validation errors for fields that are nullable=False in the Song model
    if (!name) errors.push('Please enter a name!')
    if (!styleId) errors.push('Please enter a style!')
    if (!coverImage) errors.push('Please enter a coverImage!')
    if (!files) errors.push('Please provide at least one file!')
    setValidationErrors(errors)
  }, [name, styleId, coverImage, files])

  return (
    <div class="new-album-form">
        <h1 className="form-header">Create a New Album</h1>
              {/* <p>Note: The drag and drop feature is in process, so to create an album with
        songs on it you must select multiple song files at once and drag them onto the
         div tag that says "Drag and Drop Songs to Upload". You cannot drag and drop songs one by one
         and the songs cannot be inside of a folder. But as long as you  drop multiple files all together, the songs
         should simultaneously be created when creating the album. An actual song-length audio file could take a couple minutes  </p> */}
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
            <div className="form-input-box name-input album-name-input">
                <div><label className="album-name-label" for="name">Album Name:</label></div>
                <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required={true}
                    >
                </input>
            </div>

            <div className="form-input-box album-file-input">
                <div><label>Cover Image:</label></div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    required={true}
                    >
                </input>
            </div>

            <div className="form-input-box album-style-input">
                <div><label>Album Style:</label></div>
                <select required={true} onChange={(e) => setStyleId(e.target.value)}>
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

            <div className="form-input-box dropdown-input">
                {files && (
                    <>
                    <div className="uploads">
                        <ul>
                        {Array.from(files).map((file, idx) =>
                            <li key={idx}>
                            {file.name}
                            <button className="cancel-song" onClick={() => handleCancel(file)}>Cancel</button>
                            </li>)}
                        </ul>
                    </div>
                    </>
                )}

                <div
                className="dropzone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                >

                <label className="dropdown-text">Drag and Drop Songs to Upload</label>
                {/* <label>Or</label> */}
                <input className="song-dropdown"
                    type="file"
                    accept="audio/*"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    hidden
                    ref={inputRef}
                />
                {/* <button onClick={() => inputRef.current.click()}>Select Songs</button> */}
                </div>

            </div>

            <div className="four album-four">
                <button className="confirm-submit" type="submit">Create Album</button>
            </div>


        </form>
    </div>
)
}

export default AlbumFormPage
