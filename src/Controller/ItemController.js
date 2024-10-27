
import {item_Array} from "../db/database.js";
import ItemModel from "../models/ItemModel.js";


//save==============================================================================================
$("#save").on('click',function (){


    let itemcode = $('#code').val();
    let name = $('#itemName').val();
    let desc = $('#itemDescription').val();
    let price = $('#itemPrice').val();
    let category = $('#itemCategory').val();


    if (itemcode.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Code!",
        });
    }
    else if (name.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Name!",
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

    else if (category.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid price!",
        });
    }

    else {

        let item = new ItemModel(
            itemcode,
            name,
            desc,
            price,
            category
        );


        item_Array.push(item)

        $("#itemCategory").val("")
        $("#itemPrice").val("")
        $("#itemDescription").val("")
        $("#itemName").val("")
        $("#code").val("")


        loadTable();
    }
});


const loadTable = () => {
    $("#itemTableBody").empty();

    item_Array.map((item, index) => {
        let data1 = `<tr><td>${item.code}</td><td>${item.itemName}</td><td>${item.Desc}</td><td>${item.price}</td><td>${item.Category}</td></tr>`;
        $("#itemTableBody").append(data1);
    });
}

let select_item_index = null;

$('#itemTableBody').on('click', 'tr', function () {
    let index = $(this).index();
    select_item_index = index;
    let object = item_Array[index];

    $("#code").val(object.code);
    $("#itemName").val(object.itemName);
    $("#itemDescription").val(object.Desc);
    $("#itemPrice").val(object.price);
    $("#itemCategory").val(object.Category);
});

//update==============================================================================================================

$("#update").on('click', function () {
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
                let category = $('#itemCategory').val();
                let price = $('#itemPrice').val();
                let desc = $('#itemDescription').val();
                let name = $('#itemName').val();

                // Update selected customer details
                item_Array[select_item_index].code = code;
                item_Array[select_item_index].itemName = name;
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
        let data1 = `<tr><td>${item.code}</td><td>${item.itemName}</td><td>${item.Desc}</td><td>${item.price}</td><td>${item.Category}</td></tr>`;
        $("#itemTableBody").append(data1);
    });
};

// Handle row click
$('#itemTableBody').on('click', 'tr', function () {
    let index = $(this).index();
    select_item_index = index;

    let object = item_Array[index];
    $("#code").val(object.code);
    $("#itemName").val(object.itemName);
    $("#itemDescription").val(object.Desc);
    $("#itemPrice").val(object.price);
    $("#itemCategory").val(object.Category);
});

// Clear input fields
const clearFields = () => {
    $("#itemCategory").val("")
    $("#itemPrice").val("")
    $("#itemDescription").val("")
    $("#itemName").val("")
    $("#code").val("")
};

//delete==========================================================================================

$("#delete").on('click', function () {

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

    $("#itemCategory").val("")
    $("#itemPrice").val("")
    $("#itemDescription").val("")
    $("#itemName").val("")
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