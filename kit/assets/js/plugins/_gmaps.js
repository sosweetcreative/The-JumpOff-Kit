$(document).ready(function() {
    $maps = $('.map_canvas');
    $maps.each(function(index, Element) {
        $infotext = $(Element).children('.infotext');

var styles = [

{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
     { "saturation": 36 },
     { "color": "#f16d49"  },
     { "lightness": 10 }
    ]
			},
				{
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
     { "visibility": "on" },
     { "color": "#000000" },
     { "lightness": 16 }
    ]
			},
			{
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
	    {  "visibility": "off" }
    ]
			},
			{
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
     { "color": "#111111" },
     { "lightness": 50 }
    ]
			},
			{
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
     { "color": "#000000" },
     { "lightness": 17 },
     { "weight": 1.2 }
    ]
},
{
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [
     { "visibility": "off" }
    ]
},
{
    "featureType": "administrative.country",
    "elementType": "all",
    "stylers": [
      { "visibility": "simplified" }
    ]
},
{
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [
      { "visibility": "simplified" }
    ]
},
{
    "featureType": "administrative.country",
    "elementType": "labels.text",
    "stylers": [
      { "visibility": "simplified"}
    ]
},
{
    "featureType": "administrative.province",
    "elementType": "all",
    "stylers": [
     { "visibility": "off" }
    ]
},
{
    "featureType": "administrative.locality",
    "elementType": "all",
    "stylers": [
     { "visibility": "simplified" },
     { "saturation": "-100" },
     { "lightness": "30" }
    ]
},
{
    "featureType": "administrative.neighborhood",
    "elementType": "all",
    "stylers": [
      { "visibility": "off" }
    ]
},
{
    "featureType": "administrative.land_parcel",
    "elementType": "all",
    "stylers": [
     { "visibility": "off" }
    ]
},
{
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
     { "visibility": "simplified" },
     { "gamma": "0.00" },
     { "lightness": "74" }
    ]
},
{
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
     { "color": "#000000" },
     { "lightness": 20 }
    ]
},
{
    "featureType": "landscape.man_made",
    "elementType": "all",
    "stylers": [
     { "lightness": "3" }
    ]
},
{
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
     { "visibility": "off" }
    ]
},
{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
     { "color": "#000000" },
     { "lightness": 21 }
    ]
},
{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
     { "visibility": "simplified" }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
     {  "color": "#000000" },
     { "lightness": 15 }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
     { "color": "#000000" },
     { "lightness": 29 },
     { "weight": 0.2 }
    ]
},
{
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
     { "color": "#000000" },
     { "lightness": 18 }
    ]
},
{
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
     { "color": "#000000" },
     { "lightness": 16 }
    ]
},
{
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
     { "color": "#000000" },
     { "lightness": 19 }
    ]
},
{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
     { "color": "#000000" },
     { "lightness": 17 }
    ]
}
];

        var myOptions = {
            'zoom': parseInt($infotext.children('.zoom').text()),
            'mapTypeId': google.maps.MapTypeId.ROADMAP,
            'mapTypeControl': false,
            'scrollwheel': false,
            'zoom': 16,
            'disableDefaultUI': true,
            'styles': styles
        };

        
        //map.setOptions({styles: styles});
        var map;
        var geocoder;
        var marker;
        var infowindow;
        
        var address = $infotext.children('.address').text() + ', '
                + $infotext.children('.city').text() + ', '
                + $infotext.children('.state').text() + ' '
                + $infotext.children('.zip').text() + ', '
                + $infotext.children('.country').text()
        ;
        var content = '<strong>' + $infotext.children('.location').text() + '</strong><br />'
                + $infotext.children('.address').text() + '<br />'
                + $infotext.children('.city').text() + ', '
                + $infotext.children('.state').text() + ' '
                + $infotext.children('.zip').text()
        ;
        if (0 < $infotext.children('.phone').text().length) {
            content += '<br />' + $infotext.children('.phone').text();
        }

        geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                myOptions.center = results[0].geometry.location;
                map = new google.maps.Map(Element, myOptions);
                marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    animation: google.maps.Animation.DROP,
                    color: '#0000ff',
                    title: $infotext.children('.location').text()
         

                });
                infowindow = new google.maps.InfoWindow({'content': content});
                google.maps.event.addListener(map, 'tilesloaded', function(event) {
                    infowindow.open(map, marker);
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });
            } else {
                alert('The address could not be found for the following reason: ' + status);
            }
        });
        
        
    });
    });
    
    
   /* Useage
   -----------------------------------------
   Parses text into a Gmap, from a vcard.
   
   <!-- Sect Map
   ================================================== -->
   <section class="sect-map">		
   	<article class="map_canvas" id="map_canvas">
     <div class="infotext">
      <div class="location">Way of the Dog</div>
      <div class="address">527 S. Juanita Ave</div>
      <div class="city">Redondo Beach</div>
      <div class="state">CA</div>
      <div class="zip">90277</div>
      <div class="country">USA</div>
      <div class="phone">310-543-0375</div>
      <div class="zoom">14</div>
     </div>
   	</article>
   </section>
   
   */