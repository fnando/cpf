"use strict";
exports.__esModule = true;
exports.generate = exports.isValid = exports.strip = exports.format = exports.verifierDigit = void 0;
// Reject common values.
var REJECT_LIST = [
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
];
var STRICT_STRIP_REGEX = /[.-]/g;
var LOOSE_STRIP_REGEX = /[^\d]/g;
/**
 * Compute the Verifier Digit (or "Dígito Verificador (DV)" in PT-BR).
 *
 * You can learn more about the algorithm on [wikipedia (pt-br)](https://pt.wikipedia.org/wiki/D%C3%ADgito_verificador)
 *
 * @export
 * @param {string} numbers a string with only numbers.
 * @returns {number} the verifier digit.
 */
function verifierDigit(numbers) {
    var numberList = numbers.split("").map(function (number) { return parseInt(number, 10); });
    var modulus = numberList.length + 1;
    var multiplied = numberList.map(function (number, index) { return number * (modulus - index); });
    var mod = multiplied.reduce(function (buffer, number) { return buffer + number; }) % 11;
    return mod < 2 ? 0 : 11 - mod;
}
exports.verifierDigit = verifierDigit;
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
function format(cpf) {
    return strip(cpf).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
exports.format = format;
/**
 * Remove some characters from the `number` input.
 *
 * Example:
 * ```
 * strip('29537995593'); // Result: '29537995593'
 * strip('295.379.955-93'); // Result: '29537995593'
 * strip('295a379b9c5d59e3'); // Result: '29537995593'
 * strip('295a379b9c5d59e3', true); // Result: '295a379b9c5d59e3' - Attention!
 * ```
 *
 * @export
 * @param {string} cpf the CPF text.
 * @param {boolean} [isStrict] if `true`, it will remove only `.` and `-` characters.
 *                             Otherwise, it will remove all non-digit (`[^\d]`) characters. Optional.
 * @returns {string} the stripped CPF.
 */
function strip(cpf, isStrict) {
    if (isStrict === void 0) { isStrict = false; }
    var regex = isStrict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (cpf || "").toString().replace(regex, "");
}
exports.strip = strip;
/**
 * Validate the CPF.
 *
 * @export
 * @param {string} cpf the CPF number.
 * @param {boolean} [isStrict] if `true`, it will accept only `digits`, `.` and `-` characters. Optional.
 * @returns {boolean} `true` if CPF is valid. Otherwise, `false`.
 */
function isValid(cpf, isStrict) {
    if (isStrict === void 0) { isStrict = false; }
    var stripped = strip(cpf, isStrict);
    // CPF must be defined
    if (!stripped) {
        return false;
    }
    // CPF must have 11 chars
    if (stripped.length !== 11) {
        return false;
    }
    if (REJECT_LIST.includes(stripped)) {
        return false;
    }
    var numbers = stripped.substr(0, 9);
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);
    return numbers.substr(-2) === stripped.substr(-2);
}
exports.isValid = isValid;
/**
 * Generate a random CPF.
 *
 * @export
 * @param {boolean} [useFormat] if `true`, it will format using `.` and `-`. Optional.
 * @returns {string} the CPF.
 */
function generate(useFormat) {
    if (useFormat === void 0) { useFormat = false; }
    var numbers = "";
    for (var i = 0; i < 9; i += 1) {
        numbers += Math.floor(Math.random() * 9);
    }
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);
    return useFormat ? format(numbers) : numbers;
}
exports.generate = generate;
