(function($) {
	
	$window = $(window);
	$slide = $('.homeSlide');
	$body = $('body');
	
	$body.imagesLoaded(function() {
		setTimeout(function() {
		      adjustWindow();
			  $body.removeClass('loading').addClass('loaded');
		}, 800);
	});
	
	function adjustWindow(){
	    winH = $window.height();
	    winH <= 550 ? winH = 550 : winH = winH;
        
	    $slide.height(winH);
    }
		
} )( jQuery );