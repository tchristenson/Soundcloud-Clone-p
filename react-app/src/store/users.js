import { bindActionCreators } from "redux"

//consts
const GET_USER = "/GET_USER"
const GET_ALL_USERS = '/GET_ALL_USERS'

const getOneUserAction = (user) => {
    return {
        type: GET_USER,
        user
    }
}

const getAllUsersAction = (users) => {
    return {
        type: GET_ALL_USERS,
        users
    }
}


export const getOneUserThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`);
    // console.log("response ", response);

    if (response.ok) {
        const user = await response.json();
        // console.log("user ", user);
        dispatch(getOneUserAction(user))
        return user
    }
};

export const getAllUsersThunk = () => async (dispatch) => {
    const response = await fetch(`/api/users/`);
    // console.log("response ", response);

    if (response.ok) {
        const {users} = await response.json();
        // console.log("this is the users THUNK", users)
        dispatch(getAllUsersAction(users))
        return users
    }
};





const initState = {};
function userReducer(state = initState, action) {
    let newState;
    switch (action.type) {
        case GET_USER:
            newState = {...state}
            console.log("user ", action.user)
            newState[action.user.id] = action.user
            return newState
        case GET_ALL_USERS:
            newState = {...state}
            console.log('aciton.users.users.users', action.users)
            action.users.forEach(user=>{
                newState[user.id] = user
            })
            return newState
        default:
            return state
    }
}

export default userReducer;
