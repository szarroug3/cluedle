// Letter-shift (Caesar) cipher over A–Z. Case, spaces, and punctuation are kept.

function shiftChar(ch, shift) {
  const code = ch.charCodeAt(0);
  if (code >= 65 && code <= 90) return String.fromCharCode((((code - 65 + shift) % 26) + 26) % 26 + 65);
  if (code >= 97 && code <= 122) return String.fromCharCode((((code - 97 + shift) % 26) + 26) % 26 + 97);
  return ch;
}

export function encode(text, shift) {
  return [...text].map((ch) => shiftChar(ch, shift)).join("");
}

export function decode(text, shift) {
  return encode(text, -shift);
}
