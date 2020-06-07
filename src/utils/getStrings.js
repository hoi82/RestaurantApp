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