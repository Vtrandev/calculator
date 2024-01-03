let numObj = {};
const display = document.querySelector(".display");
const btn = document.querySelectorAll(".btn");

// Keyboard inputs
addEventListener("keypress", (e) => inputEventFunction(e));

// Button click inputs
btn.forEach((btn) => btn.addEventListener("click", inputEventFunction));

// Callback function
function inputEventFunction(e) {
  const input = e.key || e.target.innerText;

  // Calculate results
  if (input === "=" || input === "Enter") {
    display.innerText = parseFloat(operate(numObj).toFixed(9));
    return clearDisplay();
  }

  if (numObj["operator"] && ["+", "-", "/", "*"].includes(input)) {
    numObj["first"] = operate(numObj);
    numObj["operator"] = input;
    delete numObj["second"];
    return (display.innerText = numObj["first"]);
  }

  if (input === "AC") {
    display.innerText = 0;
    return clearDisplay();
  }

  // Add numbers and operator to the object
  if (numObj["operator"]) {
    addNumToObject(numObj, "second", input);
    display.innerText = parseFloat(numObj["second"]);
  } else if (["+", "-", "/", "*"].includes(input)) {
    numObj["operator"] = input;
  } else {
    addNumToObject(numObj, "first", input);
    display.innerText = parseFloat(numObj["first"]);
  }
}

function addNumToObject(obj, string, input) {
  // Limit input to 11 digits
  if (obj[string] && obj[string].length > 11) return;

  if (!obj[string]) obj[string] = 0;

  obj[string] += input;
  return obj;
}

function operate(obj) {
  if (obj["operator"] == "+") return add(obj);
  if (obj["operator"] == "-") return subtract(obj);
  if (obj["operator"] == "*") return multiply(obj);
  if (obj["operator"] == "/") return divide(obj);
}

// Arithmetics group
function add(obj) {
  return +obj["first"] + +obj["second"];
}

function subtract(obj) {
  return +obj["first"] - +obj["second"];
}

function multiply(obj) {
  return +obj["first"] * +obj["second"];
}

function divide(obj) {
  return +obj["first"] / +obj["second"];
}

// Clearing Display function
function clearDisplay() {
  numObj = {};
}
