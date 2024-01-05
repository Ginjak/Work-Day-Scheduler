// Elements
var field = $(".field");
var plannerHours = [9, 10, 11, 12, 13, 14, 15, 16, 23];

// Current time
var currentHour = dayjs();

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
  textArea.addClass("col-8 description");
  // Create Button
  var saveBtn = $("<button>");
  saveBtn.addClass("col-2 saveBtn");
  var btnIcon = $("<i>");
  btnIcon.addClass("fas fa-save");
  saveBtn.append(btnIcon);

  // Appen time block to container
  field.append(timeBlock);
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

  console.log(differenceInMinutess);
}

var fourAM = dayjs().hour(20).minute(0);
// var currentHour = dayjs();

// Calculate the difference in minutes
var differenceInMinutes = currentHour.diff(fourAM, "minutes");
console.log(fourAM);
console.log("Difference in Minutes:", differenceInMinutes);

// function test(id) {
//   var hoursValue = $(id).find(".hour").text().trim();
//   var currentHour = dayjs().format("h A");
//   // console.log(currentHour);
//   // console.log(hoursValue);
// }

// test("#nineAm");
// function checkTime(id) {
//   var timeBlock = $("id");
//   var hour = $(".hour").text().trim();
// }
// checkTime(nineAmEl);

// $(".hour").each(function (index) {
//   var currentHour = dayjs().format("h A");
//   var plannerhour = $(this).text().trim();
//   var plannerhourDayJs = dayjs("9 PM", { format: "h A" });
// });
// // Current date
// $("#currentDay").text(dayjs().format("dddd[,] MMMM DD "));
