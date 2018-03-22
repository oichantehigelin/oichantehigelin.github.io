/***** Active navbar link *****/
$(document).ready(function() {
    $("nav .nav-item a").click(function(){
        $("nav .nav-item a").removeClass("active");
        $(this).addClass("active");
    });
});

/***** Toggle pages *****/
$(document).ready(function() {
    if ($(window).width() >= 800) {
        $("#two > section").hide();
        $("#two > section").first().show();
        $("nav .nav-item a").click(function(){
            $("#two > section").hide();
            var id = $(this).attr("href");
            $(id).show();
        });
    } else {
        $("#two > section").show();
    }
});

/***** Music player *****/

$(document).ready(function() {
    var audio = $("#audio");
    var buttonControl = $("button.control");
    // Play/pause button
    buttonControl.click(function() {
        if ($(this).children("i").hasClass("fa-play")) {
            audio.trigger("play");
            $(this).children("i").removeClass("fa-play");
            $(this).children("i").addClass("fa-pause");
        } else {
            audio.trigger("pause");
            $(this).children("i").removeClass("fa-pause");
            $(this).children("i").addClass("fa-play");
        }
    });
});