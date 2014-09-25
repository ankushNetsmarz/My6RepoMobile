var namesInterest = [];
var interestResponseNew = [];
var IdInterest = [];
var interestResponseIdNew = [];
var urlPic;
var ResponseArray = [];
var user = {};

//ADD or CREATE
function AddNewUser() {
    var faceBookUrl = localStorage.getItem("facebookUrl");


    var userData = {
        "email": $("#emails").val(),
        "password": $("#UserPassword").val(),
        "firstName": $("#Firsti").val(),
        "lastName": $("#Lasts").val(),
        "isRegisteredByFacebook": true,
        "FacebookPicURL": faceBookUrl

    };

    if(navigator.connection.type!=Connection.NONE)
    {

    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        url: "http://174.141.233.6/MY6/api/user/AddUser",
        data: userData,

        success: function (data) {
            console.log(data);
            var userId = data.ResponseData;
            localStorage.setItem("userId", userId);

            var sucess = data.IsSucess;

            if (sucess == "false") {
              //  $(".message-area").text("please try again, may be already registered");
              //  $(".alert-box").show();
            
window.plugins.toast.show('User already registered !', 'short', 'center', function(a){}, function(b){});
            }
            else {
                window.localStorage.setItem("login", "submit");
                window.location.replace("interest.html");
            }
        },
        error: function (xhr) {
          //  $(".message-area").text(xhr.responseText);
          //  $(".alert-box").show();
           hideLoader();
           window.plugins.toast.show('Some error occured !', 'short', 'center', function(a){}, function(b){});

        }
    }).done(function () {
        hideLoader();
    });
    }
    else
    {
       window.plugins.toast.show('Internet not available!', 'short', 'center', function(a){}, function(b){});
    }
}

//update user
function UpdateUser() { 
	
    var editNameNew = $("#EditName").val().split(" ");
  
    var gender = $("#selector").val();
     localStorage.setItem("genders",gender);
   
    var editContact= $("#EditContact").val();
    var loc=$("#EditLocation").val();
    var dob=  $("#EditDOB").html();
    

    var userData =
        {
            "userID": localStorage.getItem("userId"),
            "DOB": $("#EditDOB").html(),
            "firstName": editNameNew[0],
            "lastName": editNameNew[1],
            "contactNo": $("#EditContact").val(),
            "Gender": gender,
            "locationAddress": $("#EditLocation").val()
        };
    console.log(userData);
    //alert(userData);
    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        url: "http://174.141.233.6/MY6/api/user/UpdateUser",
        data: userData,
        success: function (data) {
       
        	GetUserData();
           window.plugins.toast.show('Profile Updated !', 'short', 'center', function(a){}, function(b){});
           // GetUserData();
          // localStorage.setItem("login", "login");
           //window.location.replace("interest.html");
           
        },
       error: function (xhr) {
          if (checkConnection())              
                 window.plugins.toast.show('Server Connection failed, Please try again !!', 'short', 'center', function(a){}, function(b){});
        
  hideLoader();   }
    }).done(function () {
        hideLoader();
    });
}

function GetUserData() {
   
    var inputdata = {
        "userID": localStorage.getItem("userId")
    };

   
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/GetUserData",
        url: "http://174.141.233.6/MY6/api/User/GetUserData",
        data: inputdata,
        success: function (data) {
           
        
            var profilePic= data.ResponseData[0].ProfilePicName;
         
       
            if (profilePic == null || profilePic == "") {

            	profilePic = "img/white-logo-2.png";
              
            }

            else {

            	profilePic = "http://174.141.233.6/my6/Files/ProfilePictures/" + data.ResponseData[0].ProfilePicName;
            	  localStorage.setItem("ProfilePic", profilePic+"?v="+(new Date().getTime()));
            }
            
            
          
          

        
           var Gender = data.ResponseData[0].Gender;
         
           var DOB = data.ResponseData[0].DOB;
           var LocationAddress = data.ResponseData[0].LocationAddress;
           var status = data.ResponseData[0].Status;
           var ContactNo= data.ResponseData[0].ContactNo;
            if (Gender == null) {
                Gender = "Not Available";
            }
            if (DOB == null) {
                DOB = "Not Available";
            }
            if (LocationAddress == null) {
                LocationAddress = "Not Available";
            }
            if (status == null) {
                status = "no status";
            }
          
            if (ContactNo == null) {
                ContactNo = "Not Available";
            }
          
            
            
            
            
            user.rating = data.ResponseData[0].UserRating;
            user.id = data.ResponseData[0].UserID;
            user.FirstName = data.ResponseData[0].FirstName;
            user.LastName = data.ResponseData[0].LastName;
            user.DOB = DOB;
            user.ContactNo = ContactNo;
            user.LocationAddress = LocationAddress;
            user.Gender = Gender;
            user.interests = data.ResponseData[0].interests;
            user.status = status;
           
            
            var interestResponse = data.ResponseData[0].interests;
            var interestResponseId = data.ResponseData[0].interestsID;
         

            interestResponseNew = interestResponse.split("|");
            interestResponseIdNew = interestResponseId.split("|");
          
            

            for (var i = 0; i < 6; i++) {
                namesInterest.push(interestResponseNew[i]);
                IdInterest.push(interestResponseIdNew[i]);
            }

            localStorage.setItem("interestResponse", JSON.stringify(namesInterest));
            localStorage.setItem("interestResponseId", JSON.stringify(IdInterest));


            
            localStorage.setItem("userId", data.ResponseData[0].UserID);
            localStorage.setItem("ResponseArray", JSON.stringify(user));
            


        },
      error: function (xhr) {
          if (checkConnection())              
                 window.plugins.toast.show('Server Connection failed, Please try again !!', 'short', 'center', function(a){}, function(b){});
        
  hideLoader();   }
    }).done(function () {
        hideLoader();
    });
}


