//add customer

import CustomerModel from "../models/CustomerModel.js";

import {customer_Array} from "../db/database.js";

import {item_Array} from "../db/database.js";

import {Order_Array} from "../db/database.js";

const validateEmail = (email) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}

const validateTele = (num) =>{
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(num)
}

$("#save").on('click',function (){




    let fn = $('#Firstname').val();
    let ln = $('#Lastname').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let num = $('#phone').val();


   /* if (fn.length === 0) {
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

    else if (!validateEmail()) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Email!",
        });
    }
    else if (!validateTele()) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Phone Number!",
        });
    }
*/

    // let customer = customerArray + 1;

    let customer = new CustomerModel(

        customer_Array.length +1,

       fn,ln,address,email,num


    )








    customer_Array.push(customer)

    $("#FirstName").val("")
    $("#id").val("")
    $("#Lastname").val("")
    $("#phone").val("")
    $("#address").val("")
    $("#email").val("")

    loadCustonerTable();

});


const loadCustonerTable = () =>{

    $("#customerTableBody").empty();

    customer_Array.map((item,index) =>{

        console.log(item);

        let data =`<tr><td>${item.first_name}</td>$<td>${item.last_name}</td>$<td>${item.address}</td><td>${item.mobile}</td>$<td>${item.email}</td></tr>`

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
    let firstname =  obiject.fn;
    let lastname =  obiject.ln;
    let phone =  obiject.mobile;
    let address =  obiject.address;
    let email =  obiject.email;


    $("#FirstName").val(firstname)
    $("#id").val(id)
    $("#Lastname").val(lastname)
    $("#phone").val(phone)
    $("#address").val(address)
    $("#email").val(email)


})

// Update button functionality
/*$("#u").on("click", function() {
    if (selectedCustomerIndex !== undefined) {
        let first_name = $('#firstName').val();
        let last_name = $('#lastName').val();
        let mobile = $('#mobile').val();
        let email = $('#email').val();
        let address = $('#address').val();

        // Update the selected customer
        customer_array[selectedCustomerIndex] = {
            id: selectedCustomerIndex + 1,
            first_name,
            last_name,
            mobile,
            email,
            address
        };

        loadCustomerTable(); // Refresh the table
        selectedCustomerIndex = undefined; // Reset selection
        $('#customerForm')[0].reset(); // Clear the form
    } else {
        alert("Please select a customer to update.");
    }
});*/


$("#update").on("click", function() {


    let index = seletc_customer_index;


    let fn = $('#Firstname').val();
    let ln = $('#Lastname').val();
    let address = $('#address').val();
    let email = $('#email').val();
    let num = $('#phone').val();


    customerArray[index] = {

        id: index[0].id,
        fn: fn,
        ln: ln,
        address: address,
        mobile: num,
        email: email

    }

    customerArray.push(index)

    loadCustonerTable();
    seletc_customer_index = undefined;
    $('#customerTableBody')[0].reset();


})

//delete
$("#delete").on("click", function() {


    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {

        customerArray.splice(seletc_customer_index,1);
        loadCustonerTable();

        $("#Firstname").val("")
        $("#Lastname").val("")
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
