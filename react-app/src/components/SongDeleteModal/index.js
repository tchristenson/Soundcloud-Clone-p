import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOneSongThunk } from "../../store/songs";
import { useModal } from "../../context/Modal";
import './SongDeleteModal.css';

function SongDeleteModal({songId}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault()

    const deletedSong = await dispatch(deleteOneSongThunk(songId))
    if (deletedSong.message === 'delete successful') {
      // console.log('if deletedSong running')
      // console.log('deletedSong', deletedSong)
      history.push("/songs/current");
      closeModal();
    }
  }

  return (
    <div className="delete-song-div">
        <h1 className="modalText">Delete This Song?</h1>
        <form onSubmit={handleDelete}>
            <button className="confirm-song-delete" type="submit">Yes, delete the song</button>
            <button className="decline-song-delete" onClick={closeModal}>No, keep this song</button>
        </form>
    </div>
)
}

export default SongDeleteModal
