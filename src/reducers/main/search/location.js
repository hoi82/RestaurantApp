import { READY_TO_LOAD, COUNTRY_LOADING, COUNTRY_LOADED, COUNTRY_FAILED, STATE_LOADING, STATE_LOADED, STATE_FAILED } from "../../../actions/main/search";
import produce from "immer";

const initState = {
    country: {
        status: READY_TO_LOAD,
        isPending: true,
        filter: [],        
        error: ""
    },
    states: {
        status: READY_TO_LOAD,
        isPending: true,
        filter: [],
        error: ""
    }
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case COUNTRY_LOADING:
            return produce(state, draft => {
                draft.country.status = COUNTRY_LOADING;   
                draft.country.isPending = true;                             
                draft.country.error = "";
            });            
        case COUNTRY_LOADED: 
            return produce(state, draft => {
                draft.country.status = COUNTRY_LOADED;
                draft.country.isPending = false;
                draft.country.filter = payload;
                draft.country.error = "";
            });            
        case COUNTRY_FAILED: 
            return produce(state, draft => {
                draft.country.status = COUNTRY_FAILED;
                draft.country.isPending = false;
                draft.country.filter = [];
                draft.country.error = payload;
            })            
        case STATE_LOADING: 
            return produce(state, draft => {
                draft.states.status = STATE_LOADING;
                draft.states.isPending = true;
                draft.states.error = "";
            })            
        case STATE_LOADED:             
            return produce(state, draft => {
                draft.states.status = STATE_LOADED;
                draft.states.isPending = false;
                draft.states.filter = payload;
                draft.states.error = "";
            })            
        case STATE_FAILED:
            return produce(state, draft => {
                draft.states.status = STATE_FAILED;
                draft.states.isPending = false;
                draft.states.filter = [];
                draft.states.error = payload;
            })            
        default:
            return state;
    }
}