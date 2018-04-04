// Blacklist common values.
const BLACKLIST = [
  "00000000000",
  "11111111111",
  "22222222222",
  "33333333333",
  "44444444444",
  "55555555555",
  "66666666666",
  "77777777777",
  "88888888888",
  "99999999999",
  "12345678909"
];

const STRICT_STRIP_REGEX = /[.-]/g;
const LOOSE_STRIP_REGEX = /[^\d]/g;

export function verifierDigit(numbers) {
  numbers = numbers
    .split("")
    .map(function(number){ return parseInt(number, 10); })
  ;

  const modulus = numbers.length + 1;

  const multiplied = numbers.map(function(number, index) {
    return number * (modulus - index);
  });

  const mod = multiplied.reduce(function(buffer, number){
    return buffer + number;
  }) % 11;

  return (mod < 2 ? 0 : 11 - mod);
}

export function format(number) {
  return strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

export function strip(number, strict) {
  const regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
  return (number || "").toString().replace(regex, "");
}

export function isValid(number, strict) {
  const stripped = strip(number, strict);

  // CPF must be defined
  if (!stripped) { return false; }

  // CPF must have 11 chars
  if (stripped.length !== 11) { return false; }

  // CPF can't be blacklisted
  if (BLACKLIST.includes(stripped)) { return false; }

  let numbers = stripped.substr(0, 9);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.substr(-2) === stripped.substr(-2);
}

export function generate(formatted) {
  let numbers = "";

  for (let i = 0; i < 9; i += 1) {
    numbers += Math.floor(Math.random() * 9);
  }

  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return (formatted ? format(numbers) : numbers);
}
