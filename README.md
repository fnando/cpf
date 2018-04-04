# CPF

[![Build Status](https://travis-ci.org/fnando/cpf.svg?branch=master)](https://travis-ci.org/fnando/cpf)
[![NPM package version](https://img.shields.io/npm/v/@fnando/cpf.svg)](https://www.npmjs.com/package/@fnando/cpf)
![License: MIT](https://img.shields.io/npm/l/@fnando/cpf.svg)
![Minified size](http://img.badgesize.io/fnando/cpf/master/dist/cpf.min.js.svg?label=cpf+min+size)
![Minified+Gzip size](http://img.badgesize.io/fnando/cpf/master/dist/cpf.min.js.svg?compression=gzip&label=cpf+min%2Bgzip+size)

This package does some [CPF](http://en.wikipedia.org/wiki/Cadastro_de_Pessoas_F%C3%ADsicas) magic. It allows you to create, validate and format CPF documents.

**HINT:** Check out the CNPJ counter part available at <https://github.com/fnando/cnpj>.

## Installation

This lib is available as a NPM package. To install it, use the following command:

```
npm install @fnando/cpf --save
```

If you're using Yarn (and you should):

```
yarn add @fnando/cpf
```

## Usage

```js
// Node.js-specific
const cpf = require("@fnando/cpf/dist/node");

// @import
import * as cpf from "@fnando/cpf"; // import the whole library
import {isValid as isValidCpf} from "@fnando/cpf"; // import just one function

// import via <script>; the lib will available as window.cpf
// <script src="cpf.js"></script>

cpf.isValid("532.820.857-96");
//=> true

cpf.isValid("53282085796");
//=> true

cpf.strip("532.820.857-96");
//=> 53282085796

cpf.format("53282085796");
//=> 532.820.857-96

cpf.generate(true); // generate formatted number
//=> 838.684.734-40

cpf.generate(); // generate unformatted number
//=> 72777632898
```

### Strict Validation

By default, validations will strip any characters you provide. This means that the following is valid, because only numbers will be considered:

```js
cpf.isValid("101#688!!!!!!542......36");
//=> true

cpf.strip("101#688!!!!!!542......36");
//=> 10168854236
```

If you want to strict validate strings, use the following signature:

```js
cpf.isValid(number, strict);
```

The same example would now return `false`:

```js
cpf.isValid("101#688!!!!!!542......36", true);
//=> false
```
