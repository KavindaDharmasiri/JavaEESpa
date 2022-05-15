/*VARIABLES*/

var menu = document.getElementById("customerMenu");
var itemMenu = document.getElementById("itemMenu");
var itemCod2 = 0;
var itemNam2 = 0;
var itemQt2 = 0;
var itemPric2 = 0;
var itemCode;
var pric = 0;
var itemPric3 = 0;
var orderCod5 = 0;
var date = 1;

var itemQt = 0;

var cuName2 = 0;
var cuAddress2 = 0;
var cuTp2 = 1;
var cuId2 = 0;
var OId2 = 0;

var nextPrice = 0;

/*END VARIABLE*/

/*METHOD CALL*/

enableItemBtn();
enableItemBtn2();

/*END METHOD CALL*/

/*START FUNCTIONS*/

function ddlselect() {

    var display = menu[menu.selectedIndex].text;

    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == display) {
            var cus = new Customer(customerDB[i].id, customerDB[i].name, customerDB[i].address, customerDB[i].salary);
            $("#exampleInputEmail5").val(cus.getCustomerID());
            $("#exampleInputEmail3").val(cus.getCustomerName());
            $("#exampleInputEmail7").val(cus.getCustomerAddress());
            $("#exampleInputEmail6").val(cus.getCustomerTp());
            orderDB.splice(0, orderDB.length);
            validateCustomer();
        }
    }
    getId();
    //valDate()
}

function saveOd() {
    saveOrderDetail();
    clearAllorder();
}

function ddlItemselect() {
    var display = itemMenu[itemMenu.selectedIndex].text;
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == display) {
            var item = new Item(itemDB[i].code, itemDB[i].name, itemDB[i].qty, itemDB[i].price);
            $("#exampleInputEmail9").val(item.getItemCode());
            $("#exampleInputEmail10").val(item.getItemName());
            $("#exampleInputEmail12").val(item.getItemQty());
            $("#exampleInputEmail41").val(item.getItemPrice());
            itemCode = item.getItemCode();
            validate();
        }
    }
}

function changePrice2() {
    var temp = $("#exampleInputEmail13").val();
    var Opric = $("#exampleInputEmail41").val();
    var temp2 = $("#discount").val();
    pric = 0;
    temp = parseInt(temp);
    Opric = parseInt(Opric);
    pric += temp * Opric;
}

function changePrice() {
    var lec = 0;
    for (var i = 0; i < orderDB.length; i++) {
        lec += parseInt(orderDB[i].total);
    }
    if (orderDB.length == 1) {
        orderDB[0].total
        lec = orderDB[0].total;
    }
    var temp = $("#exampleInputEmail13").val();
    var Opric = $("#exampleInputEmail41").val();
    var temp2 = $("#discount").val();
    pric = 0;
    temp = parseInt(temp);
    Opric = parseInt(Opric);
    pric += temp * Opric;
    nextPrice = lec / parseInt(temp2);
    document.getElementById("allPrice").innerHTML = lec;
    document.getElementById("subtotal").innerHTML = nextPrice;
}

function getId() {

    var orderDetailDB = [];

    $.ajax({
        url:"http://localhost:8080/unnamed/order?option=" + "GETID",
        method: "GET",
        /*option: "GETALL",*/
        success: function (resp) {
            for (const order of resp.data) {
                console.log(order.id)
                $("#exampleInputEmail40").val(order.id);
            }
        }
    });
}

function calculate() {
    var temp = $("#exampleInputEmail14").val();
    if (nextPrice <= temp) {
        $("#exampleInputEmail14").css('border', '2px solid green');
        itemPric3 = 1;
        enableItemBtn2();
        $("#error20").text("Success");
        $("#balance").val(temp - nextPrice);
    } else {
        $("#exampleInputEmail14").css('border', '2px solid red');
        $("#error20").text("Insufficient Credit");
        $("#balance").val(temp - nextPrice);
        itemPric3 = 0;
        enableItemBtn2();
    }
}

