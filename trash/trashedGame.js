var userReg = null;
var allUsers = [];
var currentSeat = false;
var currentRoom;
var playerOneChoice = false
var playerTwoChoice = false
var numberPlayers = 0

var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

connectionsRef.on("value", function(snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    numberPlayers = snap.numChildren()
  });

database.ref("/gameData").on("value",function(snap){
    if(numberPlayers > 2){
        $("#playMessage").text("Two players are currently playing, try again later")
    }else if (numberPlayers === 2){
        $("#playMessage").text("You are player two. Good Luck");
        currentSeat = playerTwo
    }else{
        $("#playMessage").text("You are player one. Good Luck");
        currentSeat = playerOne
    }
})

$(".gameChoice").on("click",function(){
        event.preventDefault();
        if(currentSeat === "Player1"){
            playerOneChoice = $(this).attr("id")
            database.ref("/Player1").push(
                playerOneChoice
            )}
         else{
             playerTwoChoice = $(this).attr("id")
             database.ref("/Player2").push(
                 playerTwoChoice
             )}
         })   




































// $("#submitButton").on("click", function () {
//     event.preventDefault();
//     if($("#userName").val() !== ""){
//         userReg = $("#userName").val();
//         console.log(userReg)}
//         $("#userName").val("")
//     if(allUsers.indexOf(userReg) < 0){
//         var userNameDiv = $('<div>')
//         userNameDiv.text("Success! Your username is "+ userReg)
//         $("body").prepend(userNameDiv)
//         userNameDiv.attr("id","userSuccess")
//         $("#userInput").remove()
//         var userList = database.ref("/1Usernames").push(userReg)
//         userList.onDisconnect().remove()
//     } else {
//         var userNameDiv = $('<div>')
//         userNameDiv.text("That username is currently in a game. Please choose another")
//         userNameDiv.attr("id","userTaken")
//         $("#userInput").prepend(userNameDiv)
//     }
// })

// $(".playerSeat").on("click",function(){
//     event.preventDefault();
//     // if(userReg )
//     if(userReg !== null && currentSeat === false) {
//         var newPlayer = database.ref("/3Rooms/"+$(this).attr("data-room")+"/Players").child($(this).attr("data-seat")).push(userReg)
//         var occupied = database.ref("/2Occupied").push($(this).attr("data-room")+"*"+$(this).attr("data-seat"))
//         currentSeat = $(this).attr("data-seat")
//         currentRoom = $(this).attr("data-room")
//         newPlayer.onDisconnect().remove()
//         occupied.onDisconnect().remove()
//         // var leaveButton = $("<button>")
//         // leaveButton.addClass("leaveRoom")
//         // leaveButton.text("Leave Current Room")
//         // $("#roomChoice").hide()
//         // $("#leaveRoomGoesHere").append(leaveButton)
//         // joinRoom()
//     }
// })

// $("#gameChoice").on("click",function(){
//     event.preventDefault();
//     if(currentSeat === "Player1"){
//         playerOneChoice = $(this).text()
//         database.ref("3Rooms/Room 1/Players/Player1").push(
//             Choice: playerOneChoice
//         )
//     } else {
//         playerTwoChoice = $(this).text()
//         database.ref("3Rooms/Room 1/Players/Player2").push(
//             Choice: playerTwoChoice
//     )
// }})

// $("document").on("click",".leaveRoom",function() {
//     event.preventDefault()
//     $("#roomChoice").show()
//     $("#leaveRoomGoesHere").hide()
//     console.log(database.ref("2Occupied"))
//     console.log("This is a Test")
//     // currentRoom = false
//     // currentSeat = false
// })



// database.ref().on("value", function (snapshot){
//     if(snapshot.val() !== null){
//         let dataArray = Object.values(snapshot.val());
//         if(dataArray[1] !== undefined){
//             let occupiedRooms = Object.values(dataArray[1]);
//             $(".playerSeat").attr("disabled",false);
//             for (roomSplits of occupiedRooms) {
//                 let currentSplit = (roomSplits.split("*"))
//                 let roomSearch = "[data-room='"+currentSplit[0]+"']";
//                 let playerSearch = "[data-seat='" + currentSplit[1]+"']";
//                 $(".playerSeat"+roomSearch+playerSearch).attr("disabled",true)
//         }}
//         let userNameList = Object.values(dataArray[0])
//         allUsers = []
//         for(newUser of userNameList){
//             allUsers.push(newUser)
//         }
// }})


// function joinRoom(){
//     var gameSpace = $("<div>")
//     gameSpace.addClass("gameArea")
//     var roomTitle = $("<div>")
//     roomTitle.addClass("roomTitle")
//     roomTitle.text(currentRoom)
//     gameSpace.prepend(roomTitle)
//     $("#gameGoesHere").append(gameSpace)
// }

//Testing calling database only when needed


// 
// var intervalVar

// function nameTest(){
//     intervalVar = setInterval(nameTest,1000)
//     if(userReg === "Nightslife"){
//         console.log("This is going again")
//         database.ref().on("value",function(snap){
//             console.log(snap.val())
//         })
// }
// }
// nameTest()