// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random song to the page.
 */
function addRandomSong() {
  const songs =
      ['Hey Jude', 
      'First Day of My Life', 
      'Perfect', 'Youth', 'Brown-Eyed Girl',
      'You and I', 'Drops of Jupiter'];

  // Pick a random song.
  const song = songs[Math.floor(Math.random() * songs.length)];

  // Add it to the page.
  document.getElementById('song-container').innerText = song;
}

/**
 * Adds a random musical to the page.
 */
function addRandomMusical() {
  const musicals =
      ['Hamilton', 
      'Les Misérables', 
      'Wicked', 'Grease', 'Phantom of the Opera',
      'Jersey Boys'];

  // Pick a random musical.
  const musical = musicals[Math.floor(Math.random() * musicals.length)];

  // Add it to the page.
  document.getElementById('musical-container').innerText = musical;
}

/**
 * Fetches comment form the servers based on input.
 */
function setAuthMode(input) {
  fetch(input).then(response => response.json()).then((status) => {
      const form = document.getElementById('comment-form');
      form.innerHTML = status;
      getComments();
    });
}

/**
 * Sets user mode for commenting.
 */
function getUserMode() {
    setAuthMode("/login");
}

/**
 * Sets guest mode for commenting.
 */
function getGuestMode() {
    setAuthMode("/login?guest=true");
}

/**
 * Fetches comments from the servers and adds them to the DOM.
 */
function getComments() {
    var quantity = getQuantity();
    fetch('/data?quantity='+ quantity).then(response => response.json()).then((comments) => {
        const dataListElement = document.getElementById('comment-container');
        dataListElement.innerHTML = '';
        comments.forEach((comment) => {
        dataListElement.appendChild(createTableRowElement(comment));
    })
  });
}

/**
 * Fetches quantity of comments specified by the user from the form.
 */
function getQuantity() {
  var quantity = document.getElementById("quantity");
  var strQuantity = quantity.options[quantity.selectedIndex].value;
  return strQuantity;
}

/** 
 * Creates an table row element,<tr><td> </td></tr>, containing text. 
 */
function createTableRowElement(commentObj) {
  const trElement = document.createElement('tr');
  const thElement = document.createElement('th');
  const tdElement = document.createElement('td');

  if (commentObj.email == "N/A" || commentObj.email == "undefined"){
      thElement.innerText = commentObj.name;
  }
  else{
    thElement.innerHTML = '<abbr title="' + commentObj.email + '"'+ 
        'style = "text-decoration: none">' +
        '<a href = "mailto:' + commentObj.email + '" target="_blank"'+
        'style = "text-decoration: none">' +
        commentObj.name +
        '</a></abbr>';
    }
  tdElement.innerText = '"' + commentObj.comment + '"';

  thText = thElement.outerHTML;
  tdText = tdElement.outerHTML;

  trElement.innerHTML = thText + tdText;
  return trElement;
}

/**
 * Deletes comments from the server.
 */
function deleteComments() {
  fetch('/delete-data', {method: 'POST'}).then(getComments)
}


