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

  // Pick a random fact.
  const song = songs[Math.floor(Math.random() * songs.length)];

  // Add it to the page.
  const songContainer = document.getElementById('song-container');
  songContainer.innerText = song;
}

/**
 * Adds a random song to the page.
 */
function addRandomMusical() {
  const musicals =
      ['Hamilton', 
      'Les Misérables', 
      'Wicked', 'Grease', 'Phantom of the Opera',
      'Jersey Boys'];

  // Pick a random fact.
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
      ['Goodbye!', '¡Adiós!', '再见！', 'Au revoir!', '¡Ciao!'];

  // Pick a random goodbye.
  const goodbye = goodbyes[Math.floor(Math.random() * goodbyes.length)];

  // Add it to the page.
  const goodbyeContainer = document.getElementById('goodbye-container');
  goodbyeContainer.innerText = goodbye;
}
