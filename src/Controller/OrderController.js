import OrderModel from "../models/OrderModel.js";
import OrderDetailsModeal from "../models/OrderDetailsModeal.js";
import { customer_Array, item_Array, Order_Array, Order_Details_Array } from "../db/database.js";

const validateTele = (num) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(num);
};

// Load customer IDs
export function loadcustomer() {
    $("#customerId").empty().append('<option value="" disabled selected>Select Customer ID</option>');
    customer_Array.forEach((item) => {
        $("#customerId").append(`<option value="${item.id}">${item.id}</option>`);
    });
}

// Load item IDs
export function loaditem() {
    $("#itemId").empty().append('<option value="" disabled selected>Select Item ID</option>');
    item_Array.forEach((item) => {
        $("#itemId").append(`<option value="${item.code}">${item.code}</option>`);
    });
}



const itemid = $('#itemId');
const custsname = $('#firstname');
const getquantity = $('#Getquantity');
const quantity = $('#quantity');
const description = $('#description');
const price = $('#price');
const totalElement = $("#Total");
const cusid = $('#customerId');



cusid.on('change', () => {
    const selectedItemId = itemid.val();
    const item = customer_Array.find(item => item.cusid === selectedItemId);

    if (item) {
        custsname.val(item.firstname);

    } else {
        description.val('');
        price.val('');
        quantity.val('');

    }
});




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
        updateqyt()
    }
});

// Add item to cart
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
            orderData.itemCode,
            orderData.customerid,
            orderData.num,
            orderData.price,
            orderData.qty,
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
const loadOrderTable = () => {
    $("#OrderTableBody").empty();
    let total = 0;

    Order_Array.forEach((item) => {
        const itemTotal = item.getqty * item.price;
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

    totalElement.val(total);
};


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
    const orderDetails = new OrderDetailsModeal(
        Order_Details_Array.length + 1,
        $('#OrderID').val(),
        $('#orderDate').val(),
        $('#customerId').val(),
        totalElement.val()
    );

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Order Saved Successfully",
        showConfirmButton: false,
        timer: 1500
    });

    Order_Details_Array.push(orderDetails);
    loadOrderDetailsTable();
});

// Load Order Details Table
const loadOrderDetailsTable = () => {
    $("#OrderDetailTableBody").empty();
    Order_Array.forEach((order) => {
        // Calculate total amount based on price and quantity
        const totalAmount = order.price * order.getqty;

        // Get the discount value and parse it to a number
        const discount = parseFloat($('#discout').val())

        // Final total after applying the discount
        const finalTotal = totalAmount - discount;

        const data = `<tr>
            <td>${order.cusid}</td>
            <td>${order.orderdate}</td>
            <td>${order.cusid}</td>
            <td>${finalTotal.toFixed(2)}</td> <!-- Format as needed -->
        </tr>`;
        $("#OrderDetailTableBody").append(data);
    });
};

const updateqyt = () =>{

    Order_Array.forEach((o) =>{
      const uq = o.qty - o.getqty
        quantity.val(uq)
    })

}