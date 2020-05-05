import axios from "axios";

export const REGISTER_FETCHING ="FETCHING_REGISTER";
export const REGISTER_FETCHED = "REGISTER_FETCHED";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const RESET_REGISTER_STATUS = "RESET_REGISTER_STATUS";

export const ResetRegisterStatus = () => {    
    return {
        type: RESET_REGISTER_STATUS,        
    }
}

export const FetchRegister = (profile, payments) => {            
    return (dispatch) => {        
        if (profile.getValid()) {
            dispatch({ type: REGISTER_FETCHING });
            return axios.post("http://localhost:3005/api/users", {
                email: profile.email,
                password: profile.password,
                name: profile.name,
                contact: profile.contact,
                address: profile.address,
                payments: payments.list
            }, {
                headers: {                
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                dispatch({ type: REGISTER_FETCHED, payload: res.data });
            }).catch((err) => {                                                
                dispatch({ type: REGISTER_FAILED, payload: err.message });
            });
        }      
        else {
            dispatch({ type: REGISTER_FAILED, payload: "개인 정보가 올바르지 않습니다. 개인 정보를 확인해주세요." });
        }  
    };
}
