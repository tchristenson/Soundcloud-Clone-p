const GET_ALL_STYLES = 'styles/GET_ALL'

const getAllStyleAction = styles => {
    return {
        type: GET_ALL_STYLES, styles
    }
}

export const getAllStylesThunk = () => async dispatch => {
    const res = await fetch('/api/songs/styles')
    if (res.ok) {
        const styles = await res.json()
        dispatch(getAllStyleAction(styles))
        return styles
    }
}

const initState  = {}
const styleReducer = (state = initState, action) => {

    switch (action.type) {
        case GET_ALL_STYLES:
            // console.log("acttttioooooooooooooon", action)
            const newState = { ...state };
            action.styles.styles.forEach(style =>
                newState[style.id] = style);
            return newState;
        default:
            return state
    }
}

export default styleReducer
