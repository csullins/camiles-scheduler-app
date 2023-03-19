document.addEventListener('DOMContentLoaded', function() {
  // Call the dayJS API to display the current date in the header of the page.
  let today = dayjs();
  $('#currentDay').text("Today is " + today.format('MMM D, YYYY'));

  // Call the dayJS API to display the current hour in 24-hour form
  let currentHour = dayjs().hour();
  console.log("Current hour:", currentHour);
  // Grab all the divs with the .time-block class
  let timeBlocks = document.querySelectorAll(".time-block");

  timeBlocks.forEach(function(row) {
    // Set the variable blockHour to the 'data-hour' value property of each div with class 'row'. 
    let blockHour = parseInt(row.getAttribute("data-hour"));
    //Then, for each 'row', check if the blockHour is equal to, less than or else (greater than) the current hour in order to assign a CSS style class
    if (blockHour === currentHour) {
      console.log("yo! the", blockHour + "th hour block should be orange.")
      row.classList.add("present");
    } else if (blockHour < currentHour) {
      row.classList.add("past");
    } else {
      row.classList.add("future");
    }
  });

  let inputAreas = document.querySelectorAll('textarea');
  let saveBtn = document.querySelectorAll('button');

  saveBtn.forEach(function(btn) {
    btn.addEventListener("click", function() {
      // Create an empty object to store the input data
      let userInput = {};
  
      // Loop through all input areas and store their values in the userInput object
      inputAreas.forEach(function(inputArea) {
        userInput[inputArea.id] = inputArea.value;
      });
  
      // Convert the userInput object to a JSON string and save it to local storage
      localStorage.setItem("userInput", JSON.stringify(userInput));
    });
  });

  // TODO:  HINT: How can the id attribute "description" of each time-block be used to get any user input that was saved in localStorage and set the values of the corresponding textarea elements.'
  function init() {
  const savedInput = localStorage.getItem("userInput");

  if (savedInput) {
    const userInput = JSON.parse(savedInput);
    
    inputAreas.forEach(function(inputArea) {
      inputArea.value = userInput[inputArea.id];
    });
  }
}

  init();
});
