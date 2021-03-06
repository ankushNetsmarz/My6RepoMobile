function SendMessage(messageText) {
   
    var message = messageText;
    var sender = localStorage.getItem("userId");
    var receiver = localStorage.getItem("userIdFeed");
    var feedId = localStorage.getItem("feedId");


    var inputdata = {
        "message": message,
        "sender": sender,
        "reciever": receiver,
        "feedID": feedId
    };
   
    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/SendMessage",
        url: "http://174.141.233.6/MY6/api/User/SendMessage",
        data: inputdata,
        success: function (data) {
           // console.log(data);
           // $("#messageText").val('');
           // toastr.success("message sent");
           
           window.plugins.toast.show('Mesasge sent !', 'long', 'center', function(a){}, function(b){});
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


function SendMessageThread() {
 
    var message = $("#messageText").val();
    var feedId =  localStorage.getItem("feedId");
    var reciever = localStorage.getItem("reciever");
    var sender =   localStorage.getItem("sender");
    var loggedInUSerID = localStorage.getItem("userId");

    var finalSender;
    var finalReciever;

    if (reciever == loggedInUSerID) {

        finalSender = reciever;
        finalReciever = sender;
    }
    if (sender == loggedInUSerID) {

        finalSender = sender;
        finalReciever = reciever;
    }




    var inputdata = {
        "message": message,
        "sender": finalSender,
        "reciever": finalReciever,
        "feedID": feedId
    };

    $.ajax({
        type: "POST",
        beforeSend: showLoader(),
        //url: "http://localhost:4103/api/User/SendMessage",
        url: "http://174.141.233.6/MY6/api/User/SendMessage",
        data: inputdata,
        success: function (data) {
            console.log(data);
            $("#messageText").val('');
           // toastr.success("message sent");
           
           window.plugins.toast.show('Message sent!', 'long', 'center', function(a){}, function(b){});
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





