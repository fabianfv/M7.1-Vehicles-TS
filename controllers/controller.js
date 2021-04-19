var car;
var cars = [];
var btnCreate = document.getElementById("btnCreate");
btnCreate === null || btnCreate === void 0 ? void 0 : btnCreate.addEventListener("click", createCarHandler);
var formNewCar = document.getElementById("formNewCar");
function createCarHandler() {
    createCar();
    formNewCar === null || formNewCar === void 0 ? void 0 : formNewCar.classList.add("d-none");
}
function createCar() {
    var plate = document.getElementById("plate");
    var brand = document.getElementById("brand");
    var color = document.getElementById("color");
    car = new Car(plate.value, color.value, brand.value);
    /*
    car.addWheel(new Wheel(2, "SEAT"));
    document.body.innerText = "CAR: PLATE: " + car.plate
        + " COLOR: " + car.color + " BRAND: " + brand
        + " WHEELS: " + JSON.stringify(car.wheels);
    */
}
