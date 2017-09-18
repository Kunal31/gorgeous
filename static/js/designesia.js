// © Copyright 2016 - Modis by Designesia 

jQuery(document).ready(function() {		
	'use strict';				// use strict mode
	
	// editable value
	var logo_pos				= 1; // logo position; 1 - center, 2 - left
	var logo_dir_1				= 'images/logo.png'; // change with your logo path
	var logo_dir_2				= 'images/logo_light.png'; // change with your logo path (for light background)
	var logo_center_top_margin	= '-15px'; // define margin top for 'center' logo image
	var logo_left_top_margin	= '30px'; // define margin top for 'left' logo image
	var header_sticky			= 1; // 0 - default, 1 - sticky
	var header_color_on_scroll	= 2; // 1- dark, 2 - light
	
	// read only
	var tmp_lltm				= logo_left_top_margin;
	var mobile_menu_show    	= 0;
	
	$('body').addClass('de_light');
	if(header_sticky==1){$('header').addClass('header_sticky');	}	
	$('header').addClass('transparent');
	if(header_color_on_scroll==2){$('header').addClass('header_light');	}	
	
	
// --------------------------------------------------
// owlCarousel
// --------------------------------------------------
function js_owlCarousel(){
	jQuery("#gallery-carousel").owlCarousel({
    items : 4,
    navigation : false,
	pagination : false
    });	
	jQuery(".carousel-gallery").owlCarousel({
    items : 4,
    navigation : false,
	pagination : false
    });	
	jQuery("#blog-carousel").owlCarousel({
    items : 3,
    navigation : false,
	pagination : true
    });	
	jQuery("#testimonial-carousel").owlCarousel({
    items : 2,
    navigation : false
    });	
	jQuery("#logo-carousel").owlCarousel({
    items : 6,
    navigation : false,
	pagination : false,
	autoPlay : true
    });	
	jQuery("#contact-carousel").owlCarousel({
    items : 1,
	singleItem:true,	
    navigation : false,
	pagination : false,
	autoPlay : true
    });		
	jQuery(".carousel-single-loop").owlCarousel({
    items : 1,
	singleItem:true,	
    navigation : false,
	pagination : false,
	autoPlay : true,
	mouseDrag : false,
	touchDrag : false,
	transitionStyle : "fade"
    });	
	jQuery(".text-slider").owlCarousel({
    items : 1,
	singleItem:true,	
    navigation : false,
	pagination : false,
	mouseDrag : false,
	touchDrag : false,
	autoPlay : 4000,
	transitionStyle : "fade"
    });	
	jQuery(".fluid-carousel").owlCarousel({
    items : 6,
	singleItem:false,	
    navigation : false,
	pagination : false,
	mouseDrag : false,
	touchDrag : false,
	autoPlay : 4000,
	transitionStyle : "fade"
    });	
	jQuery(".blog-slide").owlCarousel({
    items : 1,
	singleItem:true,	
    navigation : false,
	pagination : false,
	autoPlay : false
    });	
	jQuery(".testimonial-list").owlCarousel({
    items : 1,
	singleItem:true,	
    navigation : false,
	pagination : true,
	autoPlay : false
    });	
	
	// Custom Navigation owlCarousel
	$(".next").on("click", function() {
		$(this).parent().parent().find('.blog-slide').trigger('owl.next');
	});
	$(".prev").on("click", function() {
		$(this).parent().parent().find('.blog-slide').trigger('owl.prev');
	});
}
// --------------------------------------------------
// magnificPopup
// --------------------------------------------------
function js_magnificPopup(){	
	jQuery('.simple-ajax-popup-align-top').magnificPopup({
        type: 'ajax',
        alignTop: true,
        overflowY: 'scroll'
    });
    jQuery('.simple-ajax-popup').magnificPopup({
        type: 'ajax'
    });	
	// zoom gallery
	jQuery('.zoom-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return item.el.attr('title');
				//return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
		
	});	
	// popup youtube, video, gmaps	
	jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});	
	// image popup	
	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}		
	});
	$('.image-popup-fit-width').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false
		}
	});
	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});
}
// --------------------------------------------------
// auto resize video
// --------------------------------------------------
function video_autosize(){
	jQuery('.de-video-container').each(function() {
		var height_1 = jQuery(this).css("height");
		var height_2 = jQuery(this).find(".de-video-content").css("height");
		var newheight = (height_1.substring(0, height_1.length - 2)-height_2.substring(0, height_2.length - 2))/2;
		jQuery(this).find('.de-video-overlay').css("height", height_1);
		jQuery(this).find(".de-video-content").animate({'margin-top': newheight},'fast');
	});
}	
// --------------------------------------------------
// centered logo
// --------------------------------------------------
function h_center_logo(){
	var position = jQuery(".header_center ul#mainmenu > li").length;
	var i = 0;
	jQuery('.header_center ul#mainmenu > li').each(function() {
		if(i == Math.floor(position/2)-1) {
			jQuery(this).after('<li class="logo_pos"><img class="c_logo_light" src="'+logo_dir_1+'"/><img class="c_logo_dark" src="'+logo_dir_2+'"/></li>');
	}
	i++;
	});
	// settings
	jQuery('header.header_center .logo_pos img').css('margin-top',logo_center_top_margin);
}
// --------------------------------------------------
// on scroll active
// --------------------------------------------------
function onScrollActive(){
	// --------------------------------------------------
	// counter
	// --------------------------------------------------
	
		jQuery('.timer').each(function(){
		var imagePos = jQuery(this).offset().top;
				
		var topOfWindow = jQuery(window).scrollTop();
			if (imagePos < topOfWindow+500 && v_count=='0') {		

					  jQuery(function ($) {

					  // start all the timers
					  jQuery('.timer').each(count);
					  
					  
					  function count(options) {
					 	v_count = '1';
						var $this = jQuery(this);
						options = $.extend({}, options || {}, $this.data('countToOptions') || {});
						$this.countTo(options);
					  }
					});
					
				}
			});
		
// --------------------------------------------------
// progress bar
// --------------------------------------------------
		jQuery('.de-progress').each(function(){
		var pos_y = jQuery(this).offset().top;
		var value = jQuery(this).find(".progress-bar").attr('data-value');
		
		var topOfWindow = jQuery(window).scrollTop();
			if (pos_y < topOfWindow+500) {		
				jQuery(this).find(".progress-bar").css('width', value);
			}
		});
	
	
		jQuery('.animated').each(function(){
		var imagePos = jQuery(this).offset().top;
		var timedelay = jQuery(this).attr('data-delay');
		
		var topOfWindow = jQuery(window).scrollTop();
			if (imagePos < topOfWindow+500) {		
				jQuery(this).delay(timedelay).queue(function(){
					jQuery(this).fadeTo(1,500);
					var $anim = jQuery(this).attr('data-animation');
					jQuery(this).addClass($anim).clearQueue();
				});
				
			}
		});
		
		jQuery(".nav-exit").on("click", function() {
			$.magnificPopup.close();
        });
		
	// stellar
	$.stellar({
        horizontalScrolling: false,
        verticalOffset: 0
    });
}
// --------------------------------------------------
// init
// --------------------------------------------------
	function init_de(){
	jQuery('.de-team-list').each(function(){

		 jQuery(this).find("img").on('load', function() {
				var w = jQuery(this).css("width");
		 	   	var h = jQuery(this).css("height");
			   	//nh = (h.substring(0, h.length - 2)/2)-48;
		 
				jQuery(this).parent().parent().find(".team-pic").css("height",h);
				jQuery(this).parent().parent().find(".team-desc").css("width",w);
			 	jQuery(this).parent().parent().find(".team-desc").css("height",h);
				jQuery(this).parent().parent().find(".team-desc").css("top",h);

			}).each(function() {
			  if(this.complete) $(this).load();
			});
	});
	
	$.stellar('refresh');

	jQuery(".de-team-list").on("mouseenter", function () {
		 var h;
		 h = jQuery(this).find("img").css("height");
		 jQuery(this).find(".team-desc").stop(true).animate({'top': "0px"},350,'easeOutQuad');
		 jQuery(this).find("img").stop(true).animate({'margin-top': "-100px"},400,'easeOutQuad');
	}).on("mouseleave", function () {		
		 var h;
		 h = jQuery(this).find("img").css("height");
		 jQuery(this).find(".team-desc").stop(true).animate({'top': h},350,'easeOutQuad');
		 jQuery(this).find("img").stop(true).animate({'margin-top': "0px"},400,'easeOutQuad');
  	})	
	
	
	// portfolio
	
		jQuery('.picframe').each(function(){	
		
		 jQuery(this).find("img").css("width","100%");
		 jQuery(this).find("img").css("height","auto");
		 
		 jQuery(this).find("img").on('load', function() {
				var w = jQuery(this).css("width");
		 	   	var h = jQuery(this).css("height");
			   	//nh = (h.substring(0, h.length - 2)/2)-48;
		 
				jQuery(this).parent().css("height",h);

			}).each(function() {
			  if(this.complete) $(this).load();
			});
		});
		
	// --------------------------------------------------
	// portfolio hover
	// --------------------------------------------------
	jQuery('.overlay').fadeTo(1, 0);
	
	// gallery hover
	jQuery(".picframe").on("mouseenter", function () {
	 jQuery(this).parent().find(".overlay").width(jQuery(this).find("img").css("width"));
	 jQuery(this).parent().find(".overlay").height(jQuery(this).find("img").css("height"));
	 jQuery(this).parent().find(".overlay").stop(true).fadeTo(300,.9);
	 var picheight = jQuery(this).find("img").css("height");
	 var newheight;
	 newheight = (picheight.substring(0, picheight.length - 2)/2)-10;
	 //alert(newheight);
	 jQuery(this).parent().find(".pf_text").stop(true).animate({'margin-top': newheight},300,'easeOutCubic');
	 
	
  	}).on("mouseleave", function () {
	 var newheight;
	 var picheight = jQuery(this).find("img").css("height");	 
	 newheight = (picheight.substring(0, picheight.length - 2)/2)-10;
	 jQuery(this).parent().find(".pf_text").stop(true).animate({'margin-top': newheight - 30},300,'easeOutCubic');
	 jQuery(this).parent().find(".overlay").stop(true).fadeTo(300, 0);
	 jQuery(this).find("img").stop(true).animate({
            width:  '100%',
            height: '100%',
            'margin-left': 0,
            'margin-top': 0
     }, 700,'easeOutQuad');
	})
	
	jQuery('.overlay').fadeTo(1, 0);
	// team hover
	
	var $masonry = jQuery('.masonry');
		$masonry.isotope({
			itemSelector: '.item',
			filter: '*'
	});
	}
	
	// --------------------------------------------------
