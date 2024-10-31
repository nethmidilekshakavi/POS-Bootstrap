
 export default class CustomerModel{
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    constructor(id,firstname,last_name,address,email,mobile) {
        this._id = id;
        this._first_name = firstname;
        this._last_name = last_name;
        this._address = address;
        this._email = email;
        this._mobile = mobile;

    }


     get firstname() {
         return this._first_name;
     }

     set firstname(value) {
         this._first_name = value;
     }

     get last_name() {
         return this._last_name;
     }

     set last_name(value) {
         this._last_name = value;
     }

     get address() {
         return this._address;
     }

     set address(value) {
         this._address = value;
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
 }