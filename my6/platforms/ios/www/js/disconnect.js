var userId = localStorage.getItem("userId");

var userProfileid = localStorage.getItem("profileId");

function disConnect() {

    var inputdata = {
        "UserID": userId,
       "friendUserID": userProfileid
    };

    $.ajax({
        type: "POST",
    //   url: "http://localhost:4103/api/User/disConnectUser",
        url: "http://174.141.233.6/MY6/api/User/disConnectUser",
        data: inputdata,
        success: function (data) {
           // console.log(data);
           
           window.plugins.toast.show('Disconnected !', 'short', 'center', function(a){}, function(b){});
           
           window.location.replace("myfriends.html");
         
        },
        error: function (xhr) {
            hideLoader();
           window.plugins.toast.show('Failed, Please try again !!', 'short', 'center', function(a){}, function(b){});
        }
    }).done(function()
            {
            hideLoader();
            });
}

function hideLoader() {
    
	$('#loaderImage').css("display", "none");
	$('.flex').css("display", "none");
}

function showLoader() {
    
	$('#loaderImage').css("display", "block");
	$('.flex').css("display", "block");
	
}
