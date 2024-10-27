
// 4th waala

// Initialize the map centered on India
var map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Data from Excel (Date, City, Distance, Latitude, Longitude)
var journeyData = [
  { "date": "15/Aug/2022", "endDate": "", "city": "Srinagar", "distance": 0, "lat": 34.083656, "lon": 74.797371 },
  { "date": "16/Aug/2022", "endDate": "", "city": "Anantnag", "distance": 60, "lat": 33.729729, "lon": 75.14978 },
  { "date": "17/Aug/2022", "endDate": "", "city": "Banihal", "distance": 40, "lat": 33.5617942, "lon": 75.1988626 },
  { "date": "18/Aug/2022", "endDate": "", "city": "Ramban", "distance": 45, "lat": 33.242134, "lon": 75.233688 },
  { "date": "19/Aug/2022", "endDate": "", "city": "Chanderkote", "distance": 15, "lat": 33.1896747, "lon": 75.3047647 },
  { "date": "20/Aug/2022", "endDate": "21/Aug/2022", "city": "Udhampur", "distance": 45, "lat": 32.916534, "lon": 75.132607 },
  { "date": "22/Aug/2022", "endDate": "", "city": "Nagrota", "distance": 50, "lat": 32.786697, "lon": 74.896889 },
  { "date": "23/Aug/2022", "endDate": "24/Aug/2022", "city": "Jammu", "distance": 11, "lat": 32.732998, "lon": 74.864273 },
  { "date": "25/Aug/2022", "endDate": "", "city": "Samba", "distance": 28, "lat": 32.5283917, "lon": 75.1200531 },
  { "date": "26/Aug/2022", "endDate": "", "city": "Hiranagar", "distance": 28, "lat": 32.4634685, "lon": 75.272324 },
  { "date": "27/Aug/2022", "endDate": "", "city": "Kathua", "distance": 30, "lat": 32.367966, "lon": 75.523478 },
  { "date": "28/Aug/2022", "endDate": "29/Aug/2022", "city": "Pathankot", "distance": 26, "lat": 32.265942, "lon": 75.646873 },
  { "date": "30/Aug/2022", "endDate": "", "city": "Mukerian", "distance": 42, "lat": 31.956289, "lon": 75.616844 },
  { "date": "31/Aug/2022", "endDate": "", "city": "Bhogpur", "distance": 45, "lat": 31.3260222, "lon": 75.5761759 },
  { "date": "01/Sep/2022", "endDate": "02/Sep/2022", "city": "Jalandar", "distance": 21, "lat": 31.3260152, "lon": 75.5761829 },
  // ... Continue adding all the cities in the same format
];

// Define key cities with larger markers
var keyCities = ["Srinagar", "Delhi", "Jalandar", "Nagpur", "Hyderabad", "Bhopal", "Kanyakumari"];

// Function to create markers with different sizes
function createMarker(cityData) {
  // Define marker options based on key cities (larger markers for key cities)
  var markerOptions = {
    radius: keyCities.includes(cityData.city) ? 10 : 5,  // Larger radius for key cities
    fillColor: keyCities.includes(cityData.city) ? "#ff0000" : "#0000ff",  // Red for key cities, blue for others
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  // Create a circle marker for each city
  var marker = L.circleMarker([cityData.lat, cityData.lon], markerOptions).addTo(map);

  // Popup content with city, visit date, and distance
  var popupContent = "<b>" + cityData.city + "</b><br>Date: " + cityData.date;
  if (cityData.endDate) popupContent += " - " + cityData.endDate;
  popupContent += "<br>Distance traveled: " + cityData.distance + " km";

  // Bind popup to marker
  marker.bindPopup(popupContent);

  // Show popup on hover
  marker.on('mouseover', function () {
    marker.openPopup();
  });

  marker.on('mouseout', function () {
    marker.closePopup();
  });
}

// Add city markers and connect them with a polyline
var latlngs = [];
journeyData.forEach(function (cityData) {
  createMarker(cityData);
  latlngs.push([cityData.lat, cityData.lon]);  // Collect lat/lng for polyline
});

// Add polyline connecting the cities
var polyline = L.polyline(latlngs, {
  color: '#ff6600',   // Orange line
  weight: 5,
  opacity: 0.8,
  dashArray: '10, 10',
  dashOffset: '0',
  lineJoin: 'round'
}).addTo(map);

// Fit map to show all cities
map.fitBounds(polyline.getBounds());