function searchOrder() {
    console.log("searchOrder")

    var searchID = $("#exampleInputEmail40").val();

    console.log("search")
    console.log(searchID)
    $.ajax({
        url: "http://localhost:8080/unnamed/order?oId=" + searchID+"&option="+"SEARCH" ,
        method: "GET",


        success: function (resp) {
            $("#orderTbl").empty();
            for (const order of resp.data) {
                console.log(order.code+"asssss")
                let row = `<tr><td>${order.code}</td><td>${order.cusname}</td><td>${order.price}</td><td>${order.qty}</td><td>${order.total}</td></tr>`;
                $("#orderTbl").append(row);
            }
        }

    });
}

function validate() {
    var regExItemCode = /^(I00-)[0-9]{3,4}$/;
    let input = $("#exampleInputEmail9").val();
    if (regExItemCode.test(input)) {
        $("#exampleInputEmail9").css('border', '2px solid green');
        itemCod2 = 1;
        enableItemBtn();
        $("#error13").text("Success");
    } else {
        $("#exampleInputEmail9").css('border', '2px solid red');
        itemCod2 = 0;
        enableItemBtn();
        $("#error13").text("Wrong format : I00-001");
    }

    var regExItemName = /^[A-Za-z][A-Za-z0-9_]{4,20}$/;
    let input1 = $("#exampleInputEmail10").val();
    if (regExItemName.test(input1)) {
        $("#exampleInputEmail10").css('border', '2px solid green');
        itemNam2 = 1;
        enableItemBtn();
        $("#error14").text("Success");
    } else {
        $("#exampleInputEmail10").css('border', '2px solid red');
        itemNam2 = 0;
        enableItemBtn();
        $("#error14").text("Wrong format : redRice");
    }

    var regExItemQty = /^[1-9][0-9]{0,2}$/;
    let input2 = $("#exampleInputEmail12").val();
    if (regExItemQty.test(input2)) {
        $("#exampleInputEmail12").css('border', '2px solid green');
        itemQt2 = 1;
        enableItemBtn();
        $("#error16").text("Success");
    } else {
        $("#exampleInputEmail12").css('border', '2px solid red');
        itemQt2 = 0;
        enableItemBtn();
        $("#error16").text("Wrong format : 98");
    }

    var regExItemPrice = /^[1-9][0-9]{1,3}([.][0-9]{2})?$/;
    let input3 = $("#exampleInputEmail41").val();
    if (regExItemPrice.test(input3)) {
        $("#exampleInputEmail41").css('border', '2px solid green');
        itemPric2 = 1;
        enableItemBtn();
        $("#error15").text("Success");
    } else {
        $("#exampleInputEmail41").css('border', '2px solid red');
        itemPric2 = 0;
        enableItemBtn();
        $("#error15").text("Wrong format : 100 / 100.00");
    }
}

function validateOId() {
    var regExOrderID = /^(O00-)[0-9]{3,4}$/;
    let input20 = $("#exampleInputEmail40").val();
    if (regExOrderID.test(input20)) {
        $("#exampleInputEmail40").css('border', '2px solid green');
        orderCod5 = 1;
        enableBtn();
    } else {
        $("#exampleInputEmail40").css('border', '2px solid red');
        orderCod5 = 0;
        enableBtn();
    }
}

function validateCustomer() {
    var regExCusID = /^(C00-)[0-9]{3,4}$/;
    let input = $("#exampleInputEmail5").val();
    if (regExCusID.test(input)) {
        $("#exampleInputEmail5").css('border', '2px solid green');
        cuId2 = 1;
        enableBtn();
    } else {
        $("#exampleInputEmail5").css('border', '2px solid red');
        cuId2 = 0;
        enableBtn();
    }

    var regExCusName = /^[A-Za-z][A-Za-z_]{3,30}$/;
    let input6 = $("#exampleInputEmail3").val();
    if (regExCusName.test(input6)) {
        $("#exampleInputEmail3").css('border', '2px solid green');
        cuName2 = 1;
        enableBtn();
    } else {
        $("#exampleInputEmail3").css('border', '2px solid red');
        cuName2 = 0;
        enableBtn();
    }

    var regExCusAddress = /^[a-zA-Z0-9]{4,}[ ][a-zA-Z]{4,}$/;
    let input7 = $("#exampleInputEmail7").val();
    if (regExCusAddress.test(input7)) {
        $("#exampleInputEmail7").css('border', '2px solid green');
        cuAddress2 = 1;
        enableBtn();
    } else {
        $("#exampleInputEmail7").css('border', '2px solid red');
        cuAddress2 = 0;
        enableBtn();
    }

    /*var regExCusTp = /^(077|071|078|075|076|072|074)[-]?[0-9]{7}$/;
    let input8 = $("#exampleInputEmail6").val();
    if (regExCusTp.test(input8)) {
        $("#exampleInputEmail6").css('border', '2px solid green');
        cuTp2 = 1;
        enableBtn();
    } else {
        $("#exampleInputEmail6").css('border', '2px solid red');
        cuTp2 = 0;
        enableBtn();
    }*/
}

