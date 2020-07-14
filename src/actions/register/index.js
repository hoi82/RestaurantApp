import axios from "axios";
import { axiosConfig } from "../../config/url";

export const READY_TO_REGISTER_USER = "READY_TO_REGIST_USER";
export const REGISTERING_USER = "REGISTERING_USER";
export const USER_REGISTERED = "USER_REGISTERED";
export const USER_REGISTRATION_FAILED = "USER_REGISTRATION_FAILED";

export const registerUser = (info) => async (dispatch) => {
    dispatch({type: REGISTERING_USER});
    try {
        const { data } = await axios.post("http://localhost:3005/api/users", info, axiosConfig);
        if (data.error) {
            dispatch({type: USER_REGISTRATION_FAILED, payload: data.error.code});
        }
        else {
            dispatch({type: USER_REGISTERED});
        }
    } catch (error) {
        if (error.response) {
            dispatch({type: USER_REGISTRATION_FAILED, payload: error.response.status});
        }
        else {
            dispatch({type: USER_REGISTRATION_FAILED, payload: "NETWORK_ERROR"});
        }
    }    
}

