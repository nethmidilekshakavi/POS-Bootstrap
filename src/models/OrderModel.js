export default class OrderModel{

    constructor(id,name,email,mobile,coffeeType,price,qty) {

        this._id = id;
        this._name = name;
        this._email = email;
        this._mobile = mobile;
        this._coffeeType = coffeeType;
        this._price = price;
        this._qty = qty

    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
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