function enableItemBtn() {
    const saveItemBtn = document.getElementById("addBtn");
    saveItemBtn.disabled = true;
    var isTrue = (date + itemCod2 + itemNam2 + itemQt2 + itemPric2 + itemQt + cuId2 + cuName2 + cuAddress2 + cuTp2 + OId2) == 10;
    if (isTrue) {
        saveItemBtn.disabled = false;
    }
}

function enableItemBtn2() {
    const saveItemBtn = document.getElementById("btnPurchase");
    saveItemBtn.disabled = true;
    var isTrue = (itemdic + itemPric3) == 2;
    if (isTrue) {
        saveItemBtn.disabled = false;
    }
}

function saveOrder() {
    var order = new Order($("#exampleInputEmail9").val(), $("#exampleInputEmail10").val(), $("#exampleInputEmail41").val(), $("#exampleInputEmail13").val(), pric);
    changePrice();
    var orderObject = {
        code: order.getOrderCode(),
        name: order.getOrderName(),
        price: order.getOrderPrice(),
        qty: order.getOrderQty(),
        total: order.getOrderTotal()
    };
    if (orderDB.length > 0) {
        for (var i = 0; i < orderDB.length; i++) {
            if (orderObject.code == orderDB[i].code) {
                orderDB[i].qty = parseInt(orderDB[i].qty) + parseInt(orderObject.qty);
                orderDB[i].total += orderObject.qty * orderObject.price;
                $("#orderTbl").empty();
                for (var i of orderDB) {
                    let row = `<tr><td>${i.code}</td><td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td><td>${i.total}</td></tr>`;
                    $("#orderTbl").append(row);
                }
                return
            }
        }
        orderDB.push(orderObject);
    } else {
        orderDB.push(orderObject);
    }
    $("#orderTbl").empty();
    for (var i of orderDB) {
        let row = `<tr><td>${i.code}</td><td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td><td>${i.total}</td></tr>`;
        $("#orderTbl").append(row);
    }
}

function saveOrderDetail() {

    for (var i = 0; i < orderDB.length; i++) {

        var orderOb = {
            Oid: $("#exampleInputEmail40").val(),
            code: orderDB[i].code,
            cId: $("#exampleInputEmail5").val(),
            name: orderDB[i].name,
            price: parseInt(orderDB[i].price),
            qty: parseInt(orderDB[i].qty),
            total: parseInt(orderDB[i].total)
        };

        $.ajax({
            url: "http://localhost:8080/unnamed/order",
            method: "POST",
            contentType: "application/json", //request content type json
            data: JSON.stringify(orderOb),
            success: function (res) {
                if (res.status == 200) {
                    alert(res.message);
                } else if (res.status == 400) {
                    alert(res.message);
                } else {
                    alert(res.data);
                }
            },
            error: function (ob, errorStus) {

            }
        });

        /*orderDetailDB.push(orderObject);*/
    }

    $("#orderTbl").empty();
    $.ajax({
        url: "http://localhost:8080/unnamed/order?cId=" + "GETALL",
        method: "GET",

        success: function (resp) {
            for (var i of orderDetailDB) {
                let row = `<tr><td>${i.code}</td><td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td><td>${i.total}</td></tr>`;
                $("#orderTbl").append(row);
            }
        }
    });


}

