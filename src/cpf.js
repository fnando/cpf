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

/**
 * Compute the Verifier Digit (or "Dígito Verificador (DV)" in PT-BR).
 *
 * You can learn more about the algorithm on [wikipedia (pt-br)](https://pt.wikipedia.org/wiki/D%C3%ADgito_verificador)
 *
 * @export
 * @param {string} numbers a string with only numbers.
 * @returns {number} the verifier digit.
 */
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

/**
 * Transform the input into a pretty CPF format.
 *
 * Example:
 * ```
 * format('12345678901');
 * // Result: '123.456.789-01'
 * ```
 *
 * @export
 * @param {string} cpf the CPF.
 * @returns {string} the formatted CPF.
 */
export function format(cpf) {
  return strip(cpf).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

/**
 * Remove some characters from the `number` input.
 *
 * Example:
 * ```
 * strip('29537995593'); // Result: '29537995593'
 * strip('295.379.955-93'); // Result: '29537995593'
 * strip('295a379b9c5d59e3'); // Result: '29537995593'
 * strip('295a379b9c5d59e3', true); // Result: '295a379b9c5d59e3' - Atention!
 * ```
 *
 * @export
 * @param {string} cpf the CPF text.
 * @param {boolean} [isStrict] if `true`, it will remove only `.` and `-` characters.
 *                             Otherwise, it will remove all non-digit (`[^\d]`) characters. Optional.
 * @returns {string} the stripped CPF.
 */
export function strip(cpf, isStrict) {
  const regex = isStrict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
  return (cpf || "").toString().replace(regex, "");
}

/**
 * Validate the CPF.
 *
 * @export
 * @param {string} cpf the CPF number.
 * @param {boolean} [isStrict] if `true`, it will accept only `digits`, `.` and `-` characters. Optional.
 * @returns {boolean} `true` if CPF is valid. Otherwise, `false`.
 */
export function isValid(cpf, isStrict) {
  const stripped = strip(cpf, isStrict);

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

/**
 * Generate a random CPF.
 *
 * @export
 * @param {boolean} [useFormat] if `true`, it will format using `.` and `-`. Optional.
 * @returns {string} the CPF.
 */
export function generate(useFormat) {
  let numbers = "";

  for (let i = 0; i < 9; i += 1) {
    numbers += Math.floor(Math.random() * 9);
  }

  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return (useFormat ? format(numbers) : numbers);
}
