import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../_constants/types";

const INITIAL_STATE = {
    isAuth:false,
    //token:'',
    errors:[]
}
//token:action.token,:- may be the test
export const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {isAuth:true, errors:[]});
        case LOGIN_FAILURE:
			return Object.assign({}, state, {errors:action.errors});
			case LOGOUT:
					return Object.assign({}, state, {isAuth:false});
		default:
			return state;
	}
}