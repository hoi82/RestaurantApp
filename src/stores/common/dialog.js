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

export default initDialog;