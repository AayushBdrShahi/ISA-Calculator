// Get references to all the necessary HTML elements
const display = document.getElementById("display");
const output = document.getElementById("output");
const buttons = document.querySelectorAll("button");

// Initialize variables to store the state of the calculator
let previousNumber = null;
let currentNumber = null;
let operator = null;
let result = null;

// Define helper functions to handle various calculations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// Define callback function for button clicks
function handleClick(event) {
  const button = event.target;
  const value = button.textContent;

  // Handle digit button clicks
  if (!isNaN(value)) {
    if (currentNumber === null) {
      currentNumber = value;
    } else {
      currentNumber += value;
    }
    display.value = currentNumber;
  }

  // Handle operator button clicks
  if (value === "+" || value === "-" || value === "*" || value === "÷") {
    if (previousNumber === null) {
      previousNumber = currentNumber;
      currentNumber = null;
    } else if (currentNumber !== null) {
      result = operate(previousNumber, currentNumber, operator);
      previousNumber = result;
      currentNumber = null;
      display.value = result;
    }
    operator = value;
  }

  // Handle equals button click
  if (value === "=") {
    if (previousNumber !== null && currentNumber !== null) {
      result = operate(previousNumber, currentNumber, operator);
      previousNumber = null;
      currentNumber = result;
      operator = null;
      display.value = result;
    }
  }

  // Handle clear button click
  if (value === "C") {
    previousNumber = null;
    currentNumber = null;
    operator = null;
    result = null;
    display.value = "";
  }
}

// Define function to perform arithmetic operations
function operate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "÷":
      if (b === 0) {
        return "Infinity";
      } else {
        return divide(a, b);
      }
  }
}

// Attach event listeners to all the buttons
buttons.forEach(button => {
  button.addEventListener("click", handleClick);
});
