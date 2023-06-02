import { useModal } from "../../context/Modal"
import { useState } from "react"
import { useDispatch } from "react-redux";

import { addSongToPlaylistThunk } from "../../store/songs"








function PlaylistModal({ playlists, song }) {
    const dispatch = useDispatch()
    const [playlistId, setPlaylistId] = useState(0)

    // console.log('playlistmodal playlists', playlists)
    const { closeModal } = useModal()

    const addToPlaylist = async (e) => {
        e.preventDefault();
        // console.log(playlistId);
        const playlistUpdate = await dispatch(addSongToPlaylistThunk(playlistId, song.id));
        if(playlistUpdate){
            closeModal()
        }
    }




    return (
        <form>
            <div>
                {playlists.map(playlist => (
                    <button key={playlist.id} value={playlist.id} onClick={ e => addToPlaylist(e)}>{playlist.name}
                    </button>



                ))}

            </div>
            </form>
    )

}
export default PlaylistModal