// revolution slider
// --------------------------------------------------
	var revapi;
  	revapi = jQuery('#revolution-slider').revolution({
	delay:15000,
	startwidth:1170,
	startheight:500,
	hideThumbs:10,
	fullWidth:"off",
	fullScreen:"on",
	fullScreenOffsetContainer: "",
	touchenabled:"on",
	navigationType:"none",
    dottedOverlay:""
	});

	// wow jquery
		
	new WOW().init();
	init_de();

	// --------------------------------------------------
	// preloader
	// --------------------------------------------------
	
	//calling jPreLoader function with properties
	jQuery('body').jpreLoader({
		splashID: "#jSplash",
		splashFunction: function() {  //passing Splash Screen script to jPreLoader
			jQuery('#jSplash').children('section').not('.selected').hide();
			jQuery('#jSplash').hide().fadeIn(800);
			
			var timer = setInterval(function() {
				splashRotator();
			}, 1500);
		}
	}, function() {	//jPreLoader callback function
		clearInterval();
		
			jQuery(function(){
			var v_url = document.URL;
			
			if (v_url.indexOf('#') != -1) {
			var v_hash = v_url.substring(v_url.indexOf("#")+1);
			
			
				jQuery('html, body').animate({					
				scrollTop: jQuery('#' + v_hash).offset().top - 70
				}, 200);
				return false;
			}
	});	
	});
	

	function splashRotator(){
		var cur = jQuery('#jSplash').children('.selected');
		var next = jQuery(cur).next();
		
		if(jQuery(next).length != 0) {
			jQuery(next).addClass('selected');
		} else {
			jQuery('#jSplash').children('section:first-child').addClass('selected');
			next = jQuery('#jSplash').children('section:first-child');
		}
			
		jQuery(cur).removeClass('selected').fadeOut(100, function() {
			jQuery(next).fadeIn(100);
		});
	}
		
	
	// mainmenu create span
	jQuery('#mainmenu > li > a').each(function(){	
		if($(this).next("ul").length > 0)  {
		$("<span></span>").insertAfter($(this));
		}
	});
	
	jQuery('#mainmenu > li > ul > li > a').each(function(){	
		if($(this).next("ul").length > 0)  {
		$("<span></span>").insertAfter($(this));
		}
	});
	

	// mainmenu arrow click
    jQuery("#mainmenu > li > span, #mainmenu > li > ul > li > span").on( "click", function() {
		$('header').css("height","auto");
        var iteration = $(this).data('iteration') || 1;
        switch (iteration) {
            case 1:
                $(this).next("ul").css("height","auto");
				var curHeight = $(this).next("ul").height();
				$(this).next("ul").css("height","0");
				$(this).next("ul").animate({'height': curHeight},300,'easeOutCubic');
				
				break;

            case 2:
                $(this).next("ul").animate({'height': "0"},300,'easeOutCubic');
				break;
        }
        iteration++;
        if (iteration > 2) iteration = 1;
        $(this).data('iteration', iteration);
    });
	
	
	if(logo_pos==1){
		h_center_logo();		
	}else{
		jQuery('header').removeClass("header_center");
		jQuery('header').addClass("header_left");
		jQuery('header.header_left #logo img').css('margin-top',logo_left_top_margin);
	}
	
	jQuery(window).resize(function() {
		enquire.register("screen and (min-width: 993px)", {
		match : function() {
			jQuery('header.header_left #logo img').css('margin-top',tmp_lltm);
			if(header_color_on_scroll==2){
				jQuery('header').addClass("header_light");
			}	
			// reset header class
			jQuery('header').css("height","70px");
			$('header').removeClass('smaller');
			$('header').removeClass('logo-smaller');
			$('header').removeClass('clone');		
			jQuery('header').removeClass("bg-dark");
			mobile_menu_show = 0;			
		},  
		unmatch : function() {
			jQuery('header.header_left #logo img').css('margin-top',"0px");
			if(header_color_on_scroll==2){
				jQuery('header').removeClass("header_light");
			}
		}
		});
		
		
		init_de();
		video_autosize();
		jQuery('#gallery').isotope('reLayout');
		
	});	
	

	function init() {
		
        window.addEventListener('scroll', function(e){
			
			var mq = window.matchMedia( "(min-width: 993px)" );
			
			if (mq.matches) {
				var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 40,
                header = document.querySelector("header");
            if (distanceY > shrinkOn) {
                classie.add(header,"smaller");
				jQuery('header').addClass("logo-smaller");
				logo_left_top_margin = '0px';
				if(logo_pos==2){
					jQuery('header.header_left #logo img').css('margin-top',logo_left_top_margin);
				}
            } else {
                if (classie.has(header,"smaller")) {
                    classie.remove(header,"smaller");
					jQuery('header').removeClass("logo-smaller");
				if(logo_pos==2){
					jQuery('header.header_left #logo img').css('margin-top',tmp_lltm);
				}
                }

            }
			}

            
        });
    }
    window.onload = init();


	js_magnificPopup();
	js_owlCarousel();

	
	
