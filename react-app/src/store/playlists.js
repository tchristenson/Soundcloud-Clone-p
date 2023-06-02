const GET_USER_PLAYLISTS = 'playlists/GET_USER_PLAYLISTS'
const CREATE_PLAYLIST = 'playlist/CREATE_PLAYLIST'


const getUserplaylistsAction = (playlists) => {
    return {
      type: GET_USER_PLAYLISTS,
      playlists
    }
  }

  const createPlaylistAction = (playlist) => {
    return {
      type: CREATE_PLAYLIST,
      playlist
    }
  }





export const getCurrentUsersPlaylistsThunk = () => async (dispatch) => {
  console.log('getCurrentUsersPlaylistsThunk running')
  const response = await fetch('/api/playlists/current');
  if (response.ok) {
    const userPlaylists = await response.json();
    // console.log('userplaylists inside of getCurrentUsersplaylistsThunk ======>', userPlaylists)
    dispatch(getUserplaylistsAction(userPlaylists));
    return userPlaylists
  } else {
    return ("Get current user's playlists: bad response")
  }
}

export const createPlaylistThunk = (playlist) => async (dispatch) => {

  const response = await fetch('/api/playlists/new', {
    method: "POST",
    body: playlist
  });
  // console.log('response inside of createAlbumThunk', response)
  if (response.ok) {
    const playlist = await response.json();
    // console.log('newAlbum inside of createAlbumThunk', playlist)
    dispatch(createPlaylistAction(playlist));
    return playlist;
  } else {
    return ("create playlist: response not ok");
  }
};

const playlistReducer = (state = {}, action) => {
    let newState
    switch (action.type) {
      case GET_USER_PLAYLISTS:
        newState = {...state}
        // console.log('playlist reducer action ==> :', action)
        action.playlists.playlists.forEach(playlist => newState[playlist.id] = playlist)
        return newState
      case CREATE_PLAYLIST:
        newState = {...state}
        newState[action.playlist.id] = action.playlist
        return newState
      default:
        return state
    }
  }

  export default playlistReducer;
