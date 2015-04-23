'use strict';

// Articles controller
angular.module('maps').controller('MapsController', ['$http', '$scope', '$stateParams', '$location', 'Authentication', 'Events',
	function($http, $scope, $stateParams, $location, Authentication, Events) {

 	if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position){
         $scope.$apply(function(){
         $scope.position = position;
         $scope.map.position = position;
         });
        });
        }
		$scope.authentication = Authentication;
		//$scope.events = Events.query();
		//console.log('I am in events');
		//$scope.results = Events.eventsnearby(100,200);
		//console.log($scope.results);
    $scope.createMap = function(data) {
	var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

		var latlngbounds = new google.maps.LatLngBounds();

    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.location[1], info.location[0]),
            title: info.title
        });
        marker.content = '<div class="infoWindowContent">' + info.content + '</div>';

				// fit this marker in the map
				var myLatLng = new google.maps.LatLng(info.location[1], info.location[0]);
				latlngbounds.extend(myLatLng);

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    };

    for (var i = 0; i < data.length; i++){
        createMarker(data[i]);
    }

		$scope.map.setCenter(latlngbounds.getCenter());
		$scope.map.fitBounds(latlngbounds);
    };

    $http.get('http://localhost:3000/nearby?lng=-121.922&lat=37.37').success(function(data){
			console.log(data);
			$scope.createMap(data);

	});


    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    };

		var input = document.getElementsByClassName('zipcode-input')[0];
		var searchBox = new google.maps.places.SearchBox(input);

		google.maps.event.addListener(searchBox, 'places_changed', function() {
			var places = searchBox.getPlaces();

			if (places.length === 0) {
				return;
			}

			var longitude = places[0].geometry.location.lng(),
				latitude = places[0].geometry.location.lat();
			var query = "http://localhost:3000/nearby?lng=" + longitude+ "&lat=" + latitude;

		    $http.get(query).success(function(data){
					console.log(data);
					$scope.createMap(data);

			});
		});

	}
]);
