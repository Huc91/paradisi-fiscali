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

		//accordion change icon when clicked
		//accordion change icon when clicked
		function toggleIcon(e) {
					$(e.target)
							.prev('#acc')
							.find(".more-less")
							.toggleClass('glyphicon-plus glyphicon-minus');
			}
			$('#Lux').on('hidden.bs.collapse', toggleIcon);
			$('#Lux').on('shown.bs.collapse', toggleIcon);

			$('#India').on('hidden.bs.collapse', toggleIcon);
			$('#India').on('shown.bs.collapse', toggleIcon);

			$('#HK').on('hidden.bs.collapse', toggleIcon);
			$('#HK').on('shown.bs.collapse', toggleIcon);







			//scroll link [smooth]
			$('a[href*=#]:not([href=#])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        -130}, 1000);
		        return false;
		      }
		    }
		  });

		//menu rai
			$(".menu, .shadow").click(function(){
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



		//mapbox maps
		mapboxgl.accessToken = 'pk.eyJ1IjoicmFpZGF0YWpvdXJuYWxpc20iLCJhIjoiY2o3dnUza2cxNHdpMjJxcnJmNmh4dXhkbiJ9.P-Ps_O_Cv6IcC8oIVeYJIQ';
		var map1 = new mapboxgl.Map({
				container: 'map1', // container id
				style: 'mapbox://styles/raidatajournalism/cj8g0lclg0uus2slbbguosvoc', // stylesheet location
				center: [-11.458, 11.740], // starting position [lng, lat]
				zoom: 2.0 // starting zoom
		});


		var layerMap1 = {
			ita : ['seychellesitaly', 'gibraltar_maldives_marshall italy', 'Italia', 'mauritius italy' ],
			oxfam: ['delaware6', 'gibraltar_maldives_marshall oxfam', 'seychelles oxfam', 'Oxfam', 'mauritius Oxfam'],
			ue:	['seychellesUe', 'Ue2', 'seychelles oxfam', 'gibraltar_maldives_marshall UE copy', 'mauritius UE']
		};


		map1.on('load', function () {
		//prevent scrolling of map if i'm just passing trough
		map1.scrollZoom.disable();
		var timer;

		$('.timer').on('mouseover', function(){
			timer = setTimeout(function(){
      map1.scrollZoom.enable();
    }, 3000);
		});

		// disable map rotation using right click + drag
		map1.dragRotate.disable();
		// disable map rotation using touch rotation gesture
		map1.touchZoomRotate.disableRotation();


		/*function getRadioValue( id ){
			var select = '.layer-control > ' + id;
			$(select)
		};*/
		var el = document.getElementById("layer-map1");
		el.addEventListener("change", checkRadio);

		function checkRadio(){
			var legendMap1 = document.getElementsByName('legenda_map1');
			legendMap1.forEach(function(element){
				//element.checked ? console.log(element.id + ' checked' ) : console.log(element.id + ' not_checked' );
				var groups = [];
				if (element.checked) {
			    for (var key in layerMap1) {
			      if (layerMap1.hasOwnProperty(key)) {
							 groups.push(key);
							}
						}
					console.log(groups);
					groups.forEach (function(group){
						layerMap1[group].forEach (function(layer){
							showLayer(layer);
						})
						if (group !== element.id && element.id !== 'all' ) {
						layerMap1[group].forEach (function(layer){
							console.log(layer);
							hideLayer(layer);
						})
						}
					})
					console.log(groups[1]);
					console.log(layerMap1[groups[0]]);
					}
				})
			}

			function hideLayer(layerID) {
				map1.setLayoutProperty(layerID, 'visibility', 'none');
			}

			function showLayer(layerID) {
					map1.setLayoutProperty(layerID, 'visibility', 'visible');
			}

	});


})
