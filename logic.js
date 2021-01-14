// Store USGS API endpoint as queryUrl
const usgsUrl =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
console.log(usgsUrl);

// Use d3 json to parse the data from the API 
d3.json(usgsUrl).then(quakeData);


//Store the features of the geojson into variable to pass to the layer render
function quakeData(data) {
  let earthQuakeLayer = createEarthQuakeLayer(data.features);
  createMap(earthQuakeLayer);
}

// Function to create the earthquake marker map layer 
function createEarthQuakeLayer(earthquakeData) {

  // Call functions to create the popups and the circle markers respectively
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: pointToLayer,

  });


  // Function gets lat and long from points and creates styled circle markers
  function pointToLayer(point, latlng) {
    console.log("point to layer");
    console.log(point.properties.mag);
    var geojsonMarkerOptions = {
      radius: point.properties.mag*10,
      fillColor: colorSelect(point.properties.mag),
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7,
    };


    // function to color markers based on eartquake magnitude and return to pointtolayer
    function colorSelect(mag){
      if (mag>=4){
        return "#800026";
      }else if(mag>=3.5){
        return "#bd0026";
      }else if(mag>=3){
        return "#e31a1c";
      }else if(mag>=2.5){
        return "#fc4e2a";
      }else if(mag>=2){
        return "#fd8d3c";
      }else if(mag>=1.5){
        return "#feb24c";
      }else if(mag>=1){
        return "#fed976";
      }else if(mag>=0.5){
        return "#ffeda0";
      }else return "#ffffcc";
    };

    return L.circleMarker(latlng, geojsonMarkerOptions);
  }


  // Function to create information popups for each quake marker
  function onEachFeature(feature, layer) {
    console.log("on each feature...");

    layer.bindPopup(
      "<h3>" +
      feature.properties.place +
      "</h3><hr><p>" +
      new Date(feature.properties.time) +
      "Magnitude: " +
      feature.properties.mag +
      "</p>"
    );
  }

  return earthquakes;
}

// Function to retrieve base map parts and build and assemble and render final map
function createMap(earthquakes) {
  // Retrieve data from mapbox api and define streetmap, darkmap, and satellite map base layers
  var streetmap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY,
    }
  );

  var darkmap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY,
    }
  );

  var satellitemap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
      id: "satellite-streets-v11",
      accessToken: API_KEY,
    }
  );  


  // Define the baseMaps object to hold the base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satellite Map": satellitemap,
  };


  // Retrieve tectonic plate geojson data from github and create a new empty layer group for it
  var tplates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
  var tectonics = new L.LayerGroup();
  console.log(tplates);
 

  // use d3 to parse geojson data and pass to rendering function
  d3.json(tplates).then(plates);


  // function to take polygon geojson and add to the previously created layer group after removing default fill color
  function plates(tdata) {
    L.geoJSON(tdata,{
      style: function(){
        return{
          fillOpacity:0
        }
      }
    }).addTo(tectonics);
  }


  // define overlay object to hold the overlay layer for the eartquake markers/popups and tectonic plate polys
  var overlayMaps = {
    "Tectonic Plates": tectonics,
    Earthquakes: earthquakes,
    
  };


  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, tectonics, earthquakes],
  });
  
  
  // Create the layer control(collapsed) in the top right and the distance scale in the lower left
  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: true,

    })
    .addTo(myMap);
    L.control.scale().addTo(myMap);


  // function to return the color to render for each entry in the color legend 
  function getColor(d) {
    return d >= 4 ? '#800026' :
    d >= 3.5? '#bd0026' :
    d >= 3? '#e31a1c' :
    d >= 2.5? '#fc4e2a' :
    d >= 2 ? '#fd8d3c' :
    d >= 1.5 ? '#feb24c' :
    d >= 1 ? '#fed976' :
    d >= 0.5 ? '#ffeda0' :
    '#ffffcc';
    }

    
  // Create the color legend html element in the lower right of the map and populate 
  var legend = L.control({position: "bottomright"});
  legend.onAdd = function (map) { 
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0,0.5,1,1.5,2,2.5,3,3.5,4];
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      return div;
      };

  legend.addTo(myMap);

}
