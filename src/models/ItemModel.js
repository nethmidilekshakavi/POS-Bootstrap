export default class ItemModel {
    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    constructor(code,itemName,Desc,price,qty) {

        this._code = code;
        this._itemName = itemName;
        this._Desc =Desc;
        this._price = price;
        this._qty = qty;
    }


    get code() {
        return this._code;
    }

    set code(value) {
        this._code = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get Desc() {
        return this._Desc;
    }

    set Desc(value) {
        this._Desc = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }


}