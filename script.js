
// Initialize the map
var map = L.map('map').setView([22.9734, 78.6569], 5); // Center on India

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Simulating a loading screen delay
setTimeout(function() {
  loadingScreen.classList.add('hide-loading');
  setTimeout(function() {
      loadingScreen.style.display = 'none';
      mainContent.style.display = 'block';
  }, 1000); // Wait for the fade-out transition to complete
}, 3000);

// Visit data for cities with photos
var visitData = {
  "Delhi": {
    "date": "2024-01-01",
    "photo": "whatsapp-image-2022-09-29-at-215905_1664469058.jpeg"
  },
  "Vadodra": {
    "date": "2024-01-15",
    "photo": "OIP.jpg"
  },
  "Kashmir": {
    "date": "2024-03-18",
    "photo": "P-6-2.jpg"
  },
  "Kanyakumari": {
    "date": "2024-03-16",
    "photo": "SPIC-MACAY-founder-reaches-Doon-on-cycle.jpg"
  },
  "Guwahati": {
    "date": "2024-04-20",
    "photo": "whatsapp-image-2022-09-29-at-215905_1664469058.jpeg"
  }
};

// // JavaScript to toggle the reference popup
// document.getElementById('reference-btn').addEventListener('click', function() {
//   var content = document.getElementById('reference-content');
//   if (content.style.display === "block") {
//     content.style.display = "none";
//   } else {
//     content.style.display = "block";
//   }
// });

// JavaScript to toggle the reference popup
document.getElementById('reference-btn').addEventListener('click', function() {
  var content = document.getElementById('reference-content');
  content.style.display = (content.style.display === "block") ? "none" : "block";
});

// JavaScript to close the popup when clicking outside of it
document.addEventListener('click', function(event) {
  var popup = document.getElementById('reference-content');
  var button = document.getElementById('reference-btn');
  if (!popup.contains(event.target) && !button.contains(event.target)) {
    popup.style.display = 'none';
  }
});

// // JavaScript to toggle the reference popup with animation
// document.getElementById('reference-btn').addEventListener('click', function() {
//   var content = document.getElementById('reference-content');
//   if (content.classList.contains('visible')) {
//     content.classList.remove('visible');
//   } else {
//     content.classList.add('visible');
//   }
// });

// // JavaScript to close the popup when clicking outside of it
// document.addEventListener('click', function(event) {
//   var popup = document.getElementById('reference-content');
//   var button = document.getElementById('reference-btn');
//   if (!popup.contains(event.target) && !button.contains(event.target)) {
//     popup.classList.remove('visible');
//   }
// });




// Cities coordinates
var cities = [
  { "name": "Delhi", "lat": 28.6139, "lon": 77.2090 },             // Correct latitude and longitude for Delhi
  { "name": "Vadodra", "lat": 22.3072, "lon": 73.1812 },           // Correct latitude and longitude for Vadodara
  { "name": "Kashmir", "lat": 34.0837, "lon": 74.7973 },           // Correct latitude and longitude for Kashmir (Srinagar)
  { "name": "Kanyakumari", "lat": 8.0883, "lon": 77.5385 },        // Correct latitude and longitude for Kanyakumari
  { "name": "Guwahati", "lat": 26.1445, "lon": 91.7362 }           // Correct latitude and longitude for Guwahati
];

// Phase 1: Delhi to Vadodara
var phase1Cities = [
  { "name": "Delhi", "lat": 28.6139, "lon": 77.2090 },
  { "name": "Vadodra", "lat": 22.3072, "lon": 73.1812 }
];
var polylinePhase1 = L.polyline(phase1Cities.map(city => [city.lat, city.lon]), { 
  color: '#ff6600',        // Phase 1 color (orange)
  weight: 5,               // Line thickness
  opacity: 0.8,            // Line opacity
  dashArray: '10, 10',
  dashOffset: '0',
  lineJoin: 'round'}).addTo(map);
polylinePhase1.bindPopup("Phase 1: Delhi to Vadodara");

// Phase 2: Kashmir to Kanyakumari
var phase2Cities = [
  { "name": "Kashmir", "lat": 34.0837, "lon": 74.7973 },
  { "name": "Kanyakumari", "lat": 8.0883, "lon": 77.5385 }
];
var polylinePhase2 = L.polyline(phase2Cities.map(city => [city.lat, city.lon]), { 
  color: '#00cc44',        // Phase 2 color (green)
  weight: 5,
  opacity: 0.8,
  dashArray: '10, 10',
  dashOffset: '0',
  lineJoin: 'round'}).addTo(map);
polylinePhase2.bindPopup("Phase 2: Kashmir to Kanyakumari");

// Phase 3: Kanyakumari to Guwahati
var phase3Cities = [
  { "name": "Kanyakumari", "lat": 8.0883, "lon": 77.5385 },
  { "name": "Guwahati", "lat": 26.1445, "lon": 91.7362 }
];
var polylinePhase3 = L.polyline(phase3Cities.map(city => [city.lat, city.lon]), { 
  color: '#0044cc',        // Phase 3 color (blue)
  weight: 5,
  opacity: 0.8,
  dashArray: '10, 10',
  dashOffset: '0',
  lineJoin: 'round'}).addTo(map);
polylinePhase3.bindPopup("Phase 3: Kanyakumari to Guwahati");

// Zoom the map to fit all phases
map.fitBounds(L.featureGroup([polylinePhase1, polylinePhase2, polylinePhase3]).getBounds());

// Create a custom cyclist icon
var cyclistIcon = L.icon({
  iconUrl: 'logo.png', // Replace with your cyclist icon path
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

// Start the cyclist animation (e.g., 5000ms per segment)
animateCyclist(cities.map(city => [city.lat, city.lon]), cyclistMarker, 5000);

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

