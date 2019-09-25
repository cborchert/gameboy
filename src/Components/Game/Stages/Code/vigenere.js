// You can customize the alphabet
// Make sure both alphabets are the same
const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!?,:;'/- ";

export function encrypt(word, keyword) {
  var encryptWord = "";
  for (var i = 0; i < word.length; i++) {
    encryptWord += alphabet.charAt(
      (alphabet.indexOf(word.charAt(i)) +
        alphabet.indexOf(keyword.charAt(i % keyword.length))) %
        alphabet.length
    );
  }
  return encryptWord;
}

export function decrypt(word, keyword) {
  var decryptWord = "";
  for (var i = 0; i < word.length; i++) {
    decryptWord += alphabet.charAt(
      (alphabet.indexOf(word.charAt(i)) +
        alphabet.length -
        alphabet.indexOf(keyword.charAt(i % keyword.length))) %
        alphabet.length
    );
  }
  return decryptWord;
}
