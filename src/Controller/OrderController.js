import OrderModel from "../models/OrderModel.js";
import { Order_Array } from "../db/database.js";
import { customer_Array } from "../db/database.js";

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const validateTele = (num) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(num);
};

export function loadCustomers() {
    $("#customerId").empty();
    customer_Array.map((item) => {
        // Add customer IDs to the dropdown
        let data = `<option value="${item.id}">${item.id}</option>`;
        $("#customerId").append(data);
    });

    // Event listener for customer ID change to load customer name
    $("#customerId").on('change', function () {
        let selectedId = $(this).val();
        let selectedCustomer = customer_Array.find(item => item.id === selectedId);

        if (selectedCustomer) {
            // Load the customer's first name in the Name field
            $("#customerName").val(selectedCustomer.first_name);
        }
    });



    $("#order-save").on('click', function () {
        let name = $('#customerName').val();
        let email = $('#customerEmail').val();
        let num = $('#customerPhone').val();
        let type = $('#coffeeType').val();
        let price = $('#price').val();
        let qty = $('#quantity').val();

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
        } else if (!price) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Price!",
            });
        } else if (!qty) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Quantity!",
            });
        } else if (!validateEmail(email)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Email!",
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
                name, email, num, type, price, qty
            );

            Order_Array.push(order);
            loadOrderTable();

            // Clear the input fields
            $("#customerName").val("");
            $("#customerEmail").val("");
            $("#customerPhone").val("");
            $("#coffeeType").val("");
            $("#price").val("");
            $("#quantity").val("");
        }
    });

    const loadOrderTable = () => {
        $("#OrderTableBody").empty();
        Order_Array.forEach((item) => {
            let total = item.price * item.qty;
            let data = `<tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.mobile}</td>
            <td>${item.coffeeType}</td>
            <td>${item.price}</td>
            <td>${item.qty}</td>
            <td>${total}</td>
        </tr>`;
            $("#OrderTableBody").append(data);
        });
    };

    let select_order_index = null;

    $('#OrderTableBody').on('click', 'tr', function () {
        let index = $(this).index();
        select_order_index = index;

        let object = Order_Array[index];
        console.log(object);

        // Click and load table text fields
        $("#customerName").val(object.name);
        $("#customerEmail").val(object.email);
        $("#customerPhone").val(object.mobile);
        $("#coffeeType").val(object.coffeeType);
        $("#price").val(object.price);
        $("#quantity").val(object.qty);
    });
}
