import OrderModel from "../models/OrderModel.js";
import { Order_Array } from "../db/database.js";
import {item_Array} from "../db/database.js";
import { customer_Array } from "../db/database.js";


// Function to validate phone numbers based on Sri Lankan format
const validateTele = (num) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(num);
};

// Load customer IDs into the dropdown
export function loadCustomers() {
    $("#customerId").empty();
    $("#customerId").append('<option value="" disabled selected>Select Customer ID</option>');
    customer_Array.forEach((item) => {
        let option = `<option value="${item.id}">${item.id}</option>`;
        $("#customerId").append(option);
    });
}

// Load item IDs into the dropdown
export function loaditem() {
    $("#itemId").empty();
    $("#itemId").append('<option value="" disabled selected>Select Item ID</option>');
    item_Array.forEach((item) => {
        let option = `<option value="${item.code}">${item.code}</option>`;
        $("#itemId").append(option);
    });
}

const customerid = $('#customerId');
const customername = $('#customersName');
const customermobile = $('#customerPhone');
const itemid = $('#itemId');
const description = $('#description');
const price = $('#price');
const quantity = $('#quantity');

customerid.on('input', () => {
    if (customerid.val()) {
        let index = customer_Array.findIndex(Customer => Customer.id === customerid.val());
        if (index !== -1) {
            customername.val(customer_Array[index].last_name);

        } else {
            customername.val('');
            customermobile.val('');
        }
    }
});

itemid.on('input', () => {
    if (itemid.val()) {
        let index = item_Array.findIndex(item => item.code === itemid.val());
        if (index !== -1) {
            description.val(item_Array[index].Desc);
            price.val(item_Array[index].price);
            quantity.val(item_Array[index].qty);
        } else {
            description.val('');
            price.val('');
            quantity.val('');
        }
    }
});

$("#order-save").on('click', function () {
    let orderid = $('#OrderID').val();
    let customerid = $('#customerId').val();
    let orderdate = $('#orderDate').val();
    let name = $('#customersName').val();
    let num = $('#customerPhone').val();
    let itemCode = $('#itemId').val();
    let desc = $('#description').val();
    let price = $('#price').val();
    let qty = $('#quantity').val();
    let getQty = $('#Getquantity').val();

    if (!name) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Invalid First Name!" });
    } else if (!itemCode) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Invalid item ID!" });
    } else if (!price || isNaN(price) || price <= 0) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Invalid Price!" });
    } else if (!qty || isNaN(qty) || qty <= 0) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Invalid Quantity!" });
    } else if (!validateTele(num)) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Invalid Phone Number!" });
    } else {
        let order = new OrderModel(
            Order_Array.length + 1,
            itemCode,
            customerid,
            num,
            parseFloat(price),
            parseInt(qty),
            parseInt(getQty),
            orderdate,
            desc,
            name
        );

        Order_Array.push(order);
        loadOrderTable();

        // Clear the input fields
        $("#customersName").val("");
        $("#customerId").val("");
        $("#description").val("");
        $("#orderDate").val("");
        $("#OrderID").val("");
        $("#customerPhone").val("");
        $("#itemId").val("");
        $("#price").val("");
        $("#Getquantity").val("");
    }
});

const loadOrderTable = () => {
    $("#OrderTableBody").empty();
    let totalCost = 0;
    Order_Array.forEach((item) => {
        let total = item.price * item.getqty;
        totalCost += total;
        let data = `<tr>
                <td>${item.cusname}</td>
                <td>${item.mobile}</td>
                <td>${item.desc}</td>
                <td>${item.orderdate}</td>
                <td>${item.price}</td>
                <td>${item.getqty}</td>
                <td>${total}</td>
            </tr>`;
        $("#OrderTableBody").append(data);
    });
    $("#Total").val(totalCost);
};

// Event handler for selecting a row from the order table
let select_order_index = null;

$('#OrderTableBody').on('click', 'tr', function () {
    let index = $(this).index();
    select_order_index = index;

    let object = Order_Array[index];
    console.log(object);

    // Click and load table text fields
    $("#OrderID").val(object.orderid);
    $("#customersName").val(object.cusname);
    $("#itemId").val(object.itemid);
    $("#customerId").val(object.cusid);
    $("#description").val(object.desc);
    $("#orderDate").val(object.orderdate);
    $("#customerPhone").val(object.mobile);
    $("#price").val(object.price);
    $("#quantity").val(object.qty);
    $("#Getquantity").val(object.getqty);
});


$('#purchase').on('click',function (){

    $("#OrderDetailTableBody")




})