//Add interests
function AddInterests() {
    var userIdConnect = localStorage.getItem("userId");
    var Interests = JSON.parse(localStorage.getItem("newId"));


    var inputdata = {

        "UserID": userIdConnect,
        "Interests": Interests + ","
    };

    $.ajax({
        type: "GET",
        // url: "http://localhost:4103/api/user/AddInterest/",
        url: "http://174.141.233.6/MY6/api/user/AddInterest/",
        data: inputdata,
        success: function (data) {
           // console.log(data);
           // toastr.success("interest added");
           
window.plugins.toast.show('Interest Added !', 'short', 'center', function(a){}, function(b){});
        },
        error: function (xhr) {
          if (checkConnection())              
                 window.plugins.toast.show('Server Connection failed, Please try again !!', 'short', 'center', function(a){}, function(b){});
        
  hideLoader();   }
    }).done(function () {
        hideLoader();
    });
}


function IsEmailExists() {
    var userData = {
        "email": $("#emails").val().trim()
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        url: "http://174.141.233.6/MY6/api/user/IsEmailExists",
        data: userData,
        success: function (data) {
            console.log(data);
            var res = data.ResponseData;
            if (res == 1) {
//                $(".message-area").text("user is already registered");
//                $(".alert-box").show();
window.plugins.toast.show('User is already registered !', 'short', 'center', function(a){}, function(b){});
                $("#emails").val('');
                $("#emails").focus();
            }

        },
    error: function (xhr) {
          if (checkConnection())              
                 window.plugins.toast.show('Server Connection failed, Please try again !!', 'short', 'center', function(a){}, function(b){});
        
  hideLoader();   }
    }).done(function () {
        hideLoader();
    });
}

//Validate User
function validateUser() {

    var inputdata = {
        "email": $("#emailLogin").val(),
        "password": $("#passwordLogin").val()
    };
    
    if(navigator.connection.type!=Connection.NONE)
    {
        
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        url: "http://174.141.233.6/MY6/api/user/GetLogin/",
        data: inputdata,
        success: function (data) {
          
        	if(data.ResponseData[0].UserID != 0)
        		{
        	    createDatabase();
                        
        	    var Gender = data.ResponseData[0].Gender;
        	    var DOB = data.ResponseData[0].DOB;
        	    var LocationAddress = data.ResponseData[0].LocationAddress;
        	    var status = data.ResponseData[0].Status;
        	    var ContactNo = data.ResponseData[0].ContactNo;
        	    if (Gender == null) {
        	        Gender = "Not Available";
        	    }
        	    if (DOB == null) {
        	        DOB = "Not Available";
        	    }
        	    if (LocationAddress == null) {
        	        LocationAddress = "Not Available";
        	    }
        	    if (status == null) {
        	        status = "no status";
        	    }
        	    if (ContactNo == null) {
        	        ContactNo = "Not Available";
        	    }
        	  user.rating = data.ResponseData[0].UserRating;
            user.id = data.ResponseData[0].UserID;
            user.FirstName = data.ResponseData[0].FirstName;
            user.LastName = data.ResponseData[0].LastName;
            user.DOB = DOB;
            user.ContactNo = ContactNo;
            user.LocationAddress = LocationAddress;
            user.Gender = Gender;
            user.interests = data.ResponseData[0].interests;
            user.status = status;
            localStorage.setItem("userId", data.ResponseData[0].UserID);

            localStorage.setItem("ResponseArray", JSON.stringify(user));
           localStorage.setItem("emailID",data.ResponseData[0].Email);
           
            var respons = data.ResponseData[0].UserID;

            var interestResponse = data.ResponseData[0].interests;
            var interestResponseId = data.ResponseData[0].interestsID;

            var facebookUrl = data.ResponseData[0].FacebookProfilePicUrl;
            var ProfilePicUrl = data.ResponseData[0].ProfilePicName;

            if (ProfilePicUrl != null) {
                urlPic = "http://174.141.233.6/my6/Files/ProfilePictures/" + ProfilePicUrl;
            }
         //   else if (facebookUrl != null) {
               // urlPic = facebookUrl;
         //   }
            else {
                urlPic = "img/white-logo-2.png";
            }

            localStorage.setItem("ProfilePic", urlPic);
           if(data.ResponseData[0].IsInterest==0)
           {
                     window.localStorage.setItem("login", "submit");
          
           window.location.replace("interest.html");
           }
           else
           {
           
           interestResponseNew = interestResponse.split("|");
           interestResponseIdNew = interestResponseId.split("|");
           
           for (i = 0; i < 6; i++) {
           namesInterest.push(interestResponseNew[i]);
           IdInterest.push(interestResponseIdNew[i]);
           }
           
           localStorage.setItem("interestResponse", JSON.stringify(namesInterest));
           localStorage.setItem("interestResponseId", JSON.stringify(IdInterest));
            window.location.replace("interest.html");
           }
     
           

           
        

//            if (respons == "0") {
////                $(".message-area").text("please try again");
////                $(".alert-box").show();
//           window.plugins.toast.show('Please try again !', 'long', 'center', function(a){}, function(b){});
//
//            }
//          
//            else {
//                window.location.replace("interest.html");
//            }
        		}
        	else
//        		   $(".message-area").text("Please try again!!");
//            $(".alert-box").show();
      
           window.plugins.toast.show('Email/Password does not match !', 'short', 'center', function(a){}, function(b){});
        	

        },
        error: function (xhr) {
          //  alert(xhr.responseText);
            hideLoader();
            window.plugins.toast.show(xhr.responseText, 'short', 'center', function(a){}, function(b){});
        }
    }).done(function () {
        hideLoader();
    });
    }
    else
    {
           window.plugins.toast.show('Internet not available !', 'short', 'center', function(a){}, function(b){});
    }
}





