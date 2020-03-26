export const SHOW_DIALOG = "SHOW_DIALOG";
export const CLOSE_DIALOG = "CLOSD_DIALOG";

export const showDialog = (props) => {    
    return {
        type: SHOW_DIALOG,
        paylord: props
    }
}

export const closeDialog = () => {
    return {
        type: CLOSE_DIALOG,        
    }
}