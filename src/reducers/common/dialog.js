import { SHOW_DIALOG, CLOSE_DIALOG } from "../../actions/common/dialog";
import initDialog from "../../stores/common/dialog";

const dialog = (state = initDialog, action) => {
    const { type, payload } = action;    
    switch (type) {
        case SHOW_DIALOG:                    
            return {
                show: true,
                ...payload
            }
        case CLOSE_DIALOG:
            return {
                show: false,
                onClose: state.onClose
            };
        default:
            return state;
    }
};

export default dialog;