function forgotPassword(emailID) {
    var inputdata = {
    email: emailID
    };
    
    $.ajax({
           type: "POST",
           //url: "http://localhost:4103/api/user/forgotpassword",
           url: "http://174.141.233.6/MY6/api/user/forgotPassword",
           data: inputdata,
           success: function (data) {
           if(data.ResponseData==1)
           {
           navigator.notification.confirm(
                                          'New password has been sent to your email !!', // message
                                          onConfirm,            // callback to invoke with index of button pressed
                                          'MY6',           // title
                                          ['Ok']     // buttonLabels
                                          );
           
           }
           else if(data.ResponseData==2)
           {
        
           navigator.notification.confirm(
                                          'Email id does not exists. Please, provide registered email id !!', // message
                                          onConfirm,            // callback to invoke with index of button pressed
                                          'MY6',           // title
                                          ['Ok']     // buttonLabels
                                          );

           }
          else
           {
          
           navigator.notification.confirm(
                                          'Some error occured, Please try again !', // message
                                          onConfirm,            // callback to invoke with index of button pressed
                                          'MY6',           // title
                                          ['Ok']     // buttonLabels
                                          );

           }
         
           
           },
           error: function (xhr) {
           
          // alert(xhr.responseText);
           }
           });
}


function askEmail()
{
    navigator.notification.prompt(
                                  'Provide your email id !!',  // message
                                  onPrompt,                  // callback to invoke
                                  'MY6',            // title
                                  ['Submit','Cancel'],             // buttonLabels
                                  ''                 // defaultText
                                  );

}

function onPrompt(results)
{
    if(results.buttonIndex==1)
    {
        forgotPassword(results.input1);
    }
    
    
}

function onConfirm(results)
{
    
}


function changePassword(userId,oldpassword,newpassword) {
    
    var userData = {
    userID: userId,
    oldpassword: oldpassword,
    newpassword: newpassword
    };
    $.ajax({
           type: "POST",
           beforeSend: showLoader(),
           //url: "http://localhost:4103/api/user/ChangePass",
           url: "http://174.141.233.6/MY6/api/user/ChangePass",
           data: userData,
           success: function (data) {
           hideLoader();
           if(data.ResponseData==1)
           {
           navigator.notification.confirm(
                                          'Password has been changed !', // message
                                          onConfirm,            // callback to invoke with index of button pressed
                                          'MY6',           // title
                                          ['Ok']     // buttonLabels
                                          );

           }
           else if(data.ResponseData==0)
           {
           navigator.notification.confirm(
                                          'Old password does not match, make sure you type the correct password !', // message
                                          onConfirm,            // callback to invoke with index of button pressed
                                          'MY6',           // title
                                          ['Ok']     // buttonLabels
                                          );
           }
          
           },
           error: function (xhr) {
          if (checkConnection())              
                 window.plugins.toast.show('Server Connection failed, Please try again !!', 'short', 'center', function(a){}, function(b){});
        
  hideLoader();   }
    }).done(function () {
        hideLoader();
    });
}