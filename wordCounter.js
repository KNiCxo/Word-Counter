const textArea = document.querySelector('#input-field');
const wordCount = document.querySelector('#word-count');

textArea.addEventListener('input', countWords);

function countWords() {
  const text = textArea.value.toUpperCase();
  let result = {};
  let total = 0;
  let currentWord = '';

  for (let i = 0; i < text.length; i++) {
    if (!(/[a-zA-Z0-9'-]/).test(text.charAt(i))) {
      if (currentWord !== '') {
        if (!result[currentWord]) {
          result[currentWord] = 1;
        } else {
          result[currentWord]++;
        }
        total++;
      }
        currentWord = '';
    } else {
      currentWord += text.charAt(i);
      console.log(currentWord);
    }
  }

  if (currentWord !== '') {
    if (!result[currentWord]) {
      result[currentWord] = 1;
    } else {
      result[currentWord]++;
    }
    total++;
  }
  console.log(`Total: ${total}`);
  console.log(result);
  return result;
}