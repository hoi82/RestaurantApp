import { READY_TO_CHANGE } from "../../actions/register/payments";

const initialPayments = {
    // list: [{id: 0, kind: "paypal", email: "aaa", password: "aaa"}, {id: 1, kind: "credit card", number: "1234 1234 1234 1234", expire: "10/25", cvc: "bbb", cashHolder: "bbb"}],
    currentCreditCard: null,
    currnetPaypal: null,
    list: [],
    state: READY_TO_CHANGE 
};

export default initialPayments;