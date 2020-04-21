export default (count) => {
    const dummy = [];
    for (let i = 0; i < count; i++) {        
        dummy.push({ title: `${i}`});
    }

    return dummy;
}