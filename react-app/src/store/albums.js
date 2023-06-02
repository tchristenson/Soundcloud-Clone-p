// ACTIONS
const GET_ALL_ALBUMS = 'albums/GET_ALL_ALBUMS'
const GET_ONE_ALBUM = 'albums/GET_ONE_ALBUM'
const GET_USER_ALBUMS = 'albums/GET_USER_ALBUMS'
const DELETE_ALBUM = 'albums/DELETE_ALBUM'
const CREATE_ALBUM = 'albums/CREATE_ALBUM'
const EDIT_ALBUM = 'album/EDIT_ALBUM'

const getAllAlbumsAction = (albums) => {
  return {
    type: GET_ALL_ALBUMS,
    albums
  }
}

const getOneAlbumAction = (album) => {
  return {
    type: GET_ONE_ALBUM,
    album
  }
}

const getUserAlbumsAction = (albums) => {
  return {
    type: GET_USER_ALBUMS,
    albums
  }
}

const deleteAlbumAction = (albumId) => {
  return {
    type: DELETE_ALBUM,
    albumId
  }
}

const createAlbumAction = (album) => {
  return {
    type: CREATE_ALBUM,
    album
  }
}

const editAlbumAction = (album) => {
  return {
    type: EDIT_ALBUM,
    album
  }
}


// THUNKS
export const getAllAlbumsThunk = () => async (dispatch) => {
  const response = await fetch('/api/albums')
  if (response.ok) {
    const albums = await response.json()
    dispatch(getAllAlbumsAction(albums))
    return albums
  }
}

export const getOneAlbumThunk = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`)
  // console.log('checking inside of getOneAlbumThunk')

  if (response.ok) {
    const album = await response.json()
    // console.log('album inside of getOneAlbumThunk', album)
    dispatch(getOneAlbumAction(album))
    return album
  }
}

export const getCurrentUsersAlbumsThunk = () => async (dispatch) => {
  // console.log('getCurrentUsersAlbumsThunk running')
  const response = await fetch('/api/albums/current');

  if (response.ok) {
    const userAlbums = await response.json();
    // console.log('userAlbums inside of getCurrentUsersAlbumsThunk ======>', userAlbums)
    dispatch(getUserAlbumsAction(userAlbums));
    return userAlbums
  } else {
    // return console.log("Get current user's albums: bad response")
  }
}

export const deleteAlbumThunk = (albumId) => async (dispatch) => {
  // console.log('albumId inside deleteAlbumThunk', albumId)
  const response = await fetch(`/api/albums/delete/${albumId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    // console.log('response inside of deleteAlbumThunk', response)
    // const delAlbum = response.json();
    dispatch(deleteAlbumAction(albumId));
    return {'message': 'delete successful'}
  } else {
    return console.log("Delete current user's album: bad response");
  }
}

export const createAlbumThunk = (album) => async (dispatch) => {
  // console.log('album inside of createAlbumThunk', album)
  const response = await fetch('/api/albums/new', {
    method: "POST",
    body: album
  });
  // console.log('response inside of createAlbumThunk', response)
  if (response.ok) {
    const album = await response.json();
    // console.log('newAlbum inside of createAlbumThunk', album)
    dispatch(createAlbumAction(album));
    return album;
  } else {
    return ("create album: response not ok");
  }
};

export const editAlbumThunk = (album) => async (dispatch) => {
  const albumId = parseInt(album.get('id'))
  // console.log('albumId inside editAlbumThunk', albumId)
  const response = await fetch(`/api/albums/edit/${albumId}`, {
    method: 'PUT',
    body: album
  })
  // console.log('response inside editAlbumThunk', response)
  if (response.ok) {
    const album = await response.json()
    // console.log('album after response inside editAlbumsThunk', album)
    dispatch(editAlbumAction(album))
    return album
  } else {
    return ('edit album: response not ok')
  }
}


// REDUCER
const albumReducer = (state = {}, action) => {
  let newState
  switch (action.type) {
    case GET_ALL_ALBUMS:
      newState = {...state}
      action.albums.Albums.forEach(album => newState[album.id] = album)
      return newState
    case GET_ONE_ALBUM:
      newState = {...state}
      newState[action.album.id] = action.album
      return newState
    case GET_USER_ALBUMS:
      newState = {...state}
      action.albums.Albums.forEach(album => newState[album.id] = album)
      return newState
    case DELETE_ALBUM:
      newState = {...state};
      delete newState[action.albumId];
      return newState;
    case CREATE_ALBUM:
      newState = {...state}
      newState[action.album.id] = action.album
      return newState;
    case EDIT_ALBUM:
      newState = {...state}
      newState[action.album.id] = action.album
      return newState;
    default:
      return state
  }
}

export default albumReducer;
