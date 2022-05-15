function Customer(id, name, address, tp) {
    var __id = id;
    var __name = name;
    var __address = address;
    var __tp = tp;
    this.getCustomerID = function () {
        return __id;
    }
    this.setCustomerID = function (id) {
        __id = id;
    }
    this.getCustomerName = function () {
        return __name;
    }
    this.setCustomerName = function (name) {
        __name = name;
    }
    this.getCustomerAddress = function () {
        return __address;
    }
    this.setCustomerAddress = function (address) {
        __address = address;
    }
    this.getCustomerTp = function () {
        return __tp;
    }
    this.setCustomerTp = function (tp) {
        __tp = tp;
    }
}
