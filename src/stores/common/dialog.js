import { DialogMode } from "../../types/Variables";

const initDialog = {
    show: false,
    mode: DialogMode.ALERT,
    withTitle: false,
    title: "",    
    content: null,    
    buttons: null,
    onClose: null,
}

export default initDialog;