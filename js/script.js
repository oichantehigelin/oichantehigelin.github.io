/***** Active navbar link *****/
$(document).ready(function() {
    $("nav .nav-item a").first().addClass("active");
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