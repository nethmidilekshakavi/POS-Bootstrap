
import {item_Array} from "../db/database.js";
import ItemModel from "../models/ItemModel.js";
import {loaditem} from "./OrderController.js";


//save==============================================================================================
$("#save-item").on('click',function (){


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
    }

    else if (desc.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid description!",
        });
    }
    else if (price.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid price!",
        });
    }

    else if (qty.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid qty!",
        });
    }

    else {

        let item = new ItemModel(
            itemcode,
            desc,
            price,
            qty
        );


        item_Array.push(item)

        $("#qty").val("")
        $("#itemPrice").val("")
        $("#itemDescription").val("")
        $("#code").val("")


        loadTable();
        loaditem()
    }
});


const loadTable = () => {
    $("#itemTableBody").empty();

    item_Array.map((item, index) => {
        let data1 = `<tr><td>${item.code}</td><td>${item.Desc}</td><td>${item.price}</td><td>${item._qty}</td></tr>`;
        $("#itemTableBody").append(data1);
    });
}

let select_item_index = null;

$('#itemTableBody').on('click', 'tr', function () {
    let index = $(this).index();
    select_item_index = index;
    let object = item_Array[index];

    $("#code").val(object.code);
    $("#itemDescription").val(object.Desc);
    $("#itemPrice").val(object.price);
    $("#qty").val(object.Category);
});

//update==============================================================================================================

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
                let category = $('#qty').val();
                let price = $('#itemPrice').val();
                let desc = $('#itemDescription').val();

                // Update selected customer details
                item_Array[select_item_index].code = code;
                item_Array[select_item_index].Desc = desc;
                item_Array[select_item_index].Category =category;
                item_Array[select_item_index].price =price;


                clearFields();
                loadTable1();
                select_item_index = null; // Reset index

                Swal.fire("Saved!", "", "success");
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Select a customer",
                    text: "Please select a item to update.",
                });
            }
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});

// Load customer table
const loadTable1 = () => {
    $("#itemTableBody").empty();
    item_Array.map((item) => {
        let data1 = `<tr><td>${item.code}</td>${item.Desc}</td><td>${item.price}</td><td>${item._qty}</td></tr>`;
        $("#itemTableBody").append(data1);
    });
};

// Handle row click
$('#itemTableBody').on('click', 'tr', function () {
    let index = $(this).index();
    select_item_index = index;

    let object = item_Array[index];
    $("#code").val(object.code);
    $("#itemDescription").val(object.Desc);
    $("#itemPrice").val(object.price);
    $("#qty").val(object._qty);
});

// Clear input fields
const clearFields = () => {
    $("#qty").val("")
    $("#itemPrice").val("")
    $("#itemDescription").val("")
    $("#code").val("")
};

//delete==========================================================================================

$("#delete-item").on('click', function () {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {


        item_Array.splice(select_item_index,1)

    loadTable();

    $("#qty").val("")
    $("#itemPrice").val("")
    $("#itemDescription").val("")
    $("#code").val("")


    loadTable();

        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});

$("#clear-item").on('click', function () {


    $("#qty").val("")
    $("#itemPrice").val("")
    $("#itemDescription").val("")
    $("#code").val("")



})