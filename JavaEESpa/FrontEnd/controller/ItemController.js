var itemCod = 0;
var itemNam = 0;
var itemQt = 0;
var itemPric = 0;

go()
loadAllItems();
/*START FUNCTIONS*/

function saveItem() {
    var itemOb = {
        code: $("#itemCode").val(),
        name: $("#itemName").val(),
        qty: $("#itemQty").val(),
        price: $("#itemPrice").val()
    }

    $.ajax({
        url: "http://localhost:8080/unnamed/item",

        method: "POST",
        contentType: "application/json", //request content type json
        data: JSON.stringify(itemOb),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllItems();
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

function clearAllItems() {
    $('#itemCode,#itemName,#itemQty,#itemPrice').val("");
    $('#itemCode,#itemName,#itemQty,#itemPrice').css('border', '2px solid #ced4da');
    $('#itemCode').focus();
    $("#saveItem").attr('disabled', true);
    loadAllItems();
}

function loadAllItems() {
    $("#itemTable").empty();
    $.ajax({
        url: "http://localhost:8080/unnamed/item?option=" + "GETALL",
        method: "GET",
        /*option: "GETALL",*/
        success: function (resp) {
            for (const item of resp.data) {
                let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;
                $("#itemTable").append(row);
            }


            for (const item of resp.data) {
                var itemObject = {
                    code: item.code,
                    name: item.name,
                    qty: item.qty,
                    price: item.price
                };
                itemDB.push(itemObject);
            }

            for (var i = 0; i < itemDB.length; i++) {
                var x = 0;
                for (var z = 0; z < itemDB.length; z++) {
                    if (i > 0) {
                        if (itemDB[z] == itemDB[i]) {

                            x = 1;
                        }
                    }
                    if (x == 0) {

                        let option = document.createElement("option");
                        option.value = itemDB[i].code;
                        option.text = itemDB[i].code;
                        itemMenu.add(option);
                    }
                }
            }

            bindClickEventsItem();
        }
    });
}

/*
function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == id) {
            return itemDB[i];
        }
    }
}
*/

$("#updateItem").click(function () {
    var itemOb = {
        code: $("#itemCode").val(),
        name: $("#itemName").val(),
        qty: $("#itemQty").val(),
        price: $("#itemPrice").val()
    }

    $.ajax({
        url: "http://localhost:8080/unnamed/item",
        method: "PUT",
        contentType: "application/json", //request content type json
        data: JSON.stringify(itemOb),
        success: function (res) {
            if (res.status == 200) {
                alert(res.message);
                loadAllItems();
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

function bindClickEventsItem() {
    $("#itemTable>tr").click(function () {

        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
        let price = $(this).children().eq(3).text();

        $("#itemCode").val(code);
        $("#itemName").val(name);
        $("#itemQty").val(qty);
        $("#itemPrice").val(price);
    });
}


//Delete item
$("#deleteItem").click(function () {
    let itemCode = $("#itemCode").val();

    $.ajax({
        url: "http://localhost:8080/unnamed/item?code=" + itemCode,
        method: "DELETE",
        success: function (res) {

            if (res.status == 200) {
                alert(res.message);
                loadAllItems();
            } else if (res.status == 400) {
                alert(res.data);
            } else {
                alert(res.data);
            }

        },
        error: function (ob, status, t) {

        }
    });
});

function saveItemNow() {
    saveItem();
    clearAllItems();
    loadAllItems();
}

/*END FUNCTIONS*/

/*EVENT START*/

$("#itemCode").keydown(function (event) { // event data object
    if (event.key == "Enter") {
        $("#itemName").focus();
    }
});

$("#itemName").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        $("#itemQty").focus();
    }
});

$("#itemQty").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        $("#itemPrice").focus();
    }
});

$("#itemPrice").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        saveItemNow();
    }
});

$("#saveItem").click(function () {
    saveItemNow();
});

$("#clearItem").click(function () {
    clearAllItems();
    saveItemNow();
});

function searchItem(){
    console.log("searchItem")


    var searchID = $("#exampleInputEmail11").val();

    console.log("search")
    console.log(searchID)
    $.ajax({
        url: "http://localhost:8080/unnamed/item?code=" + searchID+"&option=SEARCH",
        method: "GET",


        success: function (resp) {
            $("#itemTable").empty();
            for (const item of resp.data) {
                let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;
                $("#itemTable").append(row);
            }
        }

    });
}

$("#viewAllitem").click(function () {
    loadAllItems();
});

$("#searchItem").click(function () {

    searchItem()

});

/*END EVENTS*/

/*START REGEX*/
// validation Item


var regExItemCode = /^(I00-)[0-9]{3,4}$/;
$("#itemCode").keyup(function () {
    let input = $("#itemCode").val();
    if (regExItemCode.test(input)) {
        $("#itemCode").css('border', '2px solid green');
        itemCod = 1;
        go();
        $("#error5").text("Success");
    } else {
        $("#itemCode").css('border', '2px solid red');
        itemCod = 0;
        go()
        $("#error5").text("Wrong format : I00-001");
    }
});

function go(){
    const saveItemBtn = document.getElementById("saveItem");
    const updateItemBtn = document.getElementById("updateItem");
    saveItemBtn.disabled = true;
    updateItemBtn.disabled = true;
    var isTrue = (itemCod + itemNam + itemQt + itemPric) == 4;
    if (isTrue) {
        saveItemBtn.disabled = false;
        updateItemBtn.disabled = false;
    }
}

var regExItemName = /^[A-Za-z][A-Za-z0-9_]{4,20}$/;
$("#itemName").keyup(function () {
    let input = $("#itemName").val();
    if (regExItemName.test(input)) {
        $("#itemName").css('border', '2px solid green');
        itemNam = 1;
        go()
        $("#error6").text("Success");
    } else {
        $("#itemName").css('border', '2px solid red');
        itemNam = 0;
        go()
        $("#error6").text("Wrong format : redRice");
    }
});

var regExItemQty = /^[1-9][0-9]{0,2}$/;
$("#itemQty").keyup(function () {
    let input = $("#itemQty").val();
    if (regExItemQty.test(input)) {
        $("#itemQty").css('border', '2px solid green');
        itemQt = 1;
        go()
        $("#error7").text("Success");
    } else {
        $("#itemQty").css('border', '2px solid red');
        itemQt = 0;
        go()
        $("#error7").text("Wrong format : 98");
    }
});

var regExItemPrice = /^[1-9][0-9]{1,3}([.][0-9]{2})?$/;
$("#itemPrice").keyup(function () {
    let input = $("#itemPrice").val();
    if (regExItemPrice.test(input)) {
        $("#itemPrice").css('border', '2px solid green');
        itemPric = 1;
        go()
        $("#error8").text("Success");
    } else {
        $("#itemPrice").css('border', '2px solid red');
        itemPric = 0;
        go()
        $("#error8").text("Wrong format : 100 / 100.00");
    }
});

/*END REGEX*/

