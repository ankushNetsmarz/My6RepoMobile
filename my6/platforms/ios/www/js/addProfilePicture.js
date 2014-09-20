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
        },
           error: function (xhr) {
           //  alert(xhr.responseText);
           hideLoader();
           window.plugins.toast.show('Update failed, Please try again !!', 'short', 'center', function(a){}, function(b){});
           }
           }).done(function () {
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
