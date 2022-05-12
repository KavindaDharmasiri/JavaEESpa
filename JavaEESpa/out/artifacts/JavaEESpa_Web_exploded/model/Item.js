function Item(code, name, qty, price) {
    var __code = code;
    var __name = name;
    var __qty = qty;
    var __price = price;

    this.getItemCode = function () {
        return __code;
    }
    this.setItemCode = function (code) {
        __code = code;
    }
    this.getItemName = function () {
        return __name;
    }
    this.setItemName = function (name) {
        __name = name;
    }
    this.getItemQty = function () {
        return __qty;
    }
    this.setItemQty = function (qty) {
        __qty = qty;
    }
    this.getItemPrice = function () {
        return __price;
    }
    this.setItemPrice = function (price) {
        __price = price;
    }
}
