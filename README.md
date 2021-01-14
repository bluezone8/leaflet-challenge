# Leaflet CHALLENGE

### Purpose
The purpose of this repository is to store files related to the USGS Earthquake Data Visualization project providing a web based interactive display of earthquake data
_______
### Tool Choices 

The software tools chosen for this project include:
1.  HTML as the structure of the site
2. CSS to provide the stylings for the site.
3. Javascript provides the interactivity functionality for the site. The Leaflet library is used to render the visuals in terms of the maps (which are being called  from mapbox.com API), the earthquake markers, as well as the figures included.  The d3 library is used to fetch the eartquake data from the USGS and parse it.  
  
___________
### Implementation

The requirement for this project was to provide a web page that depicts the locations and magnitudes of earthquakes for the last X time period using map markers that illustrate those properties by size and color differences (which are also included in a legend  in the lower right hand corner of the map providing the user with a reference for the color of the earthquake markers and their associated magnitudes).  Additionally, the user is to be provided information on a given quake in the form of a popup when that quake marker is clicked on the map.  Bonus optional content that provides additional visual infromation and interactivity features to the user is also included in this implementation.  These features included: depiction of the earth tectonic plate boundaries on the maps, additional map options that change the viewing of the geography(these include: a street map, a dark map, and a satellite map), and a user control that allows the user to change the type of map displayed as well as add or remove the depictions of the earthquakes and/or tectonic plates from the map.  A final inclusion that was not mentioned in the optional features is the distamce scale provided in the lower left of the map.  

A few points related to the implemenattion of this tool are worth noting.  1. The colors of the earthquake markers (from a very light yellow to a very deep red) that illustrate the magnitudes of the earthquakes were selected to best display the relative strengths of the earthquakes and allow all of the number of overlapping earthquake occureneces to be seen clearly.  Thus the range includes the 9 colors shown in the bottom right legend at a partial transparency to facilitate this.  2.  The relative magnitudes of the earthquakes are also depicted by differences in sizes of the circle markers with increasing magnitude resulting in increasing size of the circle markers.  The size scaling for the markers was selected based on values that made the differences in the magnitudes clear but not so much that the markers became too large and obscured the boundaries of the individual earthquake markers and became visually distracting by hiding too juch of the underlying map.  
 

________

 ### Included Items

 #### I. Site Files: 
 * index.html  - the basic html for the chart page
 * logic.js  - the logic code script file to draw the chart and provide the interactivity
 * styles.css - the css styling script to style ceratin elements in the html 
 #### II. Information Files:
 *  Site Images - images of the site functionality in operation: 
--  Streets default.jpg - Image of the default map when opened 
--  Dark Select.jpg - image of the user selected dark map background 
--  Satellite Select.jpg - image of the user selected satellite map background.
--  Earthqaukes Off.jpg - image of user selected removal of the eartquake markers from the map
--  Tectonic Off.jpg - image of the user selected removal of the tectonic plates from the map
--  Popup Info.jpg - image of eartquake information popup following click of user selected earthquake marker
 * README.md
 
