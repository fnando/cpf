var cpf =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/cpf.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cpf.js":
/*!********************!*\
  !*** ./src/cpf.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifierDigit = verifierDigit;
exports.format = format;
exports.strip = strip;
exports.isValid = isValid;
exports.generate = generate;
// Blacklist common values.
var BLACKLIST = ["00000000000", "11111111111", "22222222222", "33333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999", "12345678909"];

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
  numbers = numbers.split("").map(function (number) {
    return parseInt(number, 10);
  });

  var modulus = numbers.length + 1;

  var multiplied = numbers.map(function (number, index) {
    return number * (modulus - index);
  });

  var mod = multiplied.reduce(function (buffer, number) {
    return buffer + number;
  }) % 11;

  return mod < 2 ? 0 : 11 - mod;
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
function format(cpf) {
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
function strip(cpf, isStrict) {
  var regex = isStrict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
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
function isValid(cpf, isStrict) {
  var stripped = strip(cpf, isStrict);

  // CPF must be defined
  if (!stripped) {
    return false;
  }

  // CPF must have 11 chars
  if (stripped.length !== 11) {
    return false;
  }

  // CPF can't be blacklisted
  if (BLACKLIST.includes(stripped)) {
    return false;
  }

  var numbers = stripped.substr(0, 9);
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
function generate(useFormat) {
  var numbers = "";

  for (var i = 0; i < 9; i += 1) {
    numbers += Math.floor(Math.random() * 9);
  }

  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return useFormat ? format(numbers) : numbers;
}

/***/ })

/******/ });
//# sourceMappingURL=cpf.js.map