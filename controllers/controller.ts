let car: Car

const formNewCar = document.getElementById("formNewCar") as HTMLFormElement
const formAddWheels = document.getElementById("formAddWheels") as HTMLFormElement

const root = document.getElementById("root") as HTMLDivElement
const template = (document.getElementById("car") as HTMLTemplateElement).content
let fragment: DocumentFragment

function stopEvent(e: Event) {
  e.preventDefault()
  e.stopPropagation()
}

formNewCar.addEventListener('submit', validate);
formAddWheels.addEventListener('submit', validate);

/***********************************************************
  Car Card Data - HTML sub-elements
  
  get the HTML sub-elements from the template to (further)
  write the car data in a fashion card
************************************************************/

function $outputWheel(id: string): { brand: HTMLParagraphElement, diameter: HTMLParagraphElement } {
  const brand = (template.querySelector(`#templateWheel0${id}Brand`) as HTMLParagraphElement)
  const diameter = (template.querySelector(`#templateWheel0${id}Diameter`) as HTMLParagraphElement)
  return {
    brand,
    diameter
  }
}

const $wheels: { [key: string]: { brand: HTMLParagraphElement, diameter: HTMLParagraphElement } } = {
  "wheel01": $outputWheel('1'),
  "wheel02": $outputWheel('2'),
  "wheel03": $outputWheel('3'),
  "wheel04": $outputWheel('4')
}

const $outputPlate = template.querySelector('#showCarPlate') as HTMLHeadingElement
const $outputBrand = template.querySelector('#showCarBrand') as HTMLHeadingElement
const $outputColor = template.querySelector('#showCarColor') as HTMLHeadingElement

const writePlate = (plate: string) => $outputPlate.textContent = plate
const writeBrand = (brand: string) => $outputBrand.textContent = brand
const writeColor = (color: string) => $outputColor.textContent = color

const writeWheelBrand = (id: string, brand: string) => {
  const key = `wheel0${id}`
  const $wheel = $wheels[key]
  $wheel.brand.textContent = brand
}
const writeWheelDiameter = (id: string, diameter: string) => $wheels[`wheel0${id}`].diameter.textContent = diameter

/**********************************************************************************
  get the HTML sub-elements from formNewCar and formAddWheels to get the car data
***********************************************************************************/

const $getCarElement = (attribute: string) => (document.querySelector(`#formNewCar${attribute}`) as HTMLInputElement)

const $inputPlate = $getCarElement('Plate')
const $inputBrand = $getCarElement('Brand')
const $inputColor = $getCarElement('Color')

const $wheelInputBrand = (id: string) => document.querySelector(`#formAddWheelWheel0${id}Brand`) as HTMLInputElement
const $wheelInputDiameter = (id: string) => document.querySelector(`#formAddWheelWheel0${id}Diameter`) as HTMLInputElement

const getPlate = () => $inputPlate.value as string
const getBrand = () => $inputBrand.value as string
const getColor = () => $inputColor.value as string

const getWheelBrand = (id: string) => $wheelInputBrand(id).value
const getWheelDiameter = (id: string) => $wheelInputDiameter(id).value

const $car = Object.create({ getPlate, writePlate, getBrand, writeBrand, getColor, writeColor, getWheelBrand, writeWheelBrand, getWheelDiameter, writeWheelDiameter })

function newCar() {
  car = new Car($car.getPlate(), $car.getColor(), $car.getBrand())
  formNewCar.classList.add("d-none")
  formAddWheels.classList.remove("d-none")
}

function createWheels() {
  for (let i = 1; i <= 4; i++) {
    const brand = $car.getWheelBrand(i.toString())
    const diameter = $car.getWheelDiameter(i.toString())
    const wheel = new Wheel(diameter, brand)
    car.addWheel(wheel)
  }
}

function writeWheelsData() {  
  car.wheels.forEach(
    (wheel, i) => {
      const id = (i + 1).toString()
      $car.writeWheelBrand(id, wheel.brand)
      $car.writeWheelDiameter(id, wheel.diameter)
    }
  )
}

function setCarData() {
  fragment = new DocumentFragment()
  
  $car.writePlate(car.plate)
  $car.writeBrand(car.brand)
  $car.writeColor(car.color)

  writeWheelsData()

  const carClone = document.importNode(template, true)
  fragment.appendChild(carClone)
  root.appendChild(fragment)
}

function clearForms() {
  document.querySelectorAll('input').forEach(
    input => input.value = ''
  )
}

function addWheels() {
  createWheels()
  setCarData()
  clearForms()
  formAddWheels.classList.add("d-none")
  formNewCar.classList.remove("d-none")
}

/*************
  Validation
**************/

function validate(e: Event) {
  const form = e.target as HTMLFormElement
  const inputs = form.querySelectorAll('input')
  let isValid = false
  stopEvent(e)

  inputs.forEach(
    input => {
      isValid = input.checkValidity()
      if (!isValid) {
        input.classList.remove("is-valid")
        input.classList.add("is-invalid")
        return false
      } else {
        input.classList.remove("is-invalid")
        input.classList.add("is-valid")
      }
    }
  )
  
  form.classList.add("was-validated");
  if (isValid) {
    if (form.id === "formNewCar")
      newCar()
    if (form.id === "formAddWheels")
      addWheels()
  }
}

document.querySelectorAll('input').forEach(
  input => input.addEventListener('keyup', validateInput)
)

function validateInput(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.checkValidity()) {
    stopEvent(e)
    input.classList.replace("is-valid", "is-invalid");
    return
  }
  input.classList.replace("is-invalid", "is-valid");
}

/********
  TESTS
*********/

function addTestWheels(brand: string, diameter: string) {
  for (let i = 1; i <= 4; i++) {
    const id = i.toString()
    $wheelInputBrand(id).value = brand
    $wheelInputDiameter(id).value = diameter
  }
}

function setCar(plate: string, brand: string, color: string) {
  $inputPlate.value = plate
  $inputBrand.value = brand
  $inputColor.value = color
}

function test01() {
  setCar("1234qwe", "ford", "azul")
  newCar()
  addTestWheels("hot wheels", "1")
  addWheels()
}

function test02() {
  setCar("9876poi", "chevy", "blanco")
  newCar()
  addTestWheels("ruedita", "1.215")
  addWheels()
}

function test03() {
  setCar("4812bgy", "patapata", "amarillo")
  newCar()
  addTestWheels("alta llanta", "1.737")
  addWheels()
}

function test04() {
  setCar("2015ECS", "ecma", "verde")
  newCar()
  addTestWheels("alta llanta", "1.737")
  addWheels()
}

const $showTestCards = document.querySelector('#showTestCards') as HTMLInputElement
$showTestCards.addEventListener("click", runTestSuite)

function runTestSuite() {
  const testSuite = [test01, test02, test03, test04, test01, test02, test03, test04]
  
  root.innerHTML = ''
  
  if ($showTestCards.checked) {
    formAddWheels.classList.replace('d-block', 'd-none')
    formNewCar.classList.replace('d-none', 'd-block')
    testSuite.forEach(test => test())
  }
}

runTestSuite()