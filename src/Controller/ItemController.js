import { item_Array } from "../db/database.js";
import ItemModel from "../models/ItemModel.js";
import { loaditem } from "./OrderController.js";

// Save Item
$("#save-item").on('click', function () {
    let itemcode = $('#code').val();
    let desc = $('#itemDescription').val();
    let price = $('#itemPrice').val();
    let qty = $('#qty').val();

    if (itemcode.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Code!",
        });
    } else if (desc.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid description!",
        });
    } else if (price.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid price!",
        });
    } else if (qty.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid qty!",
        });
    } else {
        let item = new ItemModel(itemcode, desc, price, qty);
        item_Array.push(item);

        clearFields();
        loadTable();
        loaditem();
    }
});

// Load Items into Table
const loadTable = () => {
    $("#itemTableBody").empty();
    item_Array.forEach((item) => {
        let data = `<tr><td>${item.code}</td><td>${item.Desc}</td><td>${item.price}</td><td>${item.qty}</td></tr>`;
        $("#itemTableBody").append(data);
    });
};

// Track Selected Item Index
let select_item_index = null;

// Handle Row Click
$('#itemTableBody').on('click', 'tr', function () {
    let index = $(this).index();
    select_item_index = index;
    let object = item_Array[index];

    $("#code").val(object.code);
    $("#itemDescription").val(object.Desc);
    $("#itemPrice").val(object.price);
    $("#qty").val(object.qty);
});

// Update Item
$("#update-item").on('click', function () {
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        if (result.isConfirmed) {
            if (select_item_index !== null) {
                let code = $('#code').val();
                let desc = $('#itemDescription').val();
                let qty = $('#qty').val();
                let price = $('#itemPrice').val();

                // Update selected item details
                item_Array[select_item_index].code = code;
                item_Array[select_item_index].Desc = desc;
                item_Array[select_item_index].qty = qty;
                item_Array[select_item_index].price = price;

                clearFields();
                loadTable();

                select_item_index = null;
                Swal.fire("Saved!", "", "success");
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Select an item",
                    text: "Please select an item to update.",
                });
            }
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});

// Delete Item
$("#delete-item").on('click', function () {
    if (select_item_index !== null) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                item_Array.splice(select_item_index, 1);
                loadTable();
                clearFields();
                select_item_index = null;

                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success"
                });
            }
        });
    } else {
        Swal.fire({
            icon: "warning",
            title: "Select an item",
            text: "Please select an item to delete.",
        });
    }
});

// Clear Item Fields
const clearFields = () => {
    $("#qty").val("");
    $("#itemPrice").val("");
    $("#itemDescription").val("");
    $("#code").val("");
};

// Clear Item Fields Button
$("#clear-item").on('click', function () {
    clearFields();
    select_item_index = null;
});
