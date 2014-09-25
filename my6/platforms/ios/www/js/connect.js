
var userId= localStorage.getItem("userId");

function connectPeople(selecton) {
  
    var id = selecton;
 
    var HTML = "";
    var inputdata = {
        "Interest": id,
        "UserID":userId
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/FindPeople",
        url: "http://174.141.233.6/MY6/api/User/FindPeople",
        data: inputdata,
        success: function (data) {
            console.log(data);
          
            for (i = 0; i < data.ResponseData.length; i++) {
                var name = data.ResponseData[i].FirstName;
                var profilepath = data.ResponseData[i].FacebookProfilePicUrl;
                var userId = data.ResponseData[i].UserID;
                profilepath= data.ResponseData[i].ProfilePicName;
                //  var profilepath = data.ResponseData[i].FacebookProfilePicUrl;
                   
                  
                    if (profilepath == null || profilepath == "") {

                        profilepath = "img/white-logo-2.png";
                    }
                    
                    else
                  	  {
                  	  
                  	  profilepath= "http://174.141.233.6/my6/Files/ProfilePictures/" + data.ResponseData[i].ProfilePicName;
                  	  }
            //    else
            //    {
                    
            //        profilepath = profilepath.substring(0, profilepath.lastIndexOf('=')) + "=large";
           //     }
                HTML += "<li id='newConnect' userId=" + userId+">"
                HTML += "<div  userId=" + userId + " class='connect-pic'>"
                HTML += "<img src=" + profilepath + ">"
                HTML += "</div>"
                HTML += "<h4>" + name+ "</h4>"
                HTML += "</li>"

                $(".connect").html(HTML);
            }
            //console.log(data.ResponseData.length);
        },
         error: function (xhr) {
          if (checkConnection())              
                 window.plugins.toast.show('Server Connection failed, Please try again !!', 'short', 'center', function(a){}, function(b){});
        
  hideLoader();   }
    }).done(function () {
        hideLoader();
    });
}





$(document).on("click", ".connect-pic", function () {
    var profile = $(this).attr('userId');
    localStorage.setItem("profileId", profile);
    var pathName = $(location).attr('href').substring($(location).attr('href').lastIndexOf('/') + 1);
    window.localStorage.setItem("pathName", pathName);
    window.location.replace("userProfile.html");
});

