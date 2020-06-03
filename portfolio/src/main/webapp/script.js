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
 * Adds a random greeting to the page.
 */

function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!', '¡Ciao!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

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
 * Adds a random goodbye to the page.
 */
function addRandomGoodbye() {
  const goodbyes =
      ['Goodbye!', 
      'Au revoir!', 
      'Ciao', 'Sayonara', 'Aloha',
      'Arrivederci', 'Bon Voyage'];

  // Pick a random goodbye.
  const goodbye = goodbyes[Math.floor(Math.random() * goodbyes.length)];
  // Add it to the page.
  document.getElementById('goodbye-container').innerText = goodbye;
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
  
  thElement.innerText = commentObj.name;
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
              stylers: [{color: '#ccd0fc'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#ccd0fc'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca4ff'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#e5ccff'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#e5ccff'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#cc9cff'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#f7d1ff'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#eb8aff'}]
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
          ]
        });

    var places = [
  	{
			position: {lat: 21.011843, lng: -156.638599},
			title: 'Honolua Bay',
			label: 'Honolua Bay'
    }, {
      position: {lat: 36.0014, lng: -78.9382},
      title: 'Duke University',
      label: 'Duke University'
    }, {
      position: {lat: 33.606222, lng: -117.893036},
      title: 'Balboa Island',
     	label: 'Balboa Island'
    }];
  
    var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'white',
        fillOpacity: 0.8,
        scale: 0.1,
        strokeColor: 'black',
        strokeWeight: 2
    };
    
    // Create markers.
	for (var i = 0; i < places.length; i++) {
  	var marker = new google.maps.Marker({
    	position: places[i].position,
      title: places[i].title,
      label: places[i].label,
      map: map,
      icon: goldStar
    });
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
  const goodbye = document.getElementsByClassName("goodbye");
  const grid = document.getElementsByClassName("grid-container");
  const content = document.getElementById("content");
  const comments = document.getElementsByClassName("comments");

  content.style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  intro[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  goodbye[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  grid[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  sect1[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 90%)";
  sect2[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 85%)";
  sect3[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 85%)";
  sect4[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 75%)";
  sect5[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 70%)";
  sect6[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 70%)";
  sect7[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 65%)";
  comments[0].style.backgroundColor = "hsl("+ hue_number + ", 100%, 97%)";
}