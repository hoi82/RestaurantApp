export const getFullAddress = (address) => {    
    let value = "";

    if (!address)
        return "";

    if (address.remains) {
        value = value.concat(address.remains);
    }

    if (address.state) {
        value = value.concat(", ", address.state);
    }

    if (address.country) {
        value = value.concat(", ", address.country);
    }

    return value;
}

export const getErrorMessage = (errorCode) => {
    switch (errorCode) {
        case "NOT_LOGIN":
            return "먼저 로그인 해주세요.";                                                         
        default:
            return `에러가 발생했습니다. 관리자에게 문의해주세요.\r\nCode:${errorCode}`;            
    }
}