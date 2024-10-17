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
  // Add more cities...
};

// Cities coordinates
var cities = [
  { "name": "Varanasi", "lat": 25.3176, "lon": 82.9739 },
  { "name": "Agartala", "lat": 23.8315, "lon": 91.2868 },
  // Add more cities...
];

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
