// Elements
var container = $(".container");
var storedPlannerHours;
var plannerHours = JSON.parse(localStorage.getItem("plannerHours"));
var timeSubmitBtn = $("#time-btn-submit");
var timeFrom = $("#time-from");
var timeTill = $("#time-till");

// Current time
var currentHour = dayjs();
// Display current day in Header (date format Friday, January 05)
$("#currentDay").text(dayjs().format("dddd[,] MMMM DD"));

/* =======================
          Functions
  ======================== */

// Create time blocks depending on plannerHours length
function displayTimeBlocks() {
  if (plannerHours) {
    for (var i = 0; i < plannerHours.length; i++) {
      // Create main time block div with classes
      var timeBlock = $("<div>");
      timeBlock.addClass("row time-block");
      // Create hour div with classes
      var hourDiv = $("<div>");
      hourDiv.addClass(
        "col-2 hour d-flex justify-content-center align-items-center"
      );
      // Setting div value to time (format ex. 10 AM), based on plannerHours array (array values are from 0 -24 to represent 24 hours)
      var time = dayjs().hour(plannerHours[i]).minute(0);
      var timeDisplay = time.format("h A");
      hourDiv.text(timeDisplay);
      // Create Textarea with classes and dataset
      var textArea = $("<textarea>");
      textArea.attr("data-order", i + 1);
      textArea.addClass("col-8 description");
      // Create Button with classes and dataset
      var saveBtn = $("<button>");
      saveBtn.attr("data-order", i + 1);
      saveBtn.addClass("col-2 saveBtn btnHover");
      var btnIcon = $("<i>");
      btnIcon.addClass("fas fa-save");
      saveBtn.append(btnIcon);

      // Appen time block to container
      container.append(timeBlock);
      timeBlock.append(hourDiv);
      timeBlock.append(textArea);
      timeBlock.append(saveBtn);

      // Subtraction of current time and planners time (depending on time block).  Result is in minutes
      var differenceInMinutess = currentHour.diff(time, "minutes");
      // Condition to check if subtraction result is negative, inbetween of 60 or over 60
      // Based on result add relevent class to textArea
      if (differenceInMinutess < 0) {
        textArea.addClass("future");
      } else if (differenceInMinutess <= 60 && differenceInMinutess >= 0) {
        textArea.addClass("present");
      } else if (differenceInMinutess > 60) {
        textArea.addClass("past");
        saveBtn.css("background", "#7c90a0");
        $(".saveBtn").removeClass("btnHover");
        textArea.css("background", "#7c90a0");
      }

      // Get text area value from local storage
      var savedTextAreaValue = localStorage.getItem(
        "Text Area Input" + (i + 1)
      );
      // Display value in text area
      textArea.val(savedTextAreaValue);
    }
  }
}
displayTimeBlocks();

// Function to remove all text area input values saved in local storage
function removeAllTextAreaInputValues() {
  for (var i = 1; i <= 24; i++) {
    localStorage.removeItem("Text Area Input" + i);
  }
}

/* =======================
          Click events
  ======================== */

// Click event on button click (button inside div with container class .saveBtn)
container.on("click", ".saveBtn", function () {
  // Getting dataset order value
  var buttonOrder = $(this).data("order");
  // Getting dataset order value of text area
  var textAreaOrder = $(this).prev().data("order");
  // Targeting value of a text area with specific dataset order value
  var textAreaOrderValue = $(
    ".description[data-order=" + textAreaOrder + "]"
  ).val();

  // Update local storage with the corresponding textarea value
  localStorage.setItem("Text Area Input" + textAreaOrder, textAreaOrderValue);
  // Getting updated value of text area from local storage
  var updatedTextAreaValue = localStorage.getItem(
    "Text Area Input" + textAreaOrder
  );
  // Display updated value inside text area from local storage
  $(this).prev().val(updatedTextAreaValue);
});

// Click event to clear local storage for textarea inputs
$("#confirm-clear").on("click", function () {
  $("#cancel-clear").click();
  removeAllTextAreaInputValues();
  $(".description").val("");
});

// Click event to change planners times
timeSubmitBtn.on("click", function () {
  var timeFromValue = Number(timeFrom.val());
  var timeTillValue = Number(timeTill.val());
  if (timeFromValue <= timeTillValue) {
    plannerHours = [];
    $(".time-block").remove();
    removeAllTextAreaInputValues();
    for (var i = timeFromValue; i <= timeTillValue; i++) {
      plannerHours.push(i);
      localStorage.setItem("plannerHours", JSON.stringify(plannerHours));
    }
    storedPlannerHours = JSON.parse(localStorage.getItem("plannerHours"));
    $("#error-message").text("");
    $("#planner-time-close-btn").click();
    displayTimeBlocks();
  } else if (timeFromValue > timeTillValue) {
    $("#error-message").text("Please, enter finish time after start time");
  }
});