/** Creates a map and adds it to the page. */
function createMap() {
  const map = new google.maps.Map(
  document.getElementById('map'),
  	{center: {lat: 40, lng: -110}, 
     zoom: 3,
     styles: [
            {elementType: 'geometry', stylers: [{color: '#fffed6'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#fffed6'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#9c9c9c'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#b0b0b0'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#b0b0b0'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#fff5b8'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#bababa'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#cfcfcf'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#cfcfcf'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca4ff'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#858585'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#858585'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#c2c2c2'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#f7ffed'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d4d4d4'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#b0deff'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#4596ff'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#4596ff'}]
            }
  				]});
	setMarkers(map);
}

/** Sets markers (of favorite places) on map. */
function setMarkers(map){
  const pinkStar = {
      path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
      fillColor: '#ff29a9',
      fillOpacity: 1.0,
      scale: 0.08,
      strokeColor: 'white',
      strokeWeight: 0.5,
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 100),
      labelOrigin: new google.maps.Point(0, -50)
    };

  const balboaStar = {
      path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
      fillColor: '#ff29a9',
      fillOpacity: 1.0,
      scale: 0.08,
      strokeColor: 'white',
      strokeWeight: 0.5,
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, -100),
      labelOrigin: new google.maps.Point(0, 350)
    };

	var markerBeachClub = new google.maps.Marker({
    position: {lat: 34.025815, lng: -118.515820},
    title: 'Santa Monica Beach',
    label: {text: 'Santa Monica Beach', color: '#d4007f'},
    map: map,
    icon: pinkStar
  });
  
	var markerDuke = new google.maps.Marker({
    position: {lat: 36.0014, lng: -78.9382},
    title: 'Duke University',
    label: {text: 'Duke University', color: '#d4007f'},
    map: map,
    icon: pinkStar
  });
  
	var markerBalboa = new google.maps.Marker({
    position: {lat: 33.606222, lng: -117.893036},
    title: 'Balboa Island',
   	label: {text:'Balboa Island', color: '#d4007f'},
    map: map,
    icon: balboaStar
  });

	var markerHonolua = new google.maps.Marker({
    position: {lat: 21.011843, lng: -156.638599},
		title: 'Honolua Bay',
		label: {text: 'Honolua Bay', color: '#d4007f'},
    map: map,
    icon: pinkStar
  });
  
  var bounds = new google.maps.LatLngBounds();
  bounds.extend(markerHonolua.getPosition());
  bounds.extend(markerBalboa.getPosition());
  bounds.extend(markerDuke.getPosition());
  bounds.extend(markerBeachClub.getPosition());
  map.fitBounds(bounds);
  
  var infoWindowDuke = getInfoWindow('duke');
 google.maps.event.addListener(map, 'click', function(){
    infoWindowDuke.close(map, markerDuke);
    map.fitBounds(bounds);
  });
  google.maps.event.addListener(infoWindowDuke, 'closeclick', function() {
  	map.fitBounds(bounds);
	});

  var infoWindowBalboa = getInfoWindow('balboa');
  google.maps.event.addListener(map, 'click', function(){
    infoWindowBalboa.close(map, markerBalboa);
    map.fitBounds(bounds);
  });
  google.maps.event.addListener(infoWindowBalboa, 'closeclick', function() {
  	map.fitBounds(bounds);
	});

  var infoWindowHonolua = getInfoWindow('honolua');
  google.maps.event.addListener(map, 'click', function(){
    infoWindowHonolua.close(map, markerHonolua);
    map.fitBounds(bounds);
  });
  google.maps.event.addListener(infoWindowHonolua, 'closeclick', function() {
  	map.fitBounds(bounds);
	});

  var infoWindowBeachClub = getInfoWindow('beachclub');
  google.maps.event.addListener(map, 'click', function(){
    infoWindowBeachClub.close(map, markerBeachClub);
    map.fitBounds(bounds);
  });
  google.maps.event.addListener(infoWindowBeachClub, 'closeclick', function() {
  	map.fitBounds(bounds);
	});
  
  markerDuke.addListener('click', function(){
    map.setZoom(15);
    map.setCenter(markerDuke.getPosition());
    infoWindowDuke.open(map, markerDuke);
  });
  markerDuke.addListener('mouseover', function(){
   	pinkStar.fillColor = "white";
    pinkStar.strokeColor = '#ff29a9';
  	markerDuke.setIcon(pinkStar);
  });
  markerDuke.addListener('mouseout', function(){
    pinkStar.fillColor = '#ff29a9';
  	pinkStar.strokeColor = "white";
   	markerDuke.setIcon(pinkStar);
  });
  
  markerHonolua.addListener('click', function(){
    map.setZoom(15);
    map.setCenter(markerHonolua.getPosition());
    infoWindowHonolua.open(map, markerHonolua);
  });
  markerHonolua.addListener('mouseover', function(){
    	pinkStar.fillColor = "white";
      pinkStar.strokeColor = '#ff29a9';
    	markerHonolua.setIcon(pinkStar);
  });
  markerHonolua.addListener('mouseout', function(){
      pinkStar.fillColor = '#ff29a9';
    	pinkStar.strokeColor = "white";
    	markerHonolua.setIcon(pinkStar);
  });
  
  markerBalboa.addListener('click', function(){
    map.setZoom(15);
    map.setCenter(markerBalboa.getPosition());
    infoWindowBalboa.open(map, markerBalboa);
  });
  markerBalboa.addListener('mouseover', function(){
    	balboaStar.fillColor = "white";
      balboaStar.strokeColor = '#ff29a9';
    	markerBalboa.setIcon(balboaStar);
  });
  markerBalboa.addListener('mouseout', function(){
      balboaStar.fillColor = '#ff29a9';
    	balboaStar.strokeColor = "white";
    	markerBalboa.setIcon(balboaStar);
  });
  
  markerBeachClub.addListener('click', function(){
    map.setZoom(15);
    map.setCenter(markerBeachClub.getPosition());
    infoWindowBeachClub.open(map, markerBeachClub);
  });
  markerBeachClub.addListener('mouseover', function(){
    	pinkStar.fillColor = "white";
      pinkStar.strokeColor = '#ff29a9';
    	markerBeachClub.setIcon(pinkStar);
  });
  markerBeachClub.addListener('mouseout', function(){
      pinkStar.fillColor = '#ff29a9';
    	pinkStar.strokeColor = "white";
    	markerBeachClub.setIcon(pinkStar);
  });
}

