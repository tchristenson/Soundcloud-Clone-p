import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { createPlaylistThunk } from "../../store/playlists";











function PlaylistFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const songs = useSelector(state => Object.values(state.songs))
    const [name, setName] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // console.log("this is my userrrrrr", user)



    const handleSubmit = async (e) => {
        e.preventDefault()


        const playlistData = new FormData()

        setHasSubmitted(true)
        if (validationErrors.length) return alert('Your Playlist has errors, cannot submit!')

        playlistData.append('name', name)
        playlistData.append('owner_id', user.id)
        // const newPlaylist = await dispatch(createPlaylistThunk(playlistData))

        setName('')
        setValidationErrors([])
        setHasSubmitted(false)

        history.push(`/songs`)



    }


    return <>
        <form onSubmit={e => handleSubmit(e)} encType="multipart/form-data">

            <div className="form-input-box">
                <label>Playlist Name:</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required={true}
                >
                </input>
            </div>


            <button type="submit">Create Playlist</button>
        </form  >
    </>





}

export default PlaylistFormPage
