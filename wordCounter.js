// Elements for textarea, word count, sort menu, and word table
const textArea = document.querySelector('#input-field');
const wordCount = document.querySelector('#word-count');
const sortMenu = document.querySelector('#sort-select');
const wordTable = document.querySelector('#word-table');

// Stores list of words from textarea to be displayed (as either most frequent or least frequent)
let wordArray = [];

// Clear textarea on page open
textArea.value = '';

// When user inputs into textarea, count total words
textArea.addEventListener('input', countWords);

sortMenu.addEventListener('click', countWords);

// Counts total words in a string
function countWords() {
  // Gets text from textarea and capitalizes
  const text = textArea.value.toUpperCase();

  // Stores all unique words and their frequency as an object
  let result = {};

  // Total number of words in string
  let total = 0;

  // Current word being looked at in the function
  let currentWord = '';

  // Iterates through entire text string one character at a time
  for (let i = 0; i < text.length; i++) {
    // If character being looked at is not "a-z, A-Z, 0-9, ', or -", function is at the end of a word
    // Else, add character to current word string and continue
    if (!(/[a-zA-Z0-9'-]/).test(text.charAt(i))) {
      // If current word string is not blank, check if current word exists in object
      if (currentWord !== '') {
        // If current word does not exist in object, add to object and set its value to 1
        // Else, increment the word's value in the object
        if (!result[currentWord]) {
          result[currentWord] = 1;
        } else {
          result[currentWord]++;
        }
        // Increment total word count
        total++;
      }
        // Clears variable to be used in the next iteration
        currentWord = '';
    } else {
      currentWord += text.charAt(i);
    }
  }

  // After loop, check if current word contains a word
  // If it does contain a word, then either add to object or increment its value
  if (currentWord !== '') {
    if (!result[currentWord]) {
      result[currentWord] = 1;
    } else {
      result[currentWord]++;
    }
    total++;
  }

  // Update word count HTML and tally words
  wordCount.innerHTML = total;
  tallyWords(result);
}

// Creates a tally of all the words stored in the object
function tallyWords(result) {
  // Clears the table during every call
  wordTable.innerHTML = `
  <tr>
    <th>Word</th>
    <th>Total</th>
  </tr>`;

  // Creates an array of the sorted words in the object as most frequent or least frequent
  let sortedWords;
  if (sortMenu.value == 'most-frequent') {
    sortedWords = Object.entries(result).sort((a, b) => b[1] - a[1]);
  } else {
    sortedWords = Object.entries(result).sort((a, b) => a[1] - b[1]);
  }

  // If sorted array is less than 10, use length of array. Else, set to 10
  const stoppingCondition = sortedWords.length < 10 ? sortedWords.length : 10

  //Creates 10 entries of the word and its frequency count and appends them to the table
  for (let i = 0; i < stoppingCondition; i++) {
      const tableEntry = document.createElement('tr');

      tableEntry.innerHTML = `
      <td>${sortedWords[i][0]}</td>
      <td>${sortedWords[i][1]}</td>`;

      // Append entry to table, hide buttons, and create event listeners
      wordTable.append(tableEntry);
  }
}