// --------------------------------------------------
// custom positiion
// --------------------------------------------------
	var $doc_height = jQuery(window).innerHeight(); 
	jQuery('#homepage #content.content-overlay').css("margin-top", $doc_height);
	var picheight = jQuery('.center-y').css("height");
	picheight = parseInt(picheight, 10);
	jQuery('.center-y').css('margin-top', (($doc_height - picheight)/2)-90);
	jQuery('.full-height').css("height", $doc_height);
	jQuery('.full-height .de-video-container').css("height",$doc_height);
	

	
// --------------------------------------------------
// blog list hover
// --------------------------------------------------
	jQuery(".blog-list").on("mouseenter", function () {
	 var v_height = jQuery(this).find(".blog-slide").css("height");
	 var v_width = jQuery(this).find(".blog-slide").css("width");
	 var newheight = (v_height.substring(0, v_height.length - 2)/2)-40;
	 jQuery(this).find(".owl-arrow").css("margin-top",newheight);
	  jQuery(this).find(".owl-arrow").css("width",v_width);
	  jQuery(this).find(".owl-arrow").fadeTo(150,1);
	 //alert(v_height);
	}).on("mouseleave", function () {
	 jQuery(this).find(".owl-arrow").fadeTo(150,0);
	 
  	})
	
	//  logo carousel hover
	jQuery("#logo-carousel img").on("mouseenter", function () {
	 jQuery(this).fadeTo(150,.5);
	}).on("mouseleave", function () {
	 jQuery(this).fadeTo(150,1);	 
  	})
	
	
	jQuery(window).load(function() {
			
	video_autosize();	
		
// --------------------------------------------------
// filtering gallery
// --------------------------------------------------
	var $container = jQuery('#gallery');
		$container.isotope({
			itemSelector: '.item',
			filter: '*'
	});
	jQuery('#filters a').on("click", function() {
		var $this = jQuery(this);
		if ( $this.hasClass('selected') ) {
			return false;
			}
		var $optionSet = $this.parents();
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');
				
		var selector = jQuery(this).attr('data-filter');
		$container.isotope({ 
		filter: selector
	});
	return false;
	});
	});

