export default (length) => {
    const dummy = [];
    for (let i = 0; i < length; i++) {        
        dummy.push(Math.random().toString(36).substr(0, 7));
    }
    return dummy;
}