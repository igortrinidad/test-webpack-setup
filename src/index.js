// Import the randomColor dependency:
import randomColor from "randomcolor";

// Initialize the bodyElement variable with the app's <body> element:
const bodyElement = document.getElementById("body");

// Initialize the buttonElement variable with the app's <button> element:
const buttonElement = document.getElementById("button");

// Define a changeBodyColor function:
function changeBodyColor() {
  // Initialize the color variable with the randomColor dependency's value:
  const color = randomColor();

  // Style the app's <body> element's background with the color variable's value:
  bodyElement.style.backgroundColor = color;
}

// Add a click event listener to the app's <button> element:
buttonElement.addEventListener("click", changeBodyColor);