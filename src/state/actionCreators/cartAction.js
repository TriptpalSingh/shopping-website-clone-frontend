export const increase = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "INCREASE",
            payload: amount
        })
    }
}

export const decrease = (amount) => {
    return (dispatch) => {
        dispatch({
            type: "DECREASE",
            payload: amount
        })
    }
}