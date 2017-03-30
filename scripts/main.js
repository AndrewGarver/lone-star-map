// Creates all map content including markers and info windows
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    // center roughly over Greenpoint, BK
    center: {
      lat: 40.7214081,
      lng: -73.9620691
    },
    // Adjust how much of city you want to see initially
    zoom: 13,
    // Removing unsused controls
    mapTypeControl: false,
    streetViewControl: false,
    // All map coloring
    styles: [{
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{
            "saturation": 36
          },
          {
            "color": "#333333"
          },
          {
            "lightness": 40
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#fefefe"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "lightness": 17
          },
          {
            "weight": 1.2
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [{
          "hue": "#ff0000"
        }]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f5f5"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#cdcdcd"
        }]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [{
          "hue": "#ff0000"
        }]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#d8d8d8"
        }]
      },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#949494"
        }]
      },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.stroke",
        "stylers": [{
          "hue": "#ff0000"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f5f5"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#757575"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#dedede"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
          "hue": "#ff0000"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
          "hue": "#ff0000"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#0b0a0a"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "color": "#303030"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "lightness": 29
          },
          {
            "weight": 0.2
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "lightness": 18
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f2f2f2"
          },
          {
            "lightness": 19
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#ffffff"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#021C36"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#021C36"
        }]
      }
    ]
  });
  // Creates marker infowindow object and sets width
  // Content set later inside callback for click listener
  var infowindow = new google.maps.InfoWindow({
    maxWidth: 300
  });
  // Setting custom marker image
  var image = {
    url: './assets/lone-star-logo.png',
    scaledSize: new google.maps.Size(40, 40)
  };
  // markers array must be created
  var markers = [];
  // Grabbing unique key for each DATA object and putting in array
  var dataKeys = Object.keys(DATA);
  // For each DATA object we just got keys for, create a marker and set position
  for (var i = 0; i < dataKeys.length; i++) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(DATA[dataKeys[i]].Lat, DATA[dataKeys[i]].Lng),
      map: map,
      icon: image
    });
    // Push marker to markers array
    markers.push(marker);
    // Creates click even to open infowindow for markers
    // Content of infoWindow set inside callback
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(DATA[dataKeys[i]].Store);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

}
