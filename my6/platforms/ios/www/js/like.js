var flaglike = 0;
var userId = localStorage.getItem("userId");
var feedId = localStorage.getItem("feedId");
//alert(feedId);

//like a feed
function LikeFeed() {


    var inputdata = {
        "FeedID": feedId,
        "UserID": userId
    };
    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/Feed/LikeFeed",
        url: "http://174.141.233.6/MY6/api/Feed/LikeFeed",
        data: inputdata,
        success: function (data) {
        	  $(".applause-click-btn").removeClass('applause-click-btn').addClass('applaused-click-btn');
              $(".like-click-btn").removeClass('like-click-btn').addClass('liked-click-btn');
              flaglike = 1;

        },
       error: function (xhr) {
          if (checkConnection())              
                 window.plugins.toast.show('Server Connection failed, Please try again !!', 'short', 'center', function(a){}, function(b){});
        
  hideLoader();   }
    }).done(function () {
        hideLoader();
    });
}



//comment on a feed
function CommentOnFeed() {
	
    var inputdata = {
        "FeedID": feedId,
        "UserID": userId,
        "comment": $("#commentOnFeed").val()
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/Feed/CommentOnFeed",
        url: "http://174.141.233.6/MY6/api/Feed/CommentOnFeed",
        data: inputdata,
        success: function (data) {
            console.log(data);
            GetComments()
            $("#commentOnFeed").val("");
        },
        error: function (xhr) {
          if (checkConnection())              
                 window.plugins.toast.show('Server Connection failed, Please try again !!', 'short', 'center', function(a){}, function(b){});
        
  hideLoader();   }
    }).done(function () {
        hideLoader();
    });
}


function GetComments() {
    var HTML = "";
    var inputdata = {
        "FeedID": feedId
    };

    $.ajax({
        type: "GET",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/Feed/GetCommentOnFeed",
        url: "http://174.141.233.6/MY6/api/Feed/GetCommentOnFeed",
        data: inputdata,
        success: function (data) {
            console.log(data);


            if (data.ResponseData.length > 0) {
                for (var i = 0; i < data.ResponseData.length; i++) {

                    var comment = data.ResponseData[i].Comment;
                    var facebookUrl = data.ResponseData[i].FacebookProfilePicUrl;
                    var profilepath= data.ResponseData[i].ProfilePicName;
                    //  var profilepath = data.ResponseData[i].FacebookProfilePicUrl;
                       
                      
                        if (profilepath == null || profilepath == "") {

                            profilepath = "img/white-logo-2.png";
                        }
                        
                        else
                      	  {
                      	  
                      	  profilepath= "http://174.141.233.6/my6/Files/ProfilePictures/" + data.ResponseData[i].ProfilePicName;
                      	  }
                    var time = data.ResponseData[i].commenttime;
                    var userName = data.ResponseData[i].FirstName + " " + data.ResponseData[i].LastName;

                    var date = data.ResponseData[i].commentdate;

//
//                    HTML += "<div class='comment-list-area'>"
//                    HTML += "<img src=" + profilepath + " class='fl' width='40' height='40'>"
//                 
//                    HTML += "<div class='fl comment-list-text'>"
//           
//                    HTML += "<span><strong>" + userName + "</strong></span> &nbsp;(" + data.ResponseData[i].timeSince + ")<br>" + comment + "</div> <div class='clr'></div></div>"
//

           
           
           
           HTML += "<div class='comment-list-area'>"
           HTML += "<div><img src=" + profilepath + " class='fl' width='40' height='40' style='margin-right:5px;'>"
           HTML += "<div class='fl'><span><strong>" + userName + "</strong></span> &nbsp;(" + data.ResponseData[i].timeSince + ")</div>"
           HTML += "<div class='clr'></div></div>"
           HTML += "<div class='fl comment-list-text'>" + comment + "</div>"
           HTML += "<div class='clr'></div></div>"
           
           
           
                    $(".comment-list-area-main").html(HTML);
                }
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


