
export default class OrderDetailsModeal {

    constructor(oid,Date,cid,subtotal){

        this._Date = Date;
         this._cid = cid;
         this._subtotal = subtotal;
        this._oid = oid;
    }


    get oid() {
        return this._oid;
    }

    set oid(value) {
        this._oid = value;
    }

    get Date() {
        return this._Date;
    }

    set Date(value) {
        this._Date = value;
    }


    get cid() {
        return this._cid;
    }

    set cid(value) {
        this._cid = value;
    }

    get subtotal() {
        return this._subtotal;
    }

    set subtotal(value) {
        this._subtotal = value;
    }
}
