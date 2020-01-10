import axios from "axios";
import { API_BASE_URL } from "../_constants/index";
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../_constants/types";
import authService from '../_utils/auth-service';
const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS,
        //token
    }
}

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
}

export const checkAuthState = () => {
    return dispatch => {
        if (authService.isAuthenticated()) {
            dispatch(loginSuccess());
        }
    }
}

export const login = (userData) => {
    return dispatch => {
        return axios.post(`${API_BASE_URL}/auth/signin`, userData)
            .then(res => res.data)
            .then(token => {
                // debugger;
                //localStorage.setItem('auth_token',token.accessToken);
                authService.saveToken(token);
                dispatch(loginSuccess());
            })
            .catch(({ response }) => {
                debugger;
                dispatch(loginFailure(response.data.errors));
            })
    }
}


export const logout = () => {
    authService.invalidateUser();
    return {
        type: LOGOUT
    }
}