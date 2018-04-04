(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
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
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
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

function format(number) {
  return strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

function strip(number, strict) {
  var regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
  return (number || "").toString().replace(regex, "");
}

function isValid(number, strict) {
  var stripped = strip(number, strict);

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

function generate(formatted) {
  var numbers = "";

  for (var i = 0; i < 9; i += 1) {
    numbers += Math.floor(Math.random() * 9);
  }

  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return formatted ? format(numbers) : numbers;
}

/***/ })

/******/ })));
//# sourceMappingURL=node.js.map