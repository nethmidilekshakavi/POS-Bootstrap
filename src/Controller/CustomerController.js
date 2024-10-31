//add customer
import CustomerModel from "../models/CustomerModel.js";
import {customer_Array} from "../db/database.js";
import {loadcustomer} from "./OrderController.js";



const validateEmail = (email) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}

const validateTele = (num) =>{
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(num)
}

$("#save-customer").on('click',function (){


    let fn = $('#firstname').val();
    let ln = $('#lastname').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let num = $('#phone').val();


    if (fn.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid First Name!",
        });
    }
    else if (ln.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Last Name!",
        });
    }
    else if (address.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Address!",
        });
    }
    else if (fn.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid !",
        });
    }

    else if (!validateEmail(email)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Email!",
        });
    }
    else if (!validateTele(num)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Phone Number!",
        });
    }else {


        let customer = new CustomerModel(
            customer_Array.length + 1,

            fn, ln, address, email, num
        )

        customer_Array.push(customer)

        loadCustonerTable();

        $("#firstname").val("")
        $("#id").val("")
        $("#lastname").val("")
        $("#phone").val("")
        $("#address").val("")
        $("#email").val("")

        loadcustomer()

    }
});


const loadCustonerTable = () =>{

    $("#customerTableBody").empty();

    customer_Array.map((item,index) =>{

        console.log(item);

        let data =`<tr><td>${item.firstname}</td>$<td>${item.last_name}</td>$<td>${item.address}</td><td>${item.mobile}</td>$<td>${item.email}</td></tr>`

        $("#customerTabl" +
            "eBody").append(data)

    })
}

let seletc_customer_index = null;

$('#customerTableBody').on('click' , 'tr' ,function (){
    let index =  $(this).index()

    seletc_customer_index = $(this).index()

    let obiject =     customer_Array[index]



    console.log(obiject)


    //click and load table textFiled

    let id = obiject.id;
    let firstname =  obiject.firstname;
    let lastname =  obiject.last_name;
    let phone =  obiject.mobile;
    let address =  obiject.address;
    let email =  obiject.email;


    $("#firstname").val(firstname)
    $("#id").val(id)
    $("#lastname").val(lastname)
    $("#phone").val(phone)
    $("#address").val(address)
    $("#email").val(email)


})


// Update customer===============================================================================================
$("#update-customer").on('click', function () {
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        if (result.isConfirmed) {
            if (seletc_customer_index !== null) {
                let fn = $('#firstname').val();
                let ln = $('#lastname').val();
                let address = $('#address').val();
                let email = $('#email').val();
                let num = $('#phone').val();

                // Update selected customer details
                customer_Array[seletc_customer_index].first_name = fn;
                customer_Array[seletc_customer_index].last_name = ln;
                customer_Array[seletc_customer_index].address = address;
                customer_Array[seletc_customer_index].email = email;
                customer_Array[seletc_customer_index].mobile = num;

                clearFields();
                updateCustomerTable()
                seletc_customer_index = null; // Reset index

                Swal.fire("Saved!", "", "success");
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Select a customer",
                    text: "Please select a customer to update.",
                });
            }
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});

// Load customer table
const updateCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_Array.map((item) => {
        let data = `<tr><td>${item.firstname}</td><td>${item.last_name}</td><td>${item.address}</td><td>${item.mobile}</td><td>${item.email}</td></tr>`;
        $("#customerTableBody").append(data);
    });
};

// Handle row click
$('#customerTableBody').on('click', 'tr', function () {
    let index = $(this).index();
    seletc_customer_index = index;

    let object = customer_Array[index];
    $("#firstname").val(object.firstname);
    $("#id").val(object.id);
    $("#lastname").val(object.last_name);
    $("#phone").val(object.mobile);
    $("#address").val(object.address);
    $("#email").val(object.email);
});

// Clear input fields
const clearFields = () => {
    $("#firstname").val("");
    $("#id").val("");
    $("#lastname").val("");
    $("#phone").val("");
    $("#address").val("");
    $("#email").val("");
};


//delete======================================================================================================
$("#delete-customer").on("click", function() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {

        customer_Array.splice(seletc_customer_index,1);
        loadCustonerTable();

        $("#firstname").val("")
        $("#lastname").val("")
        $("#phone").val("")
        $("#address").val("")
        $("#email").val("")

        loadCustonerTable();


        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });

});

//clear======================================================================================================

$("#clear-customer").on("click", function() {


        $("#firstname").val("");
        $("#id").val("");
        $("#lastname").val("");
        $("#phone").val("");
        $("#address").val("");
        $("#email").val("");



});