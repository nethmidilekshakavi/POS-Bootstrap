export default class ItemModel {

    constructor(code,itemName,Desc,price,Category) {

        this._code = code;
        this._itemName = itemName;
        this._Desc =Desc;
        this._price = price;
        this._Category = Category;


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

    get Category() {
        return this._Category;
    }

    set Category(value) {
        this._Category = value;
    }
}