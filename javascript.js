var firebaseConfig = {
    apiKey: "AIzaSyAR9TYJabXzjjqsNeubQyk-kFdbJoHjJjI",
    authDomain: "weblabterminal.firebaseapp.com",
    projectId: "weblabterminal",
    storageBucket: "weblabterminal.appspot.com",
    messagingSenderId: "147570780836",
    appId: "1:147570780836:web:847f0c28f332e3430c9431",
    measurementId: "G-LZ50STC3PV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  var AddMatchReference = firebase.database().ref("Match Details/");
  var stdNo1 = 0;

  $(function () {
    var currDate = new Date();
    // date.setDate(date.getDate());
    $("#datetimepicker9").datetimepicker({
      uiLibrary: "bootstrap5",
      format: "mmm dd yyyy HH:MM",
    })
  });

  function InsertDataIntoFireBase() {
  
    var Team1 = document.getElementById("Team1").value;
    var Team2 = document.getElementById("Team2").value;
    var Date1 = document.getElementById("Date").value;
    var Month = document.getElementById("Month").value;
    var Time = document.getElementById("Time").value;
    var Zone = document.getElementById("Zone").value;
    
    AddMatchReference.push({
            Team1: Team1,
            Team2: Team2,
            Date: Date1,
            Month: Month,
            Time: Time,
            Zone: Zone,
        });
        alert("Match Added Successfully");
        sendEmail1();
        $("#AddMatchModal").modal("hide");
        ResetForm();

  }

function RetrieveDataFromFireBase() {
    var AdminReference = firebase.database().ref("Admin/");
    var Email = document.getElementById("LogIn_Form_email").value;
    var Password = document.getElementById("LogIn_Form_password").value;
  
    AdminReference.orderByChild("Email")
      .equalTo(Email)
      .on("value", function (snapshot) {
        if (snapshot.val() == null) {
          alert("Invalid Email or Pass in admin reference");
          return;
        }
        snapshot.forEach(function (data) {
          if (Password == data.val().Password) {
            alert("Logged in Successfully");
            window.location.href = "AdminDashboard.html";
          } else {
            alert("Invalid Email or Pass");
          }
        });
      });
  }

  $(function () {
  
    $("#Team2_error_id").hide();
  
    var Team2_error_id = false;
  
    function ResetForm() {
      $("#Team2").css("border", "1px solid #CCC");
  
      $("#Team2_error_id").hide();
    }
  
    $("#form_reset").focusin(function () {
      ResetForm();
    });
    $("#Team2").focusout(function () {
      check_fname();
    });
      
    function check_Team2() {
      var Team1 = $("#Team1").val();
      var Team2 = $("#Team2").val();
      if (Team1 == Team2) {
        $("#Team2_error_id").html("Passwords doesn't match");
        $("#Team2_error_id").show();
        $("#Team2").css("border", "2px solid #F90A0A");
        Team2_error_id = true;
      } else {
        $("#Team2_error_id").hide();
        $("#Team2").css("border", "2px solid #34F458");
      }
    }
  
    $("#CreateMatch_Form").submit(function () {
        Team2_error_id = false;
      
        check_Team2();
  
      if (Team2_error_id === false) {
        InsertDataIntoFireBase();
        ShowDataIntoTableFromFireBase();
        return true;
      } else {
        alert("Please Fill the form Correctly");
        return false;
      }
    });
  });

  function ShowDataIntoTableFromFireBase() {
    AddMatchReference.orderByChild("Team1").on(
      "value",
      function (AllRecords) {
        AllRecords.forEach(function (CurrentRecord) {
          var Team1 = CurrentRecord.val().Team1;
          var Team2 = CurrentRecord.val().Team2;
          var Date1 = CurrentRecord.val().Date;
          var Month = CurrentRecord.val().Month;
          var Time = CurrentRecord.val().Time;
          var Zone = CurrentRecord.val().Zone;
          AddItemsToTable1(
            Team1,
            Team2,
            Date1,
            Month,
            Time,
            Zone,
          );
        });
      }
    );
  }
  window.onload = ShowDataIntoTableFromFireBase();
  // ------------------------------------- Adding Data Into Table ----------------------------------------//
  function AddItemsToTable1(
    Team1,
    Team2,
    Date,
    Month,
    Time,
    Zone,
  ) {
    var t = $("#dataTable").DataTable();
    t.row
      .add([
        ++stdNo1,
        Team1,
    Team2,
    Date,
    Month,
    Time,
    Zone
      ])
      .draw(false);
  }