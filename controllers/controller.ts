let car: Car;
const cars: Car[] = [];

const btnCreate = document.getElementById("btnCreate") as HTMLButtonElement;
btnCreate.addEventListener("click", createCarHandler);

const formNewCar = document.getElementById("formNewCar") as HTMLFormElement;

function createCarHandler(): void {
    createCar();
    formNewCar.classList.add("d-none");
    showCarData();
}

function createCar() {
    const plate = document.getElementById("plate") as HTMLInputElement;
    const brand = document.getElementById("brand") as HTMLInputElement;
    const color = document.getElementById("color") as HTMLInputElement;
        
    car = new Car(plate.textContent as string, color.textContent as string, brand.textContent as string);

    /*
    car.addWheel(new Wheel(2, "SEAT"));
    document.body.innerText = "CAR: PLATE: " + car.plate
        + " COLOR: " + car.color + " BRAND: " + brand
        + " WHEELS: " + JSON.stringify(car.wheels);
    */
}

function showCarData() {
    
}