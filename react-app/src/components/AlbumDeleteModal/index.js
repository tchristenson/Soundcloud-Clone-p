import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteAlbumThunk } from "../../store/albums";
import { useModal } from "../../context/Modal";
import './AlbumDeleteModal.css'

function AlbumDeleteModal({albumId}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault()

        const deletedAlbum = await dispatch(deleteAlbumThunk(albumId));
        if (deletedAlbum.message === 'delete successful') {
            console.log('if deletedAlbum running')
            console.log('deletedAlbum', deletedAlbum)
            history.push("/albums/current");
            closeModal();
        }
    }

    return (
        <div className="delete-album-div">
            <h1 className="modalText">Delete This Album?</h1>
            <form onSubmit={handleDelete}>
                <button className="confirm-album-delete" type="submit">Yes, delete the album</button>
                <button className="decline-album-delete" onClick={closeModal}>No, keep this album</button>
            </form>
        </div>
    )
}

export default AlbumDeleteModal;
