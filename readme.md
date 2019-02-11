<h1 align="center">
  Qoa
</h1>

<h4 align="center">
  💬 Minimal interactive command-line prompts
</h4>

<div align="center">
  <img alt="Header" src="media/header.gif" width="75%">
</div>

<p align="center">
  <a href="https://travis-ci.com/klaussinani/qoa">
    <img alt="Build Status" src="https://travis-ci.com/klaussinani/qoa.svg?branch=master">
  </a>
</p>

## Description

Lightweight and without any external dependencies qoa enables you to receive various types of user input through a set of intuitive, interactive & verbose command-line prompts. The library utilizes a simple & minimal usage syntax and contains 7 configurable console interfaces, such as plain text, confirmation & password/secret prompts as well as single keypress, quiz & multiple-choice navigable menus.

Visit the [contributing guidelines](https://github.com/klaussinani/qoa/blob/master/contributing.md#translating-documentation) to learn more on how to translate this document into more languages.

Come over to [Gitter](https://gitter.im/klaussinani/qoa) or [Twitter](https://twitter.com/klaussinani) to share your thoughts on the project.

## Highlights

- 7 out-of-the-box interactive prompts
- Zero dependencies
- Lightweight & fast [8.8kB / 71ms](https://bundlephobia.com/result?p=qoa)
- Clean & concise output
- Simple & minimal usage syntax
- Navigation, quiz & keypress menus
- Secure & hidden input interfaces
- Utilizes async/await expressions
- Configurable & customizable

## Contents

- [Description](#description)
- [Highlights](#highlights)
- [Install](#install)
- [Usage](#usage)
- [Prompts](#prompts)
- [Configuration](#configuration)
- [API](#api)
- [Development](#development)
- [Related](#related)
- [Team](#team)
- [License](#license)

## Install

```bash
npm install qoa
```

## Usage

Import qoa and start using any of the available prompts:

- `confirm`
- `hidden`
- `input`
- `interactive`
- `keypress`
- `quiz`
- `secure`

In order to sequentially create & display a series of prompts, the asynchronous unary `qoa.prompt` function can be used. The function accepts as input an array of objects, where each object contains the configuration of its corresponding prompt. The display order of the prompts is based on the order in which the configuration objects are defined inside the array. A new object containing the user's response to each prompt is finally returned by the function.

```js
const qoa = require('qoa');

const {log} = console;

const ps = [
  {
    type: 'input',
    query: 'Type your username:',
    handle: 'username'
  },
  {
    type: 'secure',
    query: 'Type your password:',
    handle: 'password'
  }
];

qoa.prompt(ps).then(log);
//=> { username: 'klaussinani', password: 'token' }
```

<div align="center">
  <img alt="Usage" src="media/usage.gif" width="75%">
</div>

Alternatively, for non sequential use-cases, each prompt can be individually initialized through its respective asynchronous unary function, where each function accepts as input an object containing the prompt's properties/configuration.

```js
const qoa = require('qoa');

const {log} = console;

const login = async () => {
  const username = await qoa.input({
    query: 'Type your username:',
    handle: 'username'
  });

  const password = await qoa.secure({
    query: 'Type your password:',
    handle: 'password'
  });

  return Object.assign({}, username, password);
}

login().then(log);
//=> { username: 'klaussinani', password: 'token' }
```

## Prompts

### Confirm Prompt

Initializes a text based input prompt with two `accept` & `deny` options. Based on the input provided by the user, the query displayed by the prompt is confirmed or rejected. In order for the query to be confirmed, thus return `true`, the user must provide exactly the indicated `accept` string (strict equality). On any other input the query is rejected & `false` is returned. The return value is a new object with the prompt result stored under the specified `handle` property.

```js
const qoa = require('qoa');

const {log} = console;

const confirm = {
  type: 'confirm',
  query: 'Update Qoa to latest version?',
  handle: 'update',
  accept: 'Y',
  deny: 'n'
};

// using the `prompt` async method
qoa.prompt([confirm]).then(log);
//=> { update: true }

// using the `confirm` async method
qoa.confirm(confirm).then(log);
//=> { update: true }
```

<div align="center">
  <img alt="Confirm Prompt" src="media/confirm.gif" width="68%">
</div>

### Hidden Prompt

Initializes a text based prompt, where each character typed by the user is automatically hidden. The return value is a new object with the prompt result stored under the specified `handle` property.

```js
const qoa = require('qoa');

const {log} = console;

const hidden = {
  type: 'hidden',
  query: '[sudo] password for admin:',
  handle: 'sudo'
};

// using the `prompt` async method
qoa.prompt([hidden]).then(log);
//=> { sudo: 'admin' }

// using the `hidden` async method
qoa.hidden(hidden).then(log);
//=> { sudo: 'admin' }
```

<div align="center">
  <img alt="Hidden Prompt" src="media/hidden.gif" width="68%">
</div>

### Input Prompt

Initializes a text based prompt, where input can be freely provided by the user. The return value is a new object with the prompt result stored under the specified `handle` property.

```js
const qoa = require('qoa');

const {log} = console;

const input = {
  type: 'input',
  query: 'Select your username:',
  handle: 'username'
};

// using the `prompt` async method
qoa.prompt([input]).then(log);
//=> { username: 'klaussinani' }
  
// using the `input` async method
qoa.input(input).then(log);
//=> { username: 'klaussinani' }
```

<div align="center">
  <img alt="Input Prompt" src="media/input.gif" width="68%">
</div>

### Interactive Prompt

Initializes an interactive navigable menu based prompt, where the user can navigate within a set of options and select only one of them. The options can be defined in the `menu` array while the navigation indicator can be customized through the `symbol` option and if omitted the default string `'>'` will be used. The return value is new object with the selected option stored under the specified `handle` property. The interactive menu can be navigated through the `up arrow`/`k` & `down arrow`/`j` keys.

```js
const qoa = require('qoa');

const {log} = console;

const interactive = {
  type: 'interactive',
  query: 'What is your favorite treat?',
  handle: 'treat',
  symbol: '>',
  menu: [
    'Chocolate',
    'Cupcakes',
    'Ice-Cream'
  ]
};

// using the `prompt` async method
qoa.prompt([interactive]).then(log);
//=> { treat: 'Cupcakes' }

// using the `interactive` async method
qoa.interactive(interactive).then(log);
//=> { treat: 'Cupcakes' }
```

<div align="center">
  <img alt="Interactive Prompt" src="media/interactive.gif" width="68%">
</div>

### Keypress Prompt

Initializes an non-navigable menu based prompt, where the user can select one of the options defined in the `menu` array, by pressing the unique key corresponding to it. The options can be up to `9`, and the keys are integers `x` where `1 <= x <= 9`. The return value is new object with the selected option stored under the specified `handle` property.

```js
const qoa = require('qoa');

const {log} = console;

const keypress = {
  type: 'keypress',
  query: 'How useful are the new features?',
  handle: 'features',
  menu: [
    'Meh',
    'Averagely',
    'Very',
    'Super'
  ]
};

// using the `prompt` async method
qoa.prompt([keypress]).then(log);
//=> { features: 'Very' }

// using the `keypress` async method
qoa.keypress(keypress).then(log);
//=> { features: 'Very' }
```

<div align="center">
  <img alt="Keypress Prompt" src="media/keypress.gif" width="68%">
</div>

### Quiz Prompt

Initializes an interactive navigable menu based prompt, where the user can navigate within a set options and select only one of them. The displayed menu is consisted of a number `amount` of options, of which the value of `answer` is by default one of them, corresponding to the correct answer to the query, and the rest `amount - 1` are randomly selected from the `choices` array. The navigation indicator can be customized through the `symbol` option and if omitted the default string `'>'` is used. The return value is new object containing the selected option, stored under the specified `handle` property, and a boolean `isCorrect` attribute, indicating whether the choice made by the user was the `answer` one. The quiz menu can be navigated through the `up arrow`/`k` & `down arrow`/`j` keys.

```js
const qoa = require('qoa');

const {log} = console;

const quiz = {
  type: 'quiz',
  query: 'How far is the moon from Earth?',
  handle: 'distance',
  answer: '333400 km',
  symbol: '>',
  amount: 4,
  choices: [
    '190000 km',
    '280500 km',
    '333400 km',
    '560000 km',
    '890500 km'
  ]
};

// using the `prompt` async method
qoa.prompt([quiz]).then(log);
//=> { distance: { answer: '333400 km', isCorrect: true } }

// using the `quiz` async method
qoa.quiz(quiz).then(log);
//=> { distance: { answer: '333400 km', isCorrect: true } }
```

<div align="center">
  <img alt="Quiz Prompt" src="media/quiz.gif" width="68%">
</div>

### Secure Prompt

Initializes a text based prompt, where each character typed by the user is automatically replaced with the `*` symbol. The return value is an object with the prompt result stored under the specified `handle` property.

```js
const qoa = require('qoa');

const {log} = console;

const secure = {
  type: 'secure',
  query: 'What\'s your password:',
  handle: 'password'
};

// using the `prompt` async method
qoa.prompt([secure]).then(log);
//=> { password: 'password' }

// using the `secure` async method
qoa.secure(secure).then(log);
//=> { password: 'password' }
```

<div align="center">
  <img alt="Secure Prompt" src="media/secure.gif" width="68%">
</div>

## Configuration

Qoa can be collectively configured through the unary `qoa.config()` function, which accepts an object containing the following two attributes: `prefix` & `underlineQuery`. The configuration is applied to all prompts belonging to the targeted qoa instance.

##### `prefix`

- Type: `String`
- Default: `''`

A string to be included as prefix to the query of each prompt.

##### `underlineQuery`

- Type: `Boolean`
- Default: `false`

Underline the query of each prompt.

```js
const qoa = require('qoa');

qoa.config({
  prefix: '>', // Use the `>` string as prefix to all queries
  underlineQuery: false // Do not underline queries
})

qoa.secure({
  type: 'secure',
  query: 'Type your password:',
  handle: 'password'
});
//=> > Type your password: ******
```

Additionally, for individual customization the unary `prefix` & `underlineQuery` functions are available.

```js
const qoa = require('qoa');

// Use the `>` string as prefix to all queries
qoa.prefix('>');

// Do not underline queries
qoa.underlineQuery(false);

qoa.secure({
  type: 'secure',
  query: 'Type your password:',
  handle: 'password'
});
//=> > Type your password: ******
```

## API

#### qoa.`prompt([, configObj])`

- Type: `Function`
- Async: `True`
- Returns: `Object`

Sequentially create & display a series of prompts.

##### `configObj`

- Type: `Object`

Object containing the configuration of a prompt. Can hold any of the documented [options](#Usage).

#### qoa.`confirm({ type, query, handle, accept, deny })`

- Type: `Function`
- Async: `True`
- Returns: `Object`

Create and display a `confirm` prompt.

##### `type`

- Type: `String`
- Default: `'confirm'`

Indicates the type of the prompt. The option is **mandatory** when it is part of the configuration object inside the array passed to `qoa.prompt()` function. Can be considered **optional** when it is part of the object passed to the `qoa.confirm()` function.

##### `query`

- Type: `String`

The query to be displayed by the prompt.

##### `handle`

- Type: `String`

The name of the attribute under which the prompt result will be saved, inside the returned object.

##### `accept`

- Type: `String`
- Default: `'Y'`

The string to be typed in order for the prompt to be confirmed.

##### `deny`

- Type: `String`
- Default: `'n'`

The string to be typed in order for the prompt to be rejected.

#### qoa.`hidden({ type, query, handle })`

- Type: `Function`
- Async: `True`
- Returns: `Object`

Create and display a `hidden` prompt.

##### `type`

- Type: `String`
- Default: `'hidden'`

Indicates the type of the prompt. The option is **mandatory** when it is part of the configuration object inside the array passed to `qoa.prompt()` function. Can be considered **optional** when it is part of the object passed to the `qoa.hidden()` function.

##### `query`

- Type: `String`

The query to be displayed by the prompt.

##### `handle`

- Type: `String`

The name of the attribute under which the prompt result will be saved, inside the returned object.

#### qoa.`input({ type, query, handle })`

- Type: `Function`
- Async: `True`
- Returns: `Object`

Create and display an `input` prompt.

##### `type`

- Type: `String`
- Default: `'input'`

Indicates the type of the prompt. The option is **mandatory** when it is part of the configuration object inside the array passed to `qoa.prompt()` function. Can be considered **optional** when it is part of the object passed to the `qoa.input()` function.

##### `query`

- Type: `String`

The query to be displayed by the prompt.

##### `handle`

- Type: `String`

The name of the attribute under which the prompt result will be saved, inside the returned object.

#### qoa.`interactive({ type, query, handle, symbol, menu })`

- Type: `Function`
- Async: `True`
- Returns: `Object`

Create and display an `interactive` prompt.

##### `type`

- Type: `String`
- Default: `'interactive'`

Indicates the type of the prompt. The option is **mandatory** when it is part of the configuration object inside the array passed to `qoa.prompt()` function. Can be considered **optional** when it is part of the object passed to the `qoa.interactive()` function.

##### `query`

- Type: `String`

The query to be displayed by the prompt.

##### `handle`

- Type: `String`

The name of the attribute under which the prompt result will be saved, inside the returned object.

##### `symbol`

- Type: `String`
- Default: `'>'`

The string to be used as the navigation indicator for the menu.
can be customized through the symbol option and if omitted the default string '>' will be used.

##### `menu`

- Type: `String[]`

The array containing the menu options.

#### qoa.`keypress({ type, query, handle, menu })`

- Type: `Function`
- Async: `True`
- Returns: `Object`

Create and display a `keypress` prompt.

##### `type`

- Type: `String`
- Default: `'keypress'`

Indicates the type of the prompt. The option is **mandatory** when it is part of the configuration object inside the array passed to `qoa.prompt()` function. Can be considered **optional** when it is part of the object passed to the `qoa.keypress()` function.

##### `query`

- Type: `String`

The query to be displayed by the prompt.

##### `handle`

- Type: `String`

The name of the attribute under which the prompt result will be saved, inside the returned object.

##### `menu`

- Type: `String[]`

The array containing the menu options.

#### qoa.`quiz({ type, query, handle, answer, symbol, amount, choices })`

- Type: `Function`
- Async: `True`
- Returns: `Object`

Create and display a `quiz` prompt.

##### `type`

- Type: `String`
- Default: `'quiz'`

Indicates the type of the prompt. The option is **mandatory** when it is part of the configuration object inside the array passed to `qoa.prompt()` function. Can be considered **optional** when it is part of the object passed to the `qoa.quiz()` function.

##### `query`

- Type: `String`

The query to be displayed by the prompt.

##### `handle`

- Type: `String`

The name of the attribute under which the prompt result will be saved, inside the returned object.

##### `answer`

- Type: `String`

The correct answer to the quiz.

##### `symbol`

- Type: `String`
- Default: `'>'`

The string to be used as the navigation indicator for the menu.

##### `amount`

- Type: `Number`
- Default: `3`

The number of options to be included to the menu.

##### `choices`

- Type: `String[]`

The array containing the candidate menu options.

#### qoa.`secure({ type, query, handle })`

- Type: `Function`
- Async: `True`
- Returns: `Object`

Create and display a `secure` prompt.

##### `type`

- Type: `String`
- Default: `'secure'`

Indicates the type of the prompt. The option is **mandatory** when it is part of the configuration object inside the array passed to `qoa.prompt()` function. Can be considered **optional** when it is part of the object passed to the `qoa.secure()` function.

##### `query`

- Type: `String`

The query to be displayed by the prompt.

##### `handle`

- Type: `String`

The name of the attribute under which the prompt result will be saved, inside the returned object.

#### qoa.`config({ prefix, underlineQuery })`

- Type: `Function`
- Async: `False`

Collectively configure a qoa instance.

##### `prefix`

- Type: `String`
- Default: `''`

A string to be included as prefix to the query of each prompt.

##### `underlineQuery`

- Type: `Boolean`
- Default: `false`

Underline the query of each prompt.

#### qoa.`prefix(str)`

- Type: `Function`
- Async: `False`

Add a string as prefix to the query of each prompt belonging to the targeted qoa instance.

##### `str`

- Type: `String`

A string to be included as prefix to the query of each prompt.

#### qoa.`underlineQuery(status)`

- Type: `Function`
- Async: `False`

Underline the query of each prompt belonging to the targeted qoa instance.

##### `status`

- Type: `Boolean`

Underline the query of each prompt.

#### qoa.`clearScreen()`

- Type: `Function`
- Async: `False`

Move the cursor to the top-right corner of the console and clear everything below it.

## Development

For more info on how to contribute to the project, please read the [contributing guidelines](https://github.com/klaussinani/qoa/blob/master/contributing.md).

- Fork the repository and clone it to your machine
- Navigate to your local fork: `cd qoa`
- Install the project dependencies: `npm install` or `yarn install`
- Lint code for errors: `npm test` or `yarn test`

## Related

- [signale](https://github.com/klaussinani/signale) - Hackable console logger
- [taskbook](https://github.com/klaussinani/taskbook) - Tasks, boards & notes for the command-line habitat

## Team

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)

## License

[MIT](https://github.com/klaussinani/qoa/blob/master/license.md)
