/***** Active navbar link *****/
$(document).ready(function() {
    'use strict';
    $("nav .nav-item a").click(function(){
        $("nav .nav-item a").removeClass("active");
        $(this).addClass("active");
    });
});

$(document).ready(function() {
    $("#two > section").hide();
    $("#two > section").first().show();
    $("nav .nav-item a").click(function(){
        $("#two > section").hide();
        var id = $(this).attr("href");
        $(id).show();
    });
});

/***** Smooth scrolling *****/
$(document).ready(function() {
    'use strict';
    $('.nav-item a').click(function() {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                if ($(window).width() <= 800) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 95
                    }, 1000);
                    return false;
                } else {
                    $('html, body').animate({
                        /* if navbar is "fixed", add "- [navbar-height]" */
                        scrollTop: target.offset().top - 50
                    }, 1000);
                    return false;
                }
            }
        }
    });
});