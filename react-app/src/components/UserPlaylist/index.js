import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUsersPlaylistsThunk } from "../../store/playlists";


function UsersPlaylistPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersPlaylistsThunk());
    }, [dispatch])

    const playlist = useSelector((state) => state.playlists);
    // console.log('user playlist inside UsersPlaylistPage', playlist)

    if (!playlist) return <h1>no playlist found</h1>;

    const playlistArr = Object.values(playlist)


    // console.log('playlist array object *******', playlistArr)
    const playlistList = playlistArr.map(playlist => (
        <div className="playlist-div">
            {/* <div className="playlist-pic-div">
                <img className="playlist-pic" src={playlist.coverImage} />
            </div> */}
            <div>
                <div>{playlist.name}</div>
                <div></div>
            </div>
        </div>
    ))

    return (
        <div>
        {playlistList}
        <div>hello</div>
        </div>
    )
}

export default UsersPlaylistPage;
