function Order(code, name, price, qty, total) {
    var __code = code;
    var __name = name;
    var __price = price;
    var __qty = qty;
    var __total = total;

    this.getOrderCode = function () {
        return __code;
    }
    this.setOrderCode = function (id) {
        __code = id;
    }
    this.getOrderName = function () {
        return __name;
    }
    this.setOrderName = function (name) {
        __name = name;
    }
    this.getOrderPrice = function () {
        return __price;
    }
    this.setOrderPrice = function (price) {
        __price = price;
    }
    this.getOrderQty = function () {
        return __qty;
    }
    this.setOrderQty = function (qty) {
        __qty = qty;
    }
    this.getOrderTotal = function () {
        return __total;
    }
    this.setOrderTotal = function (total) {
        __total = total;
    }
}
