import {
    EDIT_CARD_NO,
    EDIT_NAME,
    EDIT_CVV,
    EDIT_EXP,
    CLEAR_FORM,
} from '../constants/processConstants';

const initialState = {
    is_loading: null,
    card_no: "",
    user_name: "",
    card_cvv: "",
    card_exp: "",
}
  
export default (state = initialState, action) => {
    switch (action.type) {
        case EDIT_CARD_NO:
            return {
                ...state,
                card_no: action.data,
            }
        
        case EDIT_NAME:
            return {
                ...state,
                user_name: action.data,
            }
        
        case EDIT_CVV:
            return {
                ...state,
                card_cvv: action.data,
            }
        
        case EDIT_EXP:
            return {
                ...state,
                card_exp: action.data,
            }
        
        case CLEAR_FORM:
            return {
                ...state,
                card_no: "",
                user_name: "",
                card_cvv: "",
                card_exp: "",
            }

        default:
            return state;
    }
}