function clearAllorder() {
    $('#exampleInputEmail4,#exampleInputEmail5,#exampleInputEmail3,#exampleInputEmail6,#exampleInputEmail7,#exampleInputEmail9,#exampleInputEmail10,#exampleInputEmail41,#exampleInputEmail12,#exampleInputEmail13,#exampleInputEmail14,#discount,#balance').val("");
    $('#exampleInputEmail4,#exampleInputEmail5,#exampleInputEmail3,#exampleInputEmail6,#exampleInputEmail7,#exampleInputEmail9,#exampleInputEmail10,#exampleInputEmail41,#exampleInputEmail12,#exampleInputEmail13,#exampleInputEmail14,#discount,#balance').css('border', '2px solid #ced4da');
    $("#addBtn,#btnPurchase").attr('disabled', true);
    orderDB.splice(0, orderDB.length - 1);
    $("#orderTbl").empty();
    pric = 0;
    document.getElementById("allPrice").innerHTML = pric;
    document.getElementById("subtotal").innerHTML = pric;
}

/*END FUNCTIONS*/

/*START EVENTS*/

$("#discount").keydown(function (event) { // event data object

    if (event.key == "Enter") {
        if (itemdic == 1) {
            $("#exampleInputEmail14").focus();
        } else {
            alert("wrong Input");
        }
    }
});

$("#exampleInputEmail14").keydown(function (event) { // event data object

    if (event.key == "Enter") {
        if (itemPric3 == 1) {
            saveOd();
        } else {
            alert("wrong Input");
        }
    }
});

$("#addBtn").click(function () {
    changePrice2();
    saveOrder();
    changePrice();
    $("#discount").focus();
});

$("#btnPurchase").click(function () {
    saveOd();
});

$("#exampleInputEmail13").keydown(function (event) { // event data object
    if (event.key == "Enter") { // if the enter key press
        if (cuAddress == 1) {
            changePrice();
            saveOrder();
            $("#discount").focus();
        } else {
            alert("Wrong Input");
        }
    }
});

/*END EVENTS*/

/*START REGEX*/

var regExItemQty = /^[1-9][0-9]{0,2}$/;
$("#exampleInputEmail13").keyup(function () {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == itemCode) {
            let input = $("#exampleInputEmail13").val();
            if (regExItemQty.test(input)) {
                $("#exampleInputEmail13").css('border', '2px solid green');
                itemQt = 1;
                enableItemBtn();
                var temp = $("#exampleInputEmail13").val();
                var q = itemDB[i].qty;
                if (temp > q) {
                    $("#exampleInputEmail13").css('border', '2px solid red');
                    itemQt = 0;
                    enableItemBtn();
                    $("#error11").text("insu");
                    return
                }
                $("#error11").text("Success");
            } else {
                $("#exampleInputEmail13").css('border', '2px solid red');
                itemQt = 0;
                enableItemBtn();
                $("#error11").text("Wrong format");
            }
        }
    }
});

var itemdic = 0;
var regExItemdis = /^[1-9][0-9]{0,1}$/;
$("#discount").keyup(function () {
    let input = $("#discount").val();
    if (regExItemdis.test(input)) {
        $("#discount").css('border', '2px solid green');
        itemdic = 1;
        enableItemBtn2();
        $("#error12").text("Success");
        changePrice();
    } else {
        $("#discount").css('border', '2px solid red');
        itemdic = 0;
        enableItemBtn2();
        $("#error12").text("Wrong format : 10");
    }
});

var regExItemPrice2 = /^[1-9][0-9]{1,3}([.][0-9]{2})?$/;
$("#exampleInputEmail14").keyup(function () {
    let input = $("#exampleInputEmail14").val();
    if (regExItemPrice2.test(input)) {
        $("#exampleInputEmail14").css('border', '2px solid green');
        $("#error20").text("Success");
        itemPric3 = 1;
        enableItemBtn2();
        calculate();
    } else {
        $("#exampleInputEmail14").css('border', '2px solid red');
        itemPric3 = 0;
        enableItemBtn2();
        $("#error20").text("Wrong format : 100 / 100.00");
    }
});

// validation Item

var regExItemCode = /^(I00-)[0-9]{3,4}$/;
$("#exampleInputEmail9").keyup(function () {
    let input = $("#exampleInputEmail9").val();
    itemQt = 0;
    if (regExItemCode.test(input)) {
        $("#exampleInputEmail9").css('border', '2px solid green');

        itemCod2 = 1;
        enableItemBtn();
        $("#error13").text("Success");
    } else {
        $("#exampleInputEmail9").css('border', '2px solid red');
        itemCod2 = 0;
        enableItemBtn();
        $("#error13").text("Wrong format : I00-001");
    }
});

