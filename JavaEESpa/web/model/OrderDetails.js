function Details(oId, code, cusId, name, price, qty, total) {
    var __orderId = oId;
    var __code = code;
    var __cusId = cusId;
    var __name = name;
    var __price = price;
    var __qty = qty;
    var __total = total;

    this.getOrderDetailId = function () {
        return __orderId;
    }
    this.setOrderDetailId = function (id) {
        __orderId = id;
    }
    this.getOrderDetailCode = function () {
        return __code;
    }
    this.setOrderDetailCode = function (id) {
        __code = id;
    }
    this.getOrderDetailCusId = function () {
        return __cusId;
    }
    this.setOrderDetailCusId = function (id) {
        __cusId = id;
    }
    this.getOrderDetailName = function () {
        return __name;
    }
    this.setOrderDetailName = function (name) {
        __name = name;
    }
    this.getOrderDetailPrice = function () {
        return __price;
    }
    this.setOrderDetailPrice = function (price) {
        __price = price;
    }
    this.getOrderDetailQty = function () {
        return __qty;
    }
    this.setOrderDetailQty = function (qty) {
        __qty = qty;
    }
    this.getOrderDetailTotal = function () {
        return __total;
    }
    this.setOrderDetailTotal = function (total) {
        __total = total;
    }
}
