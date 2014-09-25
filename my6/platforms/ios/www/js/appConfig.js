//var profilePicPath = "http://174.141.233.6/my6/Files/ProfilePictures/";
//var ajaxCall = "http://174.141.233.6/MY6/api/";

$(document).ready(function () {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "500",
        "timeOut": "4000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "slideUp"
    }
});
function checkConnection() {
    var networkState = navigator.connection.type;
  
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
   states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';


    if (states[networkState] == 'No network connection') {
        window.plugins.toast.show('Internet not available!', 'long', 'center', function (a) { }, function (b) { });
        return false;
    }


    return true;

    hideLoader();
}

function hideLoader() {

	$('#loaderImage').css("display", "none");
	$('.flex').css("display", "none");
}

function showLoader() {

	$('#loaderImage').css("display", "block");
	$('.flex').css("display", "block");
	
}
