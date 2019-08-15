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
    let trainData = []
    trainData.push(trainDest, trainTime, trainFreq)
    database.ref("/"+trainName).set(
        trainData
    )
    $("#trainName").val("")
    $("#trainDest").val("")
    $("#trainTime").val("")
    $("#trainFreq").val("")
})

database.ref().on("value", function(snap){
    let trainNames = Object.keys(snap.val())
    console.log(trainNames)
    $("#deleteOnUpdate").remove()
    for(trainTable of trainNames){
        console.log(snap.val()[trainTable])
        let addTrainRow = (snap.val()[trainTable])
        let newRow = $("<tr>")
        newRow.attr("id","deleteOnUpdate")
        let newTrainName = $("<td>")
        newTrainName.text(trainTable)
        let newTrainDest = $("<td>")
        newTrainDest.text(addTrainRow[0])
        let nextComingTime = $("<td>")
        nextComingTime.text(timeIncoming(addTrainRow[1],addTrainRow[2]))
        newRow.append(newTrainName,newTrainDest,nextComingTime)
        $("#trainTable").append(newRow)

}
})

function timeIncoming (startTime, iteratedTime) {
    let currTime = moment()
    let startTrainTime = moment(startTime, "HH:mm")
    let nextMinute = (startTrainTime.diff(currTime,"minutes"))
    console.log(nextMinute)
    console.log(iteratedTime)
    let testingTime = moment(startTrainTime).add(iteratedTime,"m")
    console.log(moment(testingTime).format("HH:mm"))
    
    while (nextMinute <= 0){
        startTrainTime = moment(startTrainTime).add(iteratedTime,"m")
        nextMinute = (startTrainTime.diff(currTime,"minutes"))
        console.log(startTrainTime)
        console.log("This is the new nextMinute: "+nextMinute)
    }
    return nextMinute
}