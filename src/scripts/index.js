var lib = require('./lib');
var textAnimation = require('./textAnimation');
var skillAnimation = require('./skillAnimation');
var owlCarousel = require('owl.carousel');

(function($) {
    "use strict";

    $(document).ready(function () { 

        textAnimation.init($('.intro .headline'));

        $(this).on("scroll",function() {        
            if ( lib.mobileNavClose === false )  {
                lib.mobileMenu(true);    
            }
            if ( $('.skill').length > 0 ) {
                if ( $(this).scrollTop() >= ($('#skills').position().top - 500) ) {
                    skillAnimation.run();
                }
            }
        });
    
        $('.btn-mobile').click(function () {            
            lib.mobileMenu();
        });
    
        $('.btn-close').click(function () {
            lib.mobileMenu(true);
        });
    
        $('a[href^="#"]').on('click', function (e) {       
            if (this.hash !== "") {
                e.preventDefault();
                if ( lib.mobileNavClose === false )  {
                    lib.mobileMenu(true);    
                }                   
                var target = $(this.hash);
                $('html, body').stop().animate({
                    'scrollTop': (target.offset().top - 80)
                }, 1000);
            }
        });
        
        $('.owl-carousel').owlCarousel({
            loop:true,
            margin: 30,
            nav:false,
            dots: true,
            autoplay: true,
            smartSpeed: 500,
            autoplayHoverPause: true,
            responsive:{
                0:{
                    items:1
                },
                768:{
                    items:2
                },
                1040:{
                    items:3
                }
            }
        });
    });       

})(jQuery, owlCarousel, textAnimation, skillAnimation);
