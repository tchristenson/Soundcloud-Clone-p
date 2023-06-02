import { useDispatch } from "react-redux"
import { addLikeToSongThunk, deleteOneLikeThunk } from "../../store/songs"
import { useHistory } from "react-router-dom"
import './likecomponent.css'


function LikeComponent({song, sessionUser}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const addLikeEvent = (e) => {
        e.preventDefault();
        if (sessionUser) {
            dispatch(addLikeToSongThunk(song.id, sessionUser.id))
        }
    }
    const deleteLikeEvent = (e) => {
        e.preventDefault();
        if (sessionUser) {
            dispatch(deleteOneLikeThunk(song.id, sessionUser.id))
        }
    }

    // console.log("song info like component : ", song.likes)
    let present = <button className="like-btn" onClick={addLikeEvent}> <img className="like-btn2" alt="upvote" src="https://i.imgur.com/4ypwWHc.png"/> </button>
    if (song.likes > 0) {
        present = <button className="like-btn" onClick={deleteLikeEvent}><img className="like-btn2" alt="downvote" src="https://i.imgur.com/vIiU19b.png"/>  </button>
    }
    // console.log("present taTION info like component : ", present)

    return (
        <div className="likeDiv">
            {present}
            <p>{song.likes}</p>
        </div>)
}

export default LikeComponent
