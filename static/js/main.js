(function ($) {
 "use strict";
    
/*---------------------
 TOP Menu Stick
--------------------- */
    var s = $("#sticker");
    var pos = s.position();					   
    $(window).on('scroll', function() {
        var windowpos = $(window).scrollTop() >300;
        if (windowpos > pos.top) {
            s.addClass("stick");
        } else {
            s.removeClass("stick");	
        }
    });
    
    
/*--------------------------
preloader
---------------------------- */	
    var pre_load = $(window);
    pre_load.on("load",function() {
        var pre_loader = $('#preloader')
        pre_loader.fadeOut('slow',function(){$(this).remove();});
    });
	
/*----------------------------
 wow js active
------------------------------ */
 new WOW().init();

/*---------------------
  venobox
--------------------- */
    var veno_box = $('.venobox');
    veno_box.venobox();
    
/*----------------------------
 jQuery MeanMenu
------------------------------ */
    var navmenu = jQuery('nav#dropdown');
      navmenu.meanmenu();
	

/*--------------------------
     scrollUp
---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

	
/*----------------------------
  team-member-carousel
------------------------------ */
    var team_carousel = $('.team-member-carousel');   
    team_carousel.owlCarousel({
		loop:true,
		margin:15,
		nav:true,		
		autoplay:true,
	    dots:false,
		smartSpeed:3000,
		navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:3
			}
		}
	});
/*---------------------
 testimonial-curosel
--------------------- */
    var test_carousel = $('.testimonial-carousel');
    test_carousel.owlCarousel({
		loop:true,
		margin:0,
		nav:false,
        dots:true,
		animateOut: 'slideOutDown',
		animateIn: 'zoomInLeft',		
		autoplay:false,
		smartSpeed:3000,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});
/*---------------------
 blog-curosel
--------------------- */
    var blog_carousel = $('.blog-carousel');
    blog_carousel.owlCarousel({
		loop:true,
		margin:0,
		nav:true,
        dots:true,
		animateOut: 'slideOutDown',
		animateIn: 'zoomInLeft',		
		autoplay:false,
		smartSpeed:3000,
		navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		responsive:{
			0:{
				items:1
			},
			700:{
				items:2
			},
			1000:{
				items:3
			}
		}
	})
/*----------------------------
 isotope active
------------------------------ */
	// portfolio start
    var portfolio_item = $(window);
    portfolio_item.on("load",function() {
        var $container = $('.awesome-project-content');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        var pro_menu = $('.project-menu li a');
        $('.project-menu li a').on("click", function() {
            $('.project-menu li a.active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });
    //portfolio end
	

})(jQuery); 