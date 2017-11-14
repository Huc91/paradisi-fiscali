

//ATTENZIONE
//
//
//SOLO PER CODICE CHE INFLUENZA TUTTE LE PAGINE

$(function () { // wait for document ready

		//gallery initiliaze and parameters
		$('.galle').slick({
			dots: true,
			arrows: true,
			responsive: [
			 {
				 breakpoint: 1024,
				 settings: {
					 arrows: false
				 }
			 }
			]
		});
			//scroll link [smooth]
			$('a[href*=#]:not([href=#])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        +0}, 1000);
		        return false;
		      }
		    }
		  });

		//menu rai
			$(".menu, .shadow, .cap").click(function(){
				$("#menu").toggleClass("open");
				$(".menu").toggleClass("open");
				$("body").toggleClass("menuOpen");
				$(".shadow").fadeToggle(300);
			});

			$("#menu ul li a").click(function(){
				$("#menu").toggleClass("open");
				$(".menu").toggleClass("open");
				$("body").toggleClass("menuOpen");
				$(".shadow").fadeToggle(300);
			});

			$('.paradise-menu-container .paradise-menu-list-container a').hover(function() {
					$( this ).find('.h4-menu, .h5-menu, .h3-menu').toggleClass('hovering');
				  $( this ).siblings().toggleClass('hovering');
			});

			$('.paradise-menu-list-container-end a').hover(function() {
					$( this ).find('.h4-menu, .h5-menu, .h3-menu').toggleClass('hovering');
			});

//close of document ready
})
