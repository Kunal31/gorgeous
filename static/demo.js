// --------------------------------------------------
// switcher.js by designesia 2013
// --------------------------------------------------

jQuery(document).ready(function() {	
	
	
	jQuery(".bg1").click(function(){
		jQuery("#colors").attr("href", "css/colors/green.css");
	});
	
	jQuery(".bg2").click(function(){
		jQuery("#colors").attr("href", "css/colors/orange.css");
	});
	
	jQuery(".bg3").click(function(){
		jQuery("#colors").attr("href", "css/colors/red.css");
	});
	
	jQuery(".bg4").click(function(){
		jQuery("#colors").attr("href", "css/colors/blue.css");
	});
	
	jQuery(".bg5").click(function(){
		jQuery("#colors").attr("href", "css/colors/pink.css");
	});
	
	jQuery(".bg6").click(function(){
		jQuery("#colors").attr("href", "css/colors/yellow.css");
	});
	
	jQuery(".bg7").click(function(){
		jQuery("#colors").attr("href", "css/colors/purple.css");
	});
	
	jQuery(".bg8").click(function(){
		jQuery("#colors").attr("href", "css/colors/brown.css");
	});
	
	jQuery(".bg9").click(function(){
		jQuery("#colors").attr("href", "css/colors/aqua.css");
	});
	
	
	
	jQuery(".custom-show").hide();
	
	jQuery(".custom-close").click(function(){
		jQuery(this).hide();
		jQuery(".custom-show").show();
		jQuery('#switcher').animate({'left': '+=120px'},'medium');
	});
  	

	jQuery(".custom-show").click(function(){
		jQuery(this).hide();
		jQuery(".custom-close").show();
		jQuery(this).parent().animate({'left': '-=120px'},'medium');
	});
	
	function resize(){
		enquire.register("screen and (min-width: 993px)", {
			match : function() {
				jQuery('header.header_left #logo img').css('margin-top',"30px");
			},  
			unmatch : function() {
				jQuery('header.header_left #logo img').css('margin-top',"0px");
			}
			});
	}
	
	function header_style(){
	
		jQuery('#de-header').on('change', function() {
			v = this.value
			if(v=='opt-1'){
				$('header').removeClass('header_left');
				$('header').addClass('header_center');
				$('.logo_pos').show();				
			}else if(v=='opt-2'){
				$('header').removeClass('header_center');
				$('header').addClass('header_left');
				$('.logo_pos').hide();				
			}
			
			$('header').hide();
			$('header').fadeTo( "300", 1 );
			resize();
			
		});
	
	}
	
	header_style();
	
	jQuery('#de-header-color').on('change', function() {
			v = this.value
			if(v=='opt-1'){
				$('header').addClass('header_light');
			}else if(v=='opt-2'){
				$('header').removeClass('header_light');
			}
	});
	
	window.onresize = function(event) {
		
		header_style();
		
	};	
	
	jQuery('#de-menu').on('change', function() {
		$('#mainmenu').removeClass('no-separator');
		$('#mainmenu').removeClass('line-separator');
		$('#mainmenu').removeClass('circle-separator');
		$('#mainmenu').removeClass('square-separator');
		$('#mainmenu').removeClass('plus-separator');
		$('#mainmenu').removeClass('strip-separator');
		v = this.value
		if(v=='opt-1'){
			$('#mainmenu').removeClass('no-separator');
			$('#mainmenu').removeClass('line-separator');
		}else if(v=='opt-2'){
			$('#mainmenu').addClass('line-separator');
		}else if(v=='opt-3'){
			$('#mainmenu').addClass('circle-separator');
		}else if(v=='opt-4'){
			$('#mainmenu').addClass('square-separator');
		}else if(v=='opt-5'){
			$('#mainmenu').addClass('plus-separator');
		}else if(v=='opt-6'){
			$('#mainmenu').addClass('strip-separator');
		}else if(v=='opt-0'){
			$('#mainmenu').addClass('no-separator');
		}
	});
	
	jQuery('#de-pattern li').click(function(){
		n = jQuery('#de-layout').val();
		if(n=="boxed"){
			className = jQuery(this).attr('class');
			jQuery('body').removeClass();
			jQuery('body').addClass(className);
		}else{
			alert('Please select boxed layout first.');
		}
			
	});
});

