 // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCi_R-FTtu6o7UHuZ0pqlYex6jL55394Jw",
    authDomain: "employee-unc-ex-17.firebaseapp.com",
    databaseURL: "https://employee-unc-ex-17.firebaseio.com",
    projectId: "employee-unc-ex-17",
    storageBucket: "",
    messagingSenderId: "492632612991",
    appId: "1:492632612991:web:1ca163027c7fdb80"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


var trainName
var trainDest
var trainTime
var trainFreq


$("#addTrain").on("click",function(){
    event.preventDefault()
    trainName = $("#trainName").val().trim()
    trainDest = $("#trainDest").val().trim()
    trainTime = $("#trainTime").val().trim()
    trainFreq = parseInt($("#trainFreq").val().trim())
    database.ref().push({
        trainName,
        trainDest,
        trainTime,
        trainFreq
    })
    $("#trainName").val("")
    $("#trainDest").val("")
    $("#trainTime").val("")
    $("#trainFreq").val("")
})