// --------------------------------------------------
// tabs
// --------------------------------------------------
	jQuery('.de_tab').find('.de_tab_content .tab_single_content').hide();
	jQuery('.de_tab').find('.de_tab_content .tab_single_content:first').show();
	jQuery('li').find('.v-border').fadeTo(150,0);
	jQuery('li.active').find('.v-border').fadeTo(150,1);
	
	jQuery('.de_nav li').click(function() {
		jQuery(this).parent().find('li').removeClass("active");
		jQuery(this).addClass("active");
		jQuery(this).parent().parent().find('.v-border').fadeTo(150,0);
		jQuery(this).parent().parent().find('.de_tab_content .tab_single_content').hide();
	
		var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
		jQuery(this).parent().parent().find('.de_tab_content .tab_single_content:eq(' + indexer + ')').fadeIn(); //uses whatever index the link has to open the corresponding box 
		jQuery(this).find('.v-border').fadeTo(150,1);
	});
	
	
// --------------------------------------------------
// tabs
// --------------------------------------------------
	jQuery('.de_review').find('.de_tab_content .tab_single_content').hide();
	jQuery('.de_review').find('.de_tab_content .tab_single_content:first').show();
	//jQuery('.de_review').find('.de_nav li').fadeTo(150,.5);
	jQuery('.de_review').find('.de_nav li:first').fadeTo(150,1);
	
	jQuery('.de_nav li').click(function() {
		jQuery(this).parent().find('li').removeClass("active");
		//jQuery(this).parent().find('li').fadeTo(150,.5);
		jQuery(this).addClass("active");
		jQuery(this).fadeTo(150,1);	
		jQuery(this).parent().parent().find('.de_tab_content .tab_single_content').hide();
	
		var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
		jQuery(this).parent().parent().find('.de_tab_content .tab_single_content:eq(' + indexer + ')').show(); //uses whatever index the link has to open the corresponding box 
	});
	
	
