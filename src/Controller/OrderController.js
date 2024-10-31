import OrderModel from "../models/OrderModel.js";
import OrderDetailsModeal from "../models/OrderDetailsModeal.js";
import {customer_Array, item_Array, Order_Array, Order_Details_Array} from "../db/database.js";

// Function to validate phone numbers based on Sri Lankan format
const validateTele = (num) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(num);
};

// Load customer IDs into the dropdown
export function loadcustomer() {
    $("#customerId").empty().append('<option value="" disabled selected>Select Customer ID</option>');
    customer_Array.forEach((item) => {
        let option = `<option value="${item.id}">${item.id}</option>`;
        $("#customerId").append(option);
    });
}

// Load item IDs into the dropdown
export function loaditem() {
    $("#itemId").empty().append('<option value="" disabled selected>Select Item ID</option>');
    item_Array.forEach((item) => {
        let option = `<option value="${item.code}">${item.code}</option>`;
        $("#itemId").append(option);
    });
}

// DOM Elements
const customer_id = $('#customerId');
const orderid = $('#OrderID');
const customer_name = $('#orderCustomer');
const customer_mobile = $('#orderphone');
const itemid = $('#itemId');
const description = $('#description');
const price = $('#price');
const quantity = $('#quantity');
const getqty = $('#Getquantity');
const discount = $('#discout');
const subtotall = $('#subtotal');

// Populate customer details when customer ID is selected
customer_id.on('change', () => {
    const selectedCustomerId = customer_id.val();
    const customer = customer_Array.find(item => item.id === selectedCustomerId);

    if (customer) {
        customer_name.val(customer._first_name);
        customer_mobile.val(customer._mobile);
    } else {
        customer_name.val('');
        customer_mobile.val('');
    }
});

// Populate item details when item ID is selected
itemid.on('change', () => {
    const selectedItemId = itemid.val();
    const item = item_Array.find(item => item.code === selectedItemId);

    if (item) {
        description.val(item.Desc);
        price.val(item.price);
        quantity.val(item.qty);
    } else {
        description.val('');
        price.val('');
        quantity.val('');
    }
});

// Add item to the cart
$("#order-save").on('click', function () {
    const orderData = {
        orderid: $('#OrderID').val(),
        customerid: $('#customerId').val(),
        orderdate: $('#orderDate').val(),
        name: $('#orderCustomer').val(),
        num: $('#orderphone').val(),
        itemCode: $('#itemId').val(),
        desc: $('#description').val(),
        price: parseFloat($('#price').val()),
        qty: parseInt($('#quantity').val()),
        getQty: parseInt($('#Getquantity').val()),
        discount1: parseInt($('#discout').val()),
    };

    // Validate inputs
    if (!orderData.name) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Invalid First Name!" });
    } else if (!orderData.itemCode) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Invalid item ID!" });
    } else if (!orderData.price || isNaN(orderData.price) || orderData.price <= 0) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Invalid Price!" });
    } else if (!orderData.qty || isNaN(orderData.qty) || orderData.qty <= 0) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Invalid Quantity!" });
    } else if (!validateTele(orderData.num)) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Invalid Phone Number!" });
    } else {
        const order = new OrderModel(

            Order_Array.length + 1,

            orderData.qty = orderData.qty - orderData.getQty,

            orderData.itemCode,
            orderData.customerid,
            orderData.num,
            orderData.price,
            orderData.getQty,
            orderData.orderdate,
            orderData.desc,
            orderData.name,
            orderData.discount1
        );



        Order_Array.push(order);
        loadOrderTable();
    }
});

// Load Order Table
let total = 0;
const loadOrderTable = () => {
    $("#OrderTableBody").empty();
    total = 0;

    Order_Array.forEach((item) => {
        const itemTotal = item.price * item.getqty;
        total += itemTotal;



        const data = `<tr>
            <td>${item.cusname}</td>
            <td>${item.mobile}</td>
            <td>${item.desc}</td>
            <td>${item.orderdate}</td>
            <td>${item.price}</td>
            <td>${item.getqty}</td>
            <td>${itemTotal}</td>
        </tr>`;
        $("#OrderTableBody").append(data);
    });

    $("#Total").val(total);
};

// Handle table row selection
$('#OrderTableBody').on('click', 'tr', function () {
    const index = $(this).index();
    const selectedOrder = Order_Array[index];

    $("#OrderID").val(selectedOrder.orderid);
    $("#orderCustomer").val(selectedOrder.cusname);
    $("#itemId").val(selectedOrder.itemid);
    $("#customerId").val(selectedOrder.cusid);
    $("#description").val(selectedOrder.desc);
    $("#orderDate").val(selectedOrder.orderdate);
    $("#orderphone").val(selectedOrder.mobile);
    $("#price").val(selectedOrder.price);
    $("#quantity").val(selectedOrder.qty);
    $("#Getquantity").val(selectedOrder.getqty);
});

// Save Order Details
$('#purchase').on('click', () => {
    const oid = $('#OrderID').val();
    const Date = $('#orderDate').val();
    const cid = $('#customerId').val();
    const subtotal = $('#Total').val();

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Order Saved Successfully",
        showConfirmButton: false,
        timer: 1500
    });

    const orderDetails = new OrderDetailsModeal(Order_Details_Array.length + 1, oid, Date, cid, subtotal);
    Order_Details_Array.push(orderDetails);
    loadOrderDetailsTable();
});

// Load Order Details Table
const loadOrderDetailsTable = () => {
    $("#OrderDetailTableBody").empty();
    Order_Array.forEach((order) => {
        const data = `<tr>
            <td>${order.cusid}</td>
            <td>${order.orderdate}</td>
            <td>${order.cusid}</td>
            <td>${total}</td>
        </tr>`;
        $("#OrderDetailTableBody").append(data);
    });
};
