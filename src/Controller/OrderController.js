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
$("#order-save").on('click', function () {
    let orderid = $('#OrderID').val();
    let orderdate = $('#orderDate').val();
    let name = $('#customersName').val();
    let num = $('#customerPhone').val();
    let type = $('#coffeeType').val();
    let price = parseFloat($('#price').val());
    let qty = parseInt($('#quantity').val());



    if (!name) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid First Name!",
        });
    } else if (!type) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Coffee Type!",
        });
    } else if (!price || isNaN(price) || price <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Price!",
        });
    } else if (!qty || isNaN(qty) || qty <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Quantity!",
        });
    } else if (!validateTele(num)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Phone Number!",
        });
    } else {
        let order = new OrderModel(
            Order_Array.length + 1, // Increment order ID based on length
            name, num, type, price, qty,orderid,orderdate
        );

        Order_Array.push(order);
        loadOrderTable();

        // Clear the input fields
        $("#customersName").val("");
        $("#orderDate").val("");
        $("#OrderID").val("");
        $("#customerPhone").val("");
        $("#coffeeType").val("");
        $("#price").val("");
        $("#quantity").val("");
    }
});

// Load order details into the table
const loadOrderTable = () => {
    $("#OrderTableBody").empty();
    Order_Array.forEach((item) => {
        let total = item.price * item.qty;
        let data = `<tr>
            <td>${item.name}</td>
            <td>${item.mobile}</td>
            <td>${item.coffeeType}</td>
            <td>${item.price}</td>
            <td>${item.qty}</td>
            <td>${total}</td>
        </tr>`;
        $("#OrderTableBody").append(data);
    });
};

// Event handler for selecting a row from the order table
let select_order_index = null;

$('#OrderTableBody').on('click', 'tr', function () {
    let index = $(this).index();
    select_order_index = index;

    let object = Order_Array[index];
    console.log(object);

    // Click and load table text fields
    $("#customersName").val(object.name);
    $("#customerPhone").val(object.mobile);
    $("#coffeeType").val(object.coffeeType);
    $("#price").val(object.price);
    $("#quantity").val(object.qty);
});
