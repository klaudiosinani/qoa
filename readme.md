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
  <a href="https://travis-ci.org/klaussinani/qoa">
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
- Lightweight & fast
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

## Prompts

### Confirm Prompt

```js
const qoa = require('qoa');

qoa.request([
  {
    type: 'confirm',
    query: 'Update Qoa to latest version?',
    handle: 'update',
    accept: 'Y',
    deny: 'n'
  }
]);

//=> { update: true }
```

### Hidden Prompt

```js
const qoa = require('qoa');

qoa.request([
  {
    type: 'hidden',
    query: '[sudo] password for admin:',
    handle: 'sudo'
  }
]);

//=> { sudo: 'admin' }
```

### Input Prompt

```js
const qoa = require('qoa');

qoa.request([
  {
    type: 'input',
    query: 'Select your username:',
    handle: 'username'
  }
]);

//=> { username: 'klaussinani' }
```

### Interactive Prompt

```js
const qoa = require('qoa');

qoa.request([
  {
    type: 'interactive',
    query: 'What is your favorite treat?',
    handle: 'treat',
    menu: [
      'Chocolate',
      'Cupcakes',
      'Ice-Cream'
    ]
  }
]);

//=> { treat: 'Cupcakes' }
```

### Keypress Prompt

```js
const qoa = require('qoa');

qoa.request([
  {
    type: 'keypress',
    query: 'How useful are the new features?',
    handle: 'features',
    menu: [
      'Meh',
      'Averagely',
      'Very',
      'Super'
    ]
  }
]);

//=> { features: 'Very' }
```

### Quiz Prompt

```js
const qoa = require('qoa');

qoa.request([
    {
    type: 'quiz',
    query: 'How far is the moon from Earth?',
    handle: 'distance',
    answer: '333400 km',
    amount: 4,
    choices: [
      '190000 km',
      '280500 km',
      '333400 km',
      '560000 km',
      '890500 km'
    ]
  }
]);

//=> { distance: { answer: '333400 km', isCorrect: true } }
```

### Secure Prompt

```js
const qoa = require('qoa');

qoa.request([
  {
    type: 'secure',
    query: 'Confirm your password:',
    handle: 'password'
  }
]);

//=> { password: 'password' }
```

## Configuration

## API

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
