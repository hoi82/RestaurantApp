import { READY_TO_LOAD, COUNTRY_LOADING, COUNTRY_LOADED, COUNTRY_FAILED, STATE_LOADING, STATE_LOADED, STATE_FAILED } from "../../../actions/main/search";

const initState = {
    country: {
        status: READY_TO_LOAD,
        filter: [],        
        error: ""
    },
    states: {
        status: READY_TO_LOAD,
        filter: [],
        error: ""
    }
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case COUNTRY_LOADING:
            return {
                country: {
                    status: COUNTRY_LOADING,
                    filter: state.country.filter,
                    error: ""
                },
                states: state.states
            };
        case COUNTRY_LOADED: 
            return {
                country: {
                    status: COUNTRY_LOADED,
                    filter: payload,
                    error: ""
                },
                states: state.states
            };
        case COUNTRY_FAILED: 
            return {
                country: {
                    status: COUNTRY_FAILED,
                    filter: state.country.filter,
                    error: payload
                },
                states: state.states
            };
        case STATE_LOADING: 
            return {
                country: state.country,
                states: {
                    status: STATE_LOADING,
                    filter: state.states.filter,
                    error: ""
                }
            };
        case STATE_LOADED: 
            return {
                country: state.country,
                states: {
                    status: STATE_LOADED,
                    filter: payload,
                    error: ""
                }
            };
        case STATE_FAILED:
            return {
                country: state.country,
                states: {
                    status: STATE_FAILED,
                    filter: state.states.filter,
                    error: payload
                }
            };
        default:
            return state;
    }
}