 // Store API endpoint to queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// GET request to the queryUrl
d3.json(queryUrl, function(data) {
// After received responsed, send the data.features object to the createFeatures
  createFeatures(data.features);
});

function circleSize(feature)
{
  return feature.properties.mag * 7; 
}

//logic - circle color (from red to greeen baseds on the features)
function circleOptions(feature){
  if(feature.geometry.coordinates[2] >= 90)
  {
return  {
  radius: circleSize(feature),
  fillColor: "#ff5f65", //red++
  color: "#000",
  weight: 1,
  fillOpacity: 0.8
}
  }
else if (feature.geometry.coordinates[2] < 90 && feature.geometry.coordinates[2] >= 70)
{
  return {
    radius: circleSize(feature),
    fillColor: "#fca35d", //red
    color: "#000",
    weight: 1,
    fillOpacity: 0.8
}
  }
  else if (feature.geometry.coordinates[2] < 70 && feature.geometry.coordinates[2] >= 50)
{
  return {
    radius: circleSize(feature),
    fillColor: "#fcb62b", //orange
    color: "#000",
    weight: 1,
    fillOpacity: 0.8
}
  }
  else if (feature.geometry.coordinates[2] < 50 && feature.geometry.coordinates[2] >= 30)
{
  return {
    radius: circleSize(feature),
    fillColor: "#f7db11", //yellow
    color: "#000",
    weight: 1,
    fillOpacity: 0.8
}
  }
  else if (feature.geometry.coordinates[2] < 30 && feature.geometry.coordinates[2] >= 10)
{
  return {
    radius: circleSize(feature),
    fillColor: "#dcf400", //yellow/green
    color: "#000",
    weight: 1,
    fillOpacity: 0.8
}
  }
  else
{
  return {
    radius: circleSize(feature),
    fillColor: "#a3f600", //light green
    color: "#000",
    weight: 1,
    fillOpacity: 0.8
}
  }
};


 // Create a function to run once for each feature in the array
  // Create a popup to describ the place and time of earthquakes

function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, circleOptions(feature));//return the points as a circle rather than a pin on the map
  },
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define lightmap and darkmap layers
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "?? <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> ?? <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery ?? <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [lightmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

//Create legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML += "<h4>Earthquake<br>Depth</h4>";
  div.innerHTML += '<i style="background: #a3f600"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: #dcf400"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: #f7db11"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: #fcb62b"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: #fca35d"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: #ff5f65"></i><span>90+</span><br>';

  return div;
};

legend.addTo(myMap);
}//Store the queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  
  createFeatures(data.features);
});

function circleSize(feature)
{
  return feature.properties.mag * 7; //scale the radius of the circle in relation to the magnitude of the earthquake
}

//logic for determining color of the circles
function circleOptions(feature){
  if(feature.geometry.coordinates[2] >= 90)
  {
return  {
  radius: circleSize(feature),
  fillColor: "#ff5f65", //dark red
  color: "#000",
  weight: 1,
  fillOpacity: 0.8
}
  }
else if (feature.geometry.coordinates[2] < 90 && feature.geometry.coordinates[2] >= 70)
{
  return {
    radius: circleSize(feature),
    fillColor: "#fca35d", //light red
    color: "#000",
    weight: 1,
    fillOpacity: 0.8
}
  }
  else if (feature.geometry.coordinates[2] < 70 && feature.geometry.coordinates[2] >= 50)
{
  return {
    radius: circleSize(feature),
    fillColor: "#fcb62b", //orange
    color: "#000",
    weight: 1,
    fillOpacity: 0.8
}
  }
  else if (feature.geometry.coordinates[2] < 50 && feature.geometry.coordinates[2] >= 30)
{
  return {
    radius: circleSize(feature),
    fillColor: "#f7db11", //yellow
    color: "#000",
    weight: 1,
    fillOpacity: 0.8
}
  }
  else if (feature.geometry.coordinates[2] < 30 && feature.geometry.coordinates[2] >= 10)
{
  return {
    radius: circleSize(feature),
    fillColor: "#dcf400", //yellow green
    color: "#000",
    weight: 1,
    fillOpacity: 0.8
}
  }
  else
{
  return {
    radius: circleSize(feature),
    fillColor: "#a3f600", //light green
    color: "#000",
    weight: 1,
    fillOpacity: 0.8
}
  }
};

function createFeatures(earthquakeData) {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, circleOptions(feature));//return the points as a circle rather than a pin on the map
  },
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define lightmap and darkmap layers
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "?? <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> ?? <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery ?? <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [lightmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

//Create legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML += "<h4>Earthquake<br>Depth</h4>";
  div.innerHTML += '<i style="background: #a3f600"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: #dcf400"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: #f7db11"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: #fcb62b"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: #fca35d"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: #ff5f65"></i><span>90+</span><br>';

  return div;
};

legend.addTo(myMap);
}