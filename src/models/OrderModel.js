export default class OrderModel {
    constructor(orderid, itemid, cusid, mobile, price, qty, getqty, orderdate, desc, cusname, discount) {
        this._orderid = orderid;
        this._itemid = itemid;
        this._cusid = cusid;
        this._mobile = mobile;
        this._price = price;
        this._qty = qty;
        this._getqty = getqty;
        this._orderdate = orderdate;
        this._desc = desc;
        this._cusname = cusname;
        this._discount = discount;
    }

    get orderid() { return this._orderid; }
    set orderid(value) { this._orderid = value; }

    get itemid() { return this._itemid; }
    set itemid(value) { this._itemid = value; }

    get cusid() { return this._cusid; }
    set cusid(value) { this._cusid = value; }

    get mobile() { return this._mobile; }
    set mobile(value) { this._mobile = value; }

    get price() { return this._price; }
    set price(value) { this._price = value; }

    get qty() { return this._qty; }
    set qty(value) { this._qty = value; }

    get getqty() { return this._getqty; }
    set getqty(value) { this._getqty = value; }

    get orderdate() { return this._orderdate; }
    set orderdate(value) { this._orderdate = value; }

    get desc() { return this._desc; }
    set desc(value) { this._desc = value; }

    get cusname() { return this._cusname; }
    set cusname(value) { this._cusname = value; }

    get discount() { return this._discount; }
    set discount(value) { this._discount = value; }
}
