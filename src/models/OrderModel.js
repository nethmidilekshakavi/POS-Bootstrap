export default class OrderModel {
    get orderdate() {
        return this._orderdate;
    }

    set orderdate(value) {
        this._orderdate = value;
    }
    constructor(orderid, name, mobile, coffeeType, price, qty,orderdate) {
        this._name = name;
        this._mobile = mobile
        this._coffeeType = coffeeType;
        this._orderdate =  orderdate;
        this._price = price;
        this._qty = qty;
        this._orderid = orderid;
    }


    get orderid() {
        return this._orderid;
    }

    set orderid(value) {
        this._orderid = value;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }

    get mobile() {
        return this._mobile;
    }
    set mobile(value) {
        this._mobile = value;
    }

    get coffeeType() {
        return this._coffeeType;
    }
    set coffeeType(value) {
        this._coffeeType = value;
    }

    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }

    get qty() {
        return this._qty;
    }
    set qty(value) {
        this._qty = value;
    }
}
