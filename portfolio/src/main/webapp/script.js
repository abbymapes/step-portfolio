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
 * Adds a random greeting to the page.
 */
function addRandomFact() {
  const facts =
      ['I have one brother', 
      'I hate the taste of mint leaves, but mint ice cream', 
      'I love Greys Anatomy', 'I love country music'];

  // Pick a random fact.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
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
