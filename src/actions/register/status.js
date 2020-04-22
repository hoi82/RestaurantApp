import axios from "axios";

export const REGISTER_FETCHING ="FETCHING_REGISTER";
export const REGISTER_FETCHED = "REGISTER_FETCHED";
export const REGISTER_FAILED = "REGISTER_FAILED";

const handleError = (message) => {
    return {
        type: REGISTER_FAILED,
        paylord: message
    };
};

export const FetchRegister = (registerInfo) => {            
    return (dispatch) => {        
        dispatch({ type: REGISTER_FETCHING });
        return axios.post("http://localhost:3005/api/users", {
            email: registerInfo.email,
            password: registerInfo.password,
            name: registerInfo.name,
            contact: registerInfo.contact,
            address: registerInfo.address,
            payments: registerInfo.payments.list
        }, {
            headers: {                
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((res) => {
            dispatch({ type: REGISTER_FETCHED, paylord: res.data });
        }).catch((err) => {                                                
            dispatch({ type: REGISTER_FAILED, paylord: err.message });
        });
    };
}