// --------------------------------------------------
// toggle
// --------------------------------------------------
	jQuery(".toggle-list h2").addClass("acc_active");
	jQuery(".toggle-list h2").toggle(
	function() {
	 jQuery(this).addClass("acc_noactive");
     jQuery(this).next(".ac-content").slideToggle(200);
	},
    function() {
	 jQuery(this).removeClass("acc_noactive").addClass("acc_active");
	 jQuery(this).next(".ac-content").slideToggle(200);
  	})
	
	var mb;
	
	// --------------------------------------------------
	// navigation for mobile
	// --------------------------------------------------
	jQuery('#menu-btn').on("click", function() {
		if(mobile_menu_show==0){
			jQuery('header').addClass("bg-dark");
			var mm_height = jQuery('#mainmenu').height();
			jQuery('header').stop(true).animate({height: mm_height+100}, 300);
			mobile_menu_show = 1;
		}else{
			jQuery('header').removeClass("bg-dark");
			jQuery('header').css("height","70px");
			mobile_menu_show = 0;			
		}
	})
	
// one page navigation
	      /**
         * This part causes smooth scrolling using scrollto.js
         * We target all a tags inside the nav, and apply the scrollto.js to it.
         */
		 
        jQuery("#homepage nav a, .scroll-to").click(function(evn){
			
			if (this.href.indexOf('#') != -1) {
            evn.preventDefault();
            jQuery('html,body').scrollTo(this.hash, this.hash); 
			}
        });
		
		jQuery(".scrollTo .de_nav li").click(function(evn){
			
			var $link = jQuery(this).attr('data-link');
			if ($link.indexOf('#') != -1) {
            evn.preventDefault();
            jQuery('html,body').scrollTo($link, $link); 
			}
        });
		
		jQuery("a.btn").click(function(evn){
			
			if (this.href.indexOf('#') != -1) {
            evn.preventDefault();
            jQuery('html,body').scrollTo(this.hash, this.hash); 
			}
        });
		
		jQuery('.item .icon-info').on("click", function() {
			jQuery('.page-overlay').show();
			url = jQuery(this).attr("data-value");
			
			jQuery("#loader-area .project-load").load(url, function() {
			jQuery("#loader-area").slideDown(500,function(){
				jQuery('.page-overlay').hide();
			jQuery('html, body').animate({
				scrollTop: jQuery('#loader-area').offset().top - 70
			}, 500, 'easeOutCubic');
			
		//
			
			jQuery(".image-slider").owlCarousel({
			items : 1,
			singleItem:true,	
			navigation : false,
			pagination : true,
			autoPlay : false
			});
			
			jQuery(".container").fitVids();
			
			jQuery('#btn-close-x').on("click", function() {
			jQuery("#loader-area").slideUp(500,function(){
			jQuery('html, body').animate({				
				scrollTop: jQuery('#section-gallery').offset().top - 70
			}, 500, 'easeOutCirc');
			});

			return false;			
				
				});  
			
			});			
		}); 
		});   
		
		jQuery('.item').on("click", function() {
			$('#navigation').show();
		});
		

