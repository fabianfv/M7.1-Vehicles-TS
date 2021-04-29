"use strict";
var car;
var formNewCar = document.getElementById("formNewCar");
var formAddWheels = document.getElementById("formAddWheels");
var root = document.getElementById("root");
var template = document.getElementById("car").content;
var fragment;
function stopEvent(e) {
    e.preventDefault();
    e.stopPropagation();
}
formNewCar.addEventListener('submit', validate);
formAddWheels.addEventListener('submit', validate);
/***********************************************************
  Car Card Data - HTML sub-elements
  
  get the HTML sub-elements from the template to (further)
  write the car data in a fashion card
************************************************************/
function $outputWheel(id) {
    var brand = template.querySelector("#templateWheel0" + id + "Brand");
    var diameter = template.querySelector("#templateWheel0" + id + "Diameter");
    return {
        brand: brand,
        diameter: diameter
    };
}
var $wheels = {
    "wheel01": $outputWheel('1'),
    "wheel02": $outputWheel('2'),
    "wheel03": $outputWheel('3'),
    "wheel04": $outputWheel('4')
};
var $outputPlate = template.querySelector('#showCarPlate');
var $outputBrand = template.querySelector('#showCarBrand');
var $outputColor = template.querySelector('#showCarColor');
var writePlate = function (plate) { return $outputPlate.textContent = plate; };
var writeBrand = function (brand) { return $outputBrand.textContent = brand; };
var writeColor = function (color) { return $outputColor.textContent = color; };
var writeWheelBrand = function (id, brand) {
    var key = "wheel0" + id;
    var $wheel = $wheels[key];
    $wheel.brand.textContent = brand;
};
var writeWheelDiameter = function (id, diameter) { return $wheels["wheel0" + id].diameter.textContent = diameter; };
/**********************************************************************************
  get the HTML sub-elements from formNewCar and formAddWheels to get the car data
***********************************************************************************/
var $getCarElement = function (attribute) { return document.querySelector("#formNewCar" + attribute); };
var $inputPlate = $getCarElement('Plate');
var $inputBrand = $getCarElement('Brand');
var $inputColor = $getCarElement('Color');
var $wheelInputBrand = function (id) { return document.querySelector("#formAddWheelWheel0" + id + "Brand"); };
var $wheelInputDiameter = function (id) { return document.querySelector("#formAddWheelWheel0" + id + "Diameter"); };
var getPlate = function () { return $inputPlate.value; };
var getBrand = function () { return $inputBrand.value; };
var getColor = function () { return $inputColor.value; };
var getWheelBrand = function (id) { return $wheelInputBrand(id).value; };
var getWheelDiameter = function (id) { return $wheelInputDiameter(id).value; };
var $car = Object.create({ getPlate: getPlate, writePlate: writePlate, getBrand: getBrand, writeBrand: writeBrand, getColor: getColor, writeColor: writeColor, getWheelBrand: getWheelBrand, writeWheelBrand: writeWheelBrand, getWheelDiameter: getWheelDiameter, writeWheelDiameter: writeWheelDiameter });
function newCar() {
    car = new Car($car.getPlate(), $car.getColor(), $car.getBrand());
    formNewCar.classList.add("d-none");
    formAddWheels.classList.remove("d-none");
}
function createWheels() {
    for (var i = 1; i <= 4; i++) {
        var brand = $car.getWheelBrand(i.toString());
        var diameter = $car.getWheelDiameter(i.toString());
        var wheel = new Wheel(diameter, brand);
        car.addWheel(wheel);
    }
}
function writeWheelsData() {
    car.wheels.forEach(function (wheel, i) {
        var id = (i + 1).toString();
        $car.writeWheelBrand(id, wheel.brand);
        $car.writeWheelDiameter(id, wheel.diameter);
    });
}
function setCarData() {
    fragment = new DocumentFragment();
    $car.writePlate(car.plate);
    $car.writeBrand(car.brand);
    $car.writeColor(car.color);
    writeWheelsData();
    var carClone = document.importNode(template, true);
    fragment.appendChild(carClone);
    root.appendChild(fragment);
}
function clearForms() {
    document.querySelectorAll('input').forEach(function (input) { return input.value = ''; });
}
function addWheels() {
    createWheels();
    setCarData();
    clearForms();
    formAddWheels.classList.add("d-none");
    formNewCar.classList.remove("d-none");
}
/*************
  Validation
**************/
//function formIsValid(form: HTMLFormElement) {
function validate(e) {
    var form = e.target;
    var inputs = form.querySelectorAll('input');
    var isValid = false;
    stopEvent(e);
    inputs.forEach(function (input) {
        isValid = input.checkValidity();
        if (!isValid) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
        }
        else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
    });
    form.classList.add("was-validated");
    if (isValid) {
        if (form.id === "formNewCar")
            newCar();
        if (form.id === "formAddWheels")
            addWheels();
    }
}
document.querySelectorAll('input').forEach(function (input) { return input.addEventListener('keyup', validateInput); });
function validateInput(e) {
    var input = e.target;
    if (!input.checkValidity()) {
        stopEvent(e);
        input.classList.replace("is-valid", "is-invalid");
        return;
    }
    input.classList.replace("is-invalid", "is-valid");
}
/********
  TESTS
*********/
function addTestWheels(brand, diameter) {
    for (var i = 1; i <= 4; i++) {
        var id = i.toString();
        $wheelInputBrand(id).value = brand;
        $wheelInputDiameter(id).value = diameter;
    }
}
function setCar(plate, brand, color) {
    $inputPlate.value = plate;
    $inputBrand.value = brand;
    $inputColor.value = color;
}
function test01() {
    setCar("1234qwe", "ford", "azul");
    newCar();
    addTestWheels("hot wheels", "1");
    addWheels();
}
function test02() {
    setCar("9876poi", "chevy", "blanco");
    newCar();
    addTestWheels("ruedita", "1.215");
    addWheels();
}
function test03() {
    setCar("4812bgy", "patapata", "amarillo");
    newCar();
    addTestWheels("alta llanta", "1.737");
    addWheels();
}
function test04() {
    setCar("2015ECS", "ecma", "verde");
    newCar();
    addTestWheels("alta llanta", "1.737");
    addWheels();
}
var $showTestCards = document.querySelector('#showTestCards');
$showTestCards.addEventListener("click", runTestSuite);
function runTestSuite() {
    var testSuite = [test01, test02, test03, test04, test01, test02, test03, test04];
    root.innerHTML = '';
    if ($showTestCards.checked) {
        formAddWheels.classList.replace('d-block', 'd-none');
        formNewCar.classList.replace('d-none', 'd-block');
        testSuite.forEach(function (test) { return test(); });
    }
}
runTestSuite();