var regExOrderCode = /^(O00-)[0-9]{3,4}$/;
$("#exampleInputEmail40").keyup(function () {
    let input = $("#exampleInputEmail40").val();
    if (regExOrderCode.test(input)) {
        $("#exampleInputEmail40").css('border', '2px solid green');
        orderCod5 = 1;
        enableItemBtn();
    } else {
        $("#exampleInputEmail40").css('border', '2px solid red');
        orderCod5 = 0;
        enableItemBtn();
    }
});

var regExItemName = /^[A-Za-z][A-Za-z0-9_]{4,20}$/;
$("#exampleInputEmail10").keyup(function () {
    let input = $("#exampleInputEmail10").val();
    if (regExItemName.test(input)) {
        $("#exampleInputEmail10").css('border', '2px solid green');
        itemNam2 = 1;
        enableItemBtn();
        $("#error14").text("Success");
    } else {
        $("#exampleInputEmail10").css('border', '2px solid red');
        itemNam2 = 0;
        enableItemBtn();
        $("#error14").text("Wrong format : redRice");
    }
});

var regExItemQty = /^[1-9][0-9]{0,2}$/;
$("#exampleInputEmail12").keyup(function () {
    let input = $("#exampleInputEmail12").val();
    if (regExItemQty.test(input)) {
        $("#exampleInputEmail12").css('border', '2px solid green');
        itemQt2 = 1;
        enableItemBtn();
        $("#error16").text("Success");
    } else {
        $("#exampleInputEmail12").css('border', '2px solid red');
        itemQt2 = 0;
        enableItemBtn();
        $("#error16").text("Wrong format : 98");
    }
});

var regExItemPrice = /^[1-9][0-9]{1,3}([.][0-9]{2})?$/;
$("#exampleInputEmail41").keyup(function () {
    let input = $("#exampleInputEmail41").val();
    if (regExItemPrice.test(input)) {
        $("#exampleInputEmail41").css('border', '2px solid green');
        itemPric2 = 1;
        enableItemBtn();
        $("#error15").text("Success");
    } else {
        $("#exampleInputEmail41").css('border', '2px solid red');
        itemPric2 = 0;
        enableItemBtn();
        $("#error15").text("Wrong format : 100 / 100.00");
    }
});

// validation Customer

var regExCusID = /^(C00-)[0-9]{3,4}$/;
$("#exampleInputEmail5").keyup(function () {
    let input = $("#custId").val();
    if (regExCusID.test(input)) {
        $("#exampleInputEmail5").css('border', '2px solid green');
        cuId2 = 1;
        enableBtn();
    } else {
        $("#exampleInputEmail5").css('border', '2px solid red');
        cuId2 = 0;
        enableBtn();
    }
});

$("#exampleInputEmail40").keyup(function () {
    searchOrder();
});

var regExCusName = /^[A-Za-z][A-Za-z_]{3,30}$/;
$("#exampleInputEmail3").keyup(function () {
    let input = $("#exampleInputEmail3").val();
    if (regExCusName.test(input)) {
        $("#exampleInputEmail3").css('border', '2px solid green');
        cuName2 = 1;
        enableBtn();
    } else {
        $("#exampleInputEmail3").css('border', '2px solid red');
        cuName2 = 0;
        enableBtn();
    }
});

var regExCusAddress = /^[a-zA-Z0-9]{4,}[ ][a-zA-Z]{4,}$/;
$("#exampleInputEmail7").keyup(function () {
    let input = $("#exampleInputEmail7").val();
    if (regExCusAddress.test(input)) {
        $("#exampleInputEmail7").css('border', '2px solid green');
        cuAddress2 = 1;
        enableBtn();
    } else {
        $("#exampleInputEmail7").css('border', '2px solid red');
        cuAddress2 = 0;
        enableBtn();
    }
});

/*var regExCusTp = /^(077|071|078|075|076|072|074)[-]?[0-9]{7}$/;
$("#exampleInputEmail16").keyup(function () {
    let input = $("#exampleInputEmail16").val();
    if (regExCusTp.test(input)) {
        $("#exampleInputEmail16").css('border', '2px solid green');
        cuTp2 = 1;
        enableBtn();
    } else {
        $("#exampleInputEmail16").css('border', '2px solid red');
        cuTp2 = 1;
        enableBtn();
    }
});*/

/*END REGEX*/


