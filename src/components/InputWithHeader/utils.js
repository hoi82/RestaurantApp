export const handleNumber = (e) => {       
    var code = e.keyCode;
    
    if (code > 47 && code < 58) {
      return;
    }
    
    if (e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }

    if (code === 8 || code === 9 || code === 36 || code === 35 || code === 37 ||
        code === 39 || code === 8 || code === 46) {
      return;
    }    
    event.preventDefault();
}