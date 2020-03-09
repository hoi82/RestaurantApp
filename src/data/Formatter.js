const Formatter = {
    formatCardNumber: (value) => {
        let val = value;
        let parts = [];
        let idx = 0;

        val = val.replace(/[^0-9]/gi, "");

        for (idx = 0; idx < val.length; idx += 4) {            
            parts.push(val.substr(idx, 4));            
        }
        
        if (idx < val.length - 1) {
            parts.push(val.substr(idx, val.length - idx));
        }        

        if (parts.length > 0)
            val = parts.join(" ");

        return val;
    },
    formatExpireDate: (value) => {
        let val = value;
        val = val.replace(/^(0[1-9]|1[0-2]|[2-9])([0-9]+)/gi, "$1/$2");

        return val;
    }
}

export default Formatter;