/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDZYtlW6XMxgm-j_6pJHZTPMV7SMJHmqO8",
    authDomain: "train-hw-e5aa7.firebaseapp.com",
    databaseURL: "https://train-hw-e5aa7.firebaseio.com",
    projectId: "train-hw-e5aa7",
    storageBucket: "train-hw-e5aa7.appspot.com",
    messagingSenderId: "899031880944"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val();
  var arrival = moment($("#time-input").val(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val();
  console.log(frequency)
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    arrival: arrival,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.arrival);
  console.log(newTrain.frequency);

  // Alert
  alert("New Train Scheduled");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destinationInput = childSnapshot.val().destination;
  var timeInput = childSnapshot.val().arrival;
  var frequencyInput = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destinationInput);
  console.log(timeInput);
  console.log(frequencyInput);

  // Prettify the employee start
    var trainArrivePretty = moment.unix(timeInput).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
      var minToArrival = moment().diff(moment.unix(timeInput, "X"), 
      "minutes");
  // console.log(minToArrival);

 // Calculate the total billed rate
 // var min = empMonths * empRate;
 // console.log(empBilled);

//Add each train's data into the table
 $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationInput + "</td><td>" +
 trainArrivePretty + "</td><td>" + frequencyInput + "</td><td>" + minToArrival + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
/* global firebase moment */
// Steps to complete:
