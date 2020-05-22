export const SHOW_DIALOG = "SHOW_DIALOG";
export const CLOSE_DIALOG = "CLOSD_DIALOG";

export const showDialog = (props = {
    mode: DialogMode.ALERT,    
    title: "",    
    content: null,    
    buttons: null,
    onClose: null,}) => {    
    return {
        type: SHOW_DIALOG,
        payload: props
    }
}

export const closeDialog = () => {
    return {
        type: CLOSE_DIALOG,        
    }
}