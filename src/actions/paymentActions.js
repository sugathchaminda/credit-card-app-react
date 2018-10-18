import {
    EDIT_CARD_NO,
    EDIT_NAME,
    EDIT_CVV,
    EDIT_EXP,
    CLEAR_FORM,
} from '../constants/processConstants';

export const editCardNo = (data) => {
    return dispatch => {
        dispatch({
            type: EDIT_CARD_NO,
            data
        })
    }
}

export const editClientName = (data) => {
    return dispatch => {
        dispatch({
            type: EDIT_NAME,
            data
        })
    }
}

export const editCVV = (data) => {
    return dispatch => {
        dispatch({
            type: EDIT_CVV,
            data
        })
    }
}

export const editEXP = (data) => {
    return dispatch => {
        dispatch({
            type: EDIT_EXP,
            data
        })
    }
}

export const clearForm = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_FORM
        })
    }
}