$(document).ready(function() {
    // Bind the event.
    $(window).hashchange(function(){
        // Alerts every time the hash changes!
        $("#main > .content").hide();
        if (location.hash === "#tryit") {
            $("#tryit input").val("").keyup();
            $("#tryit").fadeIn(400, function() {
                $("#tryit input").val("#drinkPreference :first-child").keyup();
            });
        } else {
            $("#splash").fadeIn(400);
        }
    });

    // Trigger the event (useful on page load).
    $(window).hashchange();    
});
