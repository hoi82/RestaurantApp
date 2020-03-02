export const Formatter = {
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
    formatExpireDate: (preValue, value) => {
        let pattern = "^(0[1-9]|1[0-2])";
        let regex = new RegExp(pattern, "g"); 
        let val = value;
        let oldval = preValue;

        // //NOTE:exec method는 최초 일치만 찾기 때문에 while 루프를 돌아야한다.
        // //이때 regexp flag에 g(global)이 없다면 무한루프 빠지므로 주의할것.
        // while ((match = regex.exec(e.target.value)) != null) {
        //     count++;
        // }                                    
        
        if (regex.test(val) && oldval.length <= 2) {
            val = val.slice(0,2) + "/" + val.slice(2);
        }

        return val;
    }
}