// WW Coding Challenge -- findWords

function isInInputString(
  characters: Map<string, number>,
  word: string
): boolean {
  // Check if the specified word can be made using the characters in the Map.
  // We iterate through each character in the word and see if it's included
  // in the Map.
  for (let i: number = 0; i < word.length; i++) {
    let c: number | undefined = characters.get(word[i]);
    // If it's not included, then we are "missing" characters; thus it's not
    // possible to make this word with these characters.
    if (c === undefined) return false;
    // If it's down to one occurrence for this character, simply delete the entry.
    if (c === 1) characters.delete(word[i]);
    // Otherwise, decrement counter by 1.
    characters.set(word[i], c - 1);
  }
  // If the whole word has been inspected and the characters Map was not
  // exhausted, then the word CAN be made using the characters map.
  return true;
}

function findWords(inputString: string, dictionary: string[]): string[] {
  // Create a HashMap that contains characters as keys, and their number of
  // occurrences as the value.
  let characters = new Map<string, number>();
  for (let i: number = 0; i < inputString.length; i++) {
    // Get c, which represents the number of occurences of the character
    // in inputString[i].
    let c: number | undefined = characters.get(inputString[i]);
    // Set value to 1 if c is not found, otherwise add 1.
    characters.set(inputString[i], c === undefined ? 1 : c + 1);
  }

  // Array where we'll store the final result (aka the words that can be
  // created with the inputString).
  let result: string[] = [];

  // Now that we have the map of characters and occurrences, use that data
  // structure to see if each word in the dictionary is included in the
  // inputString.
  dictionary.forEach((word: string) => {
    // We make a shallow copy of the original map, so we can reuse it
    // multiple times.
    if (isInInputString(new Map<string, number>(characters), word)) {
      result.push(word);
    }
  });

  // Return the list of words.
  return result;
}
