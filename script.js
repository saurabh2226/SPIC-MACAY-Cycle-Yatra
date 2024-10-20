// 

// Initialize the map
var map = L.map('map').setView([22.9734, 78.6569], 5); // Center on India

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Visit data for cities with photos
var visitData = {
  "Varanasi": {
    "date": "2024-01-01",
    "photo": "https://shorturl.at/cZp8S"
  },
  "Agartala": {
    "date": "2024-01-15",
    "photo": "https://cdnbbsr.s3waas.gov.in/s3978d76676f5e7918f81d28e7d092ca0d/uploads/2022/09/2022092245-1024x560.jpg"
  },
};

// Cities coordinates
var cities = [
  { "name": "Varanasi", "lat": 25.3176, "lon": 82.9739 },
  { "name": "Agartala", "lat": 23.8315, "lon": 91.2868 },
];

// Add polyline connecting cities
var polyline = L.polyline(cities.map(city => [city.lat, city.lon]), { 
  color: '#ff6600',        // Beautiful vibrant color (orange)
  weight: 5,               // Line thickness
  opacity: 0.8,            // Line opacity
  dashArray: '10, 10',     // Dashed line pattern
  dashOffset: '0',         // Optional: can adjust the offset to create a shifting dash effect
  lineJoin: 'round'}).addTo(map);

// Zoom the map to fit the polyline
map.fitBounds(polyline.getBounds());

// Create a custom cyclist icon
var cyclistIcon = L.icon({
  iconUrl: 'https://akm-img-a-in.tosshub.com/lingo/itne/images/story/202403/65e8617e58117-inspiring-story-of-74-year-old-completes-a-solo-cycling-expedition-across-india-062845272-16x9.jpg', // Replace with your cyclist icon path
  iconSize: [40, 40],                   // Adjust size as needed
  iconAnchor: [20, 20]
});

// Create a marker representing the cyclist
var cyclistMarker = L.marker([cities[0].lat, cities[0].lon], { icon: cyclistIcon }).addTo(map);

// Function to animate the cyclist along the polyline
function animateCyclist(coords, marker, durationPerSegment) {
  var index = 0;
  var totalSegments = coords.length - 1;

  function moveToNextSegment() {
    if (index >= totalSegments) return; // Stop if we've finished all segments

    var start = coords[index];
    var end = coords[index + 1];
    var startTime = performance.now();

    function animateSegment() {
      var now = performance.now();
      var elapsedTime = now - startTime;
      var progress = elapsedTime / durationPerSegment;

      if (progress > 1) progress = 1;

      // Interpolate the marker's position along the line
      var lat = start[0] + (end[0] - start[0]) * progress;
      var lng = start[1] + (end[1] - start[1]) * progress;

      marker.setLatLng([lat, lng]);

      // If the segment is complete, move to the next one
      if (progress < 1) {
        requestAnimationFrame(animateSegment); // Continue animating this segment
      } else {
        index++; // Move to the next segment
        if (index < totalSegments) {
          moveToNextSegment(); // Start animating the next segment
        }
      }
    }

    requestAnimationFrame(animateSegment); // Start the segment animation
  }

  moveToNextSegment(); // Start animating the first segment
}

// Start the cyclist animation with a fast duration (e.g., 2000ms)
animateCyclist(cities.map(city => [city.lat, city.lon]), cyclistMarker, 5000); // 2000ms per segment

// Add markers and popups for each city
cities.forEach(function(city) {
  var visitInfo = visitData[city.name] || { date: "No data", photo: null };

  // Create marker for each city
  var marker = L.marker([city.lat, city.lon]).addTo(map);

  // Create popup content with visit date and photo
  var popupContent = "<b>" + city.name + "</b><br>Date visited: " + visitInfo.date;
  if (visitInfo.photo) {
    popupContent += '<br><img src="' + visitInfo.photo + '" alt="Visit photo" width="100">';
  }

  // Bind popup to marker
  marker.bindPopup(popupContent);

  // Show popup on hover
  marker.on('mouseover', function () {
    marker.openPopup();
  });

  marker.on('mouseout', function () {
    marker.closePopup();
  });
});
