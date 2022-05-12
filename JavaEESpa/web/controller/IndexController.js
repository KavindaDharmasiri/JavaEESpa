/*START VARIABLES*/
var demo1 = document.getElementById("customerClass");
demo1.style.display = "none";

var demo2 = document.getElementById("itemClass");
demo2.style.display = "none";

var demo3 = document.getElementById("orderClass");
demo3.style.display = "none";

var demo4 = document.getElementById("homeClass");

/*END VARIABLES*/

/*START EVENTS*/

document.getElementById("Gcustomer").addEventListener("click", function () {
    demo4.style.display = "none";
    demo2.style.display = "none";
    demo3.style.display = "none";
    demo1.style.display = "inline";
});
document.getElementById("Gitem").addEventListener("click", function () {
    demo4.style.display = "none";
    demo1.style.display = "none";
    demo3.style.display = "none";
    demo2.style.display = "inline";
});
document.getElementById("Gorder").addEventListener("click", function () {
    demo4.style.display = "none";
    demo2.style.display = "none";
    demo1.style.display = "none";
    demo3.style.display = "inline";

});
document.getElementById("Ghome").addEventListener("click", function () {
    demo3.style.display = "none";
    demo2.style.display = "none";
    demo1.style.display = "none";
    demo4.style.display = "inline";
});

/*END EVENTS*/
