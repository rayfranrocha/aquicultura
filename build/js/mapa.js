$(document).ready(function(){
 var el = document.getElementById('map');
                var map = new GMaps({
                  el: el,
                  lat: -3.0578086,
                  lng: -60.0067482,
                });
                map.addMarker({ 	
				 lat: -3.0578032,
                 lng: -60.0067482,
				 title: 'Auditório Vânia Pimentel',
				});
});