var userId = localStorage.getItem("userId");

function AddProfilePicture(imageURL) {
   
    showLoader();
    var inputdata = {
        "fileInBase64Format": imageURL,
        "userid": userId,
        "extension": "png" //exension of the feed
    };

    $.ajax({
        type: "POST",
        //url: "http://localhost:4103/api/User/addProfilePicture",
        url: "http://174.141.233.6/MY6/api/User/addProfilePicture",
        //contentType: false,
        //processData: false,   
        data: inputdata,
        success: function (results) {
            console.log(results);
 
          
           window.plugins.toast.show('Profile picture Updated !', 'short', 'center', function(a){}, function(b){});
           urls = localStorage.getItem("ProfilePic");
           
           var new_Img = document.getElementById("profile");

           new_Img.src = urls;
            $("#profile").prop('src', urls + "?v=" + (new Date().getTime()));
        
        },
          error: function (xhr) {
          if (checkConnection())              
                 window.plugins.toast.show('Server Connection failed, Please try again !!', 'short', 'center', function(a){}, function(b){});
        
  hideLoader();   }
    }).done(function () {
        hideLoader();
    });
}


