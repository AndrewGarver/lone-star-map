var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7245, lng: -73.9419},
    zoom: 12
  });
}
