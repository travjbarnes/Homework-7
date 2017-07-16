// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFH9Nnp-DXdYuVs6EgF_Evn-gXlERWwDw",
    authDomain: "t-new-db.firebaseapp.com",
    databaseURL: "https://t-new-db.firebaseio.com",
    projectId: "t-new-db",
    storageBucket: "t-new-db.appspot.com",
    messagingSenderId: "675074252100"
  };

  firebase.initializeApp(config);
  var datebase = firebase.database();
  //grab data from form
  $("#submit").on('click', function(){
    var train = $("#train_name").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTrain = $("#firstTrain").val().trim();

  //add data from the form and place it to the firebase DB
  datebase.push({
             train_name: train,
             destination: destination,
             frequency: frequency,
             firstTrain: firstTrain
         })
  })

  //display data
  database.ref("/trains").on("child_added", function(childSnapshot) {


  //datebase.ref().on('child_added', function(childSnapshot, prevChildKey) {
    //datebase.ref().on("value", function(childSnapshot) {
    //find when the next train is and minutes until next train
    var tfrequency = childSnapshot.val().frequency;
    var convertedDate = moment(childSnapshot.val().firstTrain, 'hh:mm').subtract(1, 'years');
    console(log)=(convertedDate);
    var trainTime=moment(convertedDate).format('HH:mm');
    console(log)=(trainTime);
    var currentTime=moment();
    var firstTimeConverted=moment(trainTime,'hh.mm').subtract(1, 'years'); 
    var diffTime=moment().diff(moment(firstTimeConverted), "minutes")
    var tRainder = diffTime % tfrequency;
    //solved
    var tMinutesTillTrain = tfrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, 'minutes').format('HH:mm')

    //append
    $("#schedule").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td"> + childSnapshot.val().frequency + "</td><td>" + trainTime + "</td><td>" + tMinutesTillTrain + "<td></tr>")
    }, function(errorObject) {
       console.log('Errors handled: ' + errorObject.code);
    })

    //refresh train data 
    setInterval(function() {
       location.reload();   
    }, 60000)





  