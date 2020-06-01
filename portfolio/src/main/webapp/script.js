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
  getGoodbyes();
  // Add it to the page.
  document.getElementById('goodbye-container').innerText = goodbye;
}

/**
 * Fetches goodbyes from the servers and adds them to the DOM.
 */
function getGoodbyes() {
  fetch('/data').then(response => response.json()).then((goodbyes) => {
  const dataListElement = document.getElementById('data-container');
  dataListElement.innerHTML = '';

  for (var i = 0; i < goodbyes.length; ++i){
    dataListElement.appendChild(createListElement(goodbyes[i]));
    }
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
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
}