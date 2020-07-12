import { SHOW_DIALOG, CLOSE_DIALOG } from "../../actions/common/dialog";
import { DialogMode } from "../../types/Variables";

const initDialog = {
    show: false,
    mode: DialogMode.ALERT,
    withTitle: false,
    title: "",    
    bgimg: true,
    content: null,    
    buttons: null,
    onClose: null,
    onConfirm: null,
    onCancel: null
}

const dialog = (state = initDialog, action) => {
    const { type, payload } = action;    
    switch (type) {
        case SHOW_DIALOG:                    
            return Object.assign({}, initDialog, {
                show: true,
                ...payload
            });
        case CLOSE_DIALOG:
            return Object.assign({}, state, { show: false });
        default:
            return state;
    }
};

export default dialog;