// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// // import { getCurrentUsersPlaylistsThunk } from "../../store/playlists"
// import OpenModalButton from "../OpenModalButton";
// // import PlaylistModal from "../PlaylistModal";





// function AddToPlaylistButton({ song }) {
//     const dispatch = useDispatch()
//     const playlists = useSelector(state => Object.values(state.playlists))

//     useEffect(() => {
//         dispatch(getCurrentUsersPlaylistsThunk())
//     }, [dispatch])

//     // const addToPlaylist = () => {


//     //     return (<select>
//     //         {playlists.map(playlist =>(
//     //             <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
//     //     ))}
//     //     </select>)
//     // }

//     console.log('Playlists', playlists)


//     return <>
//         <OpenModalButton buttonClass="add-to-pl-btn" buttonText="Add to playlist" modalComponent={<PlaylistModal playlists={playlists} song={song} />} />
//     </>
// }

// export default AddToPlaylistButton
