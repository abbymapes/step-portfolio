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
  const songContainer = document.getElementById('song-container');
  songContainer.innerText = song;
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
  const musicalContainer = document.getElementById('musical-container');
  musicalContainer.innerText = musical;
}

/**
 * Adds a random goodbye to the page.
 */
function addRandomGoodbye() {
  const goodbyes =
      ['Goodbye!', '¡Adiós!', '再见！', 'Au revoir!', '¡Ciao!', 'Arrivederci',
      'Sayonara', 'Aloha', 'Bon Voyage'];

  // Pick a random goodbye.
  const goodbye = goodbyes[Math.floor(Math.random() * goodbyes.length)];

  // Add it to the page.
  const goodbyeContainer = document.getElementById('goodbye-container');
  goodbyeContainer.innerText = goodbye;
}

/**
 * Sets all section colors to variations of a randomly generated color
 */
function setBackgroundColor(){
  const hue_number = (Math.floor(Math.random() * 35) + 1) * 10;

  const content = document.getElementById("content");
  const songcont = document.getElementById("song-container");
  const musicalcont = document.getElementById("musical-container");
  const sect1 = document.getElementById("sect-1");
  const sect2 = document.getElementById("sect-2");
  const sect3 = document.getElementById("sect-3");
  const sect4 = document.getElementById("sect-4");
  const sect5 = document.getElementById("sect-5");
  const heading = document.getElementById("heading");
  const secttitle = document.getElementById("section-title");
  const goodbyecont = document.getElementById("goodbye-container");

  content.style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  songcont.style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  musicalcont.style.backgroundColor = "hsl("+ hue_number + ", 100%, 95%)";
  sect1.style.backgroundColor = "hsl("+ hue_number + ", 100%, 90%)";
  sect2.style.backgroundColor = "hsl("+ hue_number + ", 100%, 85%)";
  sect3.style.backgroundColor = "hsl("+ hue_number + ", 100%, 80%)";
  sect4.style.backgroundColor = "hsl("+ hue_number + ", 100%, 75%)";
  sect5.style.backgroundColor = "hsl("+ hue_number + ", 100%, 70%)";
  heading.style.backgroundColor = "hsl("+ hue_number + ", 100%, 65%)";
  secttitle.style.backgroundColor = "hsl("+ hue_number + ", 100%, 65%)";
  goodbyecont.style.backgroundColor = "hsl("+ hue_number + ", 100%, 65%)";
}