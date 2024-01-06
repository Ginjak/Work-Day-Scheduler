// Elements
var container = $(".container");
var plannerHours = [9, 10, 11, 12, 13, 14, 15, 16, 21];

// Current time
var currentHour = dayjs();
// Display current day in Header (date format Friday, January 05)
$("#currentDay").text(dayjs().format("dddd[,] MMMM DD"));
// Create time block
for (var i = 0; i < plannerHours.length; i++) {
  var timeBlock = $("<div>");
  timeBlock.addClass("row time-block");
  // Create hour div
  var hourDiv = $("<div>");
  hourDiv.addClass(
    "col-2 hour d-flex justify-content-center align-items-center"
  );
  var time = dayjs().hour(plannerHours[i]).minute(0);
  var timeDisplay = time.format("h A");
  hourDiv.text(timeDisplay);
  // Create Textarea
  var textArea = $("<textarea>");
  textArea.attr("data-order", i + 1);
  textArea.addClass("col-8 description");
  // Create Button
  var saveBtn = $("<button>");
  saveBtn.attr("data-order", i + 1);
  saveBtn.addClass("col-2 saveBtn");
  var btnIcon = $("<i>");
  btnIcon.addClass("fas fa-save");
  saveBtn.append(btnIcon);

  // Appen time block to container
  container.append(timeBlock);
  timeBlock.append(hourDiv);
  timeBlock.append(textArea);
  timeBlock.append(saveBtn);
  var differenceInMinutess = currentHour.diff(time, "minutes");

  if (differenceInMinutess < 0) {
    textArea.addClass("future");
  } else if (differenceInMinutess <= 60 && differenceInMinutess >= 0) {
    textArea.addClass("present");
  } else if (differenceInMinutess > 60) {
    textArea.addClass("past");
  }

  // Target textarea depening on data-order value
  var savedTextAreaValue = localStorage.getItem("Text Area Input" + (i + 1));
  textArea.val(savedTextAreaValue);
}
// Click event on button click
container.on("click", ".saveBtn", function () {
  var buttonOrder = $(this).data("order");
  var textAreaOrder = $(this).prev().data("order");
  var textAreaOrderValue = $(
    ".description[data-order=" + textAreaOrder + "]"
  ).val();

  // Update local storage with the corresponding textarea value
  localStorage.setItem("Text Area Input" + textAreaOrder, textAreaOrderValue);
  var updatedTextAreaValue = localStorage.getItem(
    "Text Area Input" + textAreaOrder
  );

  $(this).prev().val(updatedTextAreaValue);
});
