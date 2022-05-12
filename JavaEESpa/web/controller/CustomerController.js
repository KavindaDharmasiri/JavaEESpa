/*METHOD CALLING*/
enableBtn();
loadAllCustomers();

/*START FUNCTIONS*/

function saveCustomer() {
    var cusOb = {
        id: $("#custId").val(),
        name: $("#custName").val(),
        address: $("#custAddress").val(),
        salary: $("#custTP").val()
    }

    $.ajax({
        url: "customer",
        method: "POST",
        contentType: "application/json", //request content type json
        data: JSON.stringify(cusOb),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
            } else if (res.status == 400) {
                alert(res.message);
            } else {
                alert(res.data);
            }
        },
        error: function (ob, errorStus) {

        }
    });
}

function clearAll() {
    $('#custId,#custName,#custAddress,#custTP').val("");
    $('#custId,#custName,#custAddress,#custTP').css('border', '2px solid #ced4da');
    $('#custId').focus();
    $("#saveCustomer").attr('disabled', true);
    loadAllCustomers();
}

function loadAllCustomers() {
    $("#customerTable").empty();
    $.ajax({
        url: "customer?CusName=" + "GETALL",
        method: "GET",

        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
                $("#customerTable").append(row);
            }

            for (const customer of resp.data) {

                var customerObject = {
                    id: customer.id,
                    name: customer.name,
                    address: customer.address,
                    salary: customer.salary
                };
                customerDB.push(customerObject);
            }


            for (var i = 0; i < customerDB.length; i++) {

                var x = 0;
                for (var z = 0; z < customerDB.length; z++) {
                    if (i > 0) {
                        if (customerDB[z] == customerDB[i]) {

                            x = 1;
                        }
                    }
                    if (x == 0) {

                        let option = document.createElement("option");
                        option.value = customerDB[i].id;
                        option.text = customerDB[i].id;
                        menu.add(option);
                    }
                }
            }

            bindClickEvents();
        }
    });
}


$("#updateCustomer").click(function () {

    var cusOb = {
        id: $("#custId").val(),
        name: $("#custName").val(),
        address: $("#custAddress").val(),
        salary: $("#custTP").val()
    }

    $.ajax({
        url: "customer",
        method: "PUT",
        contentType: "application/json", //request content type json
        data: JSON.stringify(cusOb),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
            } else if (res.status == 400) {
                alert(res.message);
            } else {
                alert(res.data);
            }
        },
        error: function (ob, errorStus) {
        }
    });
});

$("#deleteCustomer").click(function () {
    deleteCustomer();
});

function deleteCustomer() {
    let custId = $("#custId").val();

    $.ajax({
        url: "customer?CusID=" + custId,
        method: "DELETE",
        success: function (res) {

            if (res.status == 200) {
                alert(res.message);
                loadAllCustomers();
            } else if (res.status == 400) {
                alert(res.data);
                loadAllCustomers()
            } else {
                alert(res.data);
                loadAllCustomers()
            }

        },
        error: function (ob, status, t) {
        }
    });
}

function bindClickEvents() {
    $("#customerTable>tr").click(function () {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        $("#custId").val(id);
        $("#custName").val(name);
        $("#custAddress").val(address);
        $("#custTP").val(salary);
    });
}

function saveCus() {
    saveCustomer();
    clearAll();
    loadAllCustomers();

}

function enableBtn() {
    const saveCustomerBtn = document.getElementById("saveCustomer");
    const updateCustomerBtn = document.getElementById("updateCustomer");
    saveCustomerBtn.disabled = true;
    updateCustomerBtn.disabled = true;
    var isTrue = (cuId + cuName + cuAddress + cuTp) == 4;
    if (isTrue) {
        saveCustomerBtn.disabled = false;
        updateCustomerBtn.disabled = false;
    }
}

/*END FUNCTIONS*/

/*START EVENTS*/

$("#custId").keydown(function (event) { // event data object

    if (event.key == "Enter") {
        if (cuId == 1) {
            $("#custName").focus();
        } else {
            alert("wrong Input");
        }
    }
});

$("#custName").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        if (cuName == 1) {
            $("#custAddress").focus();
        } else {
            alert("Wrong Input");
        }
    }
});

$("#custAddress").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        if (cuAddress == 1) {
            $("#custTP").focus();
        } else {
            alert("Wrong Input");
        }
    }
});

$("#custTP").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        if (cuTp == 1) {
            saveCus();
        } else {
            alert("Wrong Input");
        }
    }
});

$("#clearCustomer").click(function () {
    clearAll();
    saveCus();
});

function searchCustomer(){
    console.log("searchCus")


    var searchID = $("#customerIdSearch").val();

    console.log("search")
    console.log(searchID)
    $.ajax({
        url: "customer?cusId=" + searchID,
        method: "GET",

        success: function (resp) {
            $("#customerTable").empty();
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
                $("#customerTable").append(row);
            }
        }

    });

}


$("#viewAllCus").click(function () {
    loadAllCustomers()
});

$("#searchCustomer").click(function () {
    searchCustomer()
});

$("#saveCustomer").click(function () {
    saveCus();
});

/*START REGEX*/
// validation Customer

var cuId = 0;
var regExCusID = /^(C00-)[0-9]{3,4}$/;
$("#custId").keyup(function () {
    let input = $("#custId").val();
    if (regExCusID.test(input)) {
        $("#custId").css('border', '2px solid green');
        cuId = 1;
        enableBtn();
        $("#error").text("Success");
    } else {
        $("#custId").css('border', '2px solid red');
        cuId = 0;
        enableBtn();
        $("#error").text("Wrong format : C00-001");
    }
});

var cuName = 0;
var regExCusName = /^[A-Za-z][A-Za-z_]{3,30}$/;
$("#custName").keyup(function () {
    let input = $("#custName").val();
    if (regExCusName.test(input)) {
        $("#custName").css('border', '2px solid green');
        cuName = 1;
        enableBtn();
        $("#error1").text("Success");
    } else {
        $("#custName").css('border', '2px solid red');
        cuName = 0;
        enableBtn();
        $("#error1").text("Wrong format : Kavinda");
    }
});

var cuAddress = 0;
var regExCusAddress = /^[a-zA-Z0-9]{4,}[ ][a-zA-Z]{4,}$/;
$("#custAddress").keyup(function () {
    let input = $("#custAddress").val();
    if (regExCusAddress.test(input)) {
        $("#custAddress").css('border', '2px solid green');
        cuAddress = 1;
        enableBtn();
        $("#error2").text("Success");
    } else {
        $("#custAddress").css('border', '2px solid red');
        cuAddress = 0;
        enableBtn();
        $("#error2").text("Wrong format : Galle Mapalagama");
    }
});

var cuTp = 0;
var regExCusTp = /^(077|071|078|075|076|072|074)[-]?[0-9]{7}$/;
$("#custTP").keyup(function () {
    let input = $("#custTP").val();
    if (regExCusTp.test(input)) {
        $("#custTP").css('border', '2px solid green');
        cuTp = 1;
        enableBtn();
        $("#error3").text("Success");
    } else {
        $("#custTP").css('border', '2px solid red');
        cuTp = 0;
        enableBtn();
        $("#error3").text("Wrong format : 0710000000");
    }
});

/*END REGEX*/
