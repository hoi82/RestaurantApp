import { READY_TO_LOAD } from "../../actions/main";

const initState = {
    status: {
        names: READY_TO_LOAD,
        categories: READY_TO_LOAD,
        locations: READY_TO_LOAD
    },
    search: {
        names: [],
        categories: [],
        locations: []
    },
    searchResults: []
};

export default initState;