function getInfoWindow(marker_name){
	var contentString = getContentString(marker_name);
	var infowindow = new google.maps.InfoWindow({
      content: contentString
      });
  return infowindow
}

/** Returns html content for specified marker's info window */
function getContentString(marker_name){
  var content=  '<div id="img-content">'+
     		'<div class="image-thumbnails">'
        
	if (marker_name == 'balboa'){
  	content += '<a href="images/birds.jpg"><img src="images/birds.jpg"/></a>'+
    		'<a href="images/mustardflowers.jpg"><img src="images/mustardflowers.jpg"/></a>'
  }
  
  if (marker_name == "duke"){
  	content += '<a href="images/flowerschapel.jpg"><img src="images/flowerschapel.jpg"/></a>'+
    		'<a href="images/sunsetduke.jpg"><img src="images/sunsetduke.jpg"/></a>'+
        '<a href="images/chapel.jpg"><img src="images/chapel.jpg"/></a>'
  }
  
  if (marker_name == "honolua"){
    content += '<a href="images/rainbow.jpg"><img src="images/rainbow.jpg"/></a>'+
          '<a href="images/poolsunset.jpg"><img src="images/poolsunset.jpg"/></a>'+
          '<a href="images/tree.jpg"><img src="images/tree.jpg"/></a>'
  }
  
  if (marker_name == "beachclub"){
    content += '<a href="images/bluffsunset.jpg"><img src="images/bluffsunset.jpg"/></a>'+
          '<a href="images/bluffview.jpg"><img src="images/bluffview.jpg"/></a>'
  }
  
  content += ' </div>'+
    					'</div>'
	return content;
}

function getMenuBar() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/**
 * Sets all section colors to variations of a randomly generated color
 */
function setBackgroundColor(){
  const hue_number = (Math.floor(Math.random() * 35) + 1) * 10;
  const intro = document.getElementsByClassName("intro");
  const sect1 = document.getElementsByClassName("sect-1");
  const sect2 = document.getElementsByClassName("sect-2");
  const sect3 = document.getElementsByClassName("sect-3");
  const sect4 = document.getElementsByClassName("sect-4");
  const sect5 = document.getElementsByClassName("sect-5");
  const sect6 = document.getElementsByClassName("sect-6");
  const sect7 = document.getElementsByClassName("sect-7");
  const sect8 = document.getElementsByClassName("sect-8");
  const goodbye = document.getElementsByClassName("goodbye");
  const grid = document.getElementsByClassName("grid-container");
  const title = document.getElementsByClassName("title");
  const musical = document.getElementById("musical-container");
  const song = document.getElementById("song-container");
  const content = document.getElementById("content");

  content.style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  musical.style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  song.style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  intro[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  goodbye[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  grid[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  sect1[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 90%)";
  sect2[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 85%)";
  sect3[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 85%)";
  title[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  sect4[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 90%)";
  sect5[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 85%)";
  sect6[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 85%)";
  sect7[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 85%)";
  sect8[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 80%)";
}