// --------------------------------------------------
// custom page with background on side
// --------------------------------------------------
	jQuery('.side-bg').each(function(){	
		jQuery(this).find(".image-container").css("height",jQuery(this).find(".image-container").parent().css("height"));
	});
		
	var target = $('.center-y');
	var targetHeight = target.outerHeight();
	
// --------------------------------------------------	
// 	WINDOW ON SCROLL FUNCTION //
// --------------------------------------------------	
	$(document).scroll(function(e){
		
	// fade scroll
		var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
		if(scrollPercent >= 0){
			target.css('opacity', scrollPercent);
		}		
		
	// zoom scroll
		var $maxScroll=300;
		var $maxScale=1.3;
		var $x=$(window).scrollTop()/1000+1;
		if($(window).scrollTop()>$maxScroll) $x=$maxScale;
		$('.bg-scale').css({transform: 'scale('+$x+','+$x+')'});
	
	// sticky header	
		jQuery("header").addClass("clone", 1000, "easeOutBounce" );		
		var $document = $(document);
		var vscroll = 0;		
		if ($document.scrollTop() >= 50 && vscroll==0) {
			jQuery("header.autoshow").removeClass("scrollOff");
			jQuery("header.autoshow").addClass("scrollOn");
			vscroll = 1;
		 } else {
			jQuery("header.autoshow").removeClass("scrollOn");
			jQuery("header.autoshow").addClass("scrollOff");
			vscroll = 0;
		 }
		 
		 onScrollActive();
	});
});

	
// --------------------------------------------------
// css animation
// --------------------------------------------------
	var v_count = '0';

	jQuery(window).load(function() {
				
		jQuery('.animated').fadeTo(0,0);
		jQuery('.animated').each(function(){
		var imagePos = jQuery(this).offset().top;
		var timedelay = jQuery(this).attr('data-delay');
		
		var topOfWindow = jQuery(window).scrollTop();
			if (imagePos < topOfWindow+300) {
				jQuery(this).fadeTo(1,500);
				var $anim = jQuery(this).attr('data-animation');
			}
		});
		
		
		// btn arrow up
		jQuery(".arrow-up").on("click", function() {
			jQuery(".coming-soon .coming-soon-content").fadeOut("medium",function(){
				jQuery("#hide-content").fadeIn(600,function(){
					jQuery(".arrow-up").fadeTo(300,0);
					jQuery('.arrow-down').fadeTo(300,1);
				});
			});
		});
		
		// btn arrow down
		jQuery(".arrow-down").on("click", function() {
			jQuery("#hide-content").fadeOut("slow",function(){
				jQuery(".coming-soon .coming-soon-content").fadeIn(800,function(){
					jQuery(".arrow-up").fadeTo(300,1);
					jQuery('.arrow-down').fadeTo(300,0);
				});
			});
		});
		
		// isotope
		jQuery('#gallery').isotope('reLayout');

	});
	
	$("section,div").css('background-color', function () {
    return jQuery(this).data('bgcolor');
	});
	
	$("div").css('background-image', function () {
    return jQuery(this).data('bgimage');
	});
	