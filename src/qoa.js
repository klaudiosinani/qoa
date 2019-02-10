'use strict';
const Confirm = require('./confirm');
const Hidden = require('./hidden');
const Input = require('./input');
const Interactive = require('./interactive');
const Keypress = require('./keypress');
const Quiz = require('./quiz');
const Secure = require('./secure');

class Qoa {
  constructor(opts = {}) {
    this._prefix = opts.prefix;
    this._underlineQuery = opts.underline;
  }

  _buildConfig(x) {
    return Object.assign(x, {
      prefix: this._prefix,
      underlineQuery: this._underlineQuery
    });
  }

  config(x) {
    const {prefix, underlineQuery} = x;
    this._prefix = prefix;
    this._underlineQuery = underlineQuery;
  }

  prefix(str) {
    this._prefix = str;
  }

  underlineQuery(status) {
    this._underline = status;
  }

  confirm(x) {
    return new Confirm(this._buildConfig(x)).request();
  }

  hidden(x) {
    return new Hidden(this._buildConfig(x)).request();
  }

  interactive(x) {
    return new Interactive(this._buildConfig(x)).request();
  }

  input(x) {
    return new Input(this._buildConfig(x)).request();
  }

  keypress(x) {
    return new Keypress(this._buildConfig(x)).request();
  }

  quiz(x) {
    return new Quiz(this._buildConfig(x)).request();
  }

  secure(x) {
    return new Secure(this._buildConfig(x)).request();
  }

  clearScreen() {
    process.stdout.cursorTo(0, 0);
    process.stdout.clearScreenDown();
  }

  async prompt(questions) {
    const answers = {};

    for (const x of questions) {
      switch (x.type) {
        case 'confirm':
          Object.assign(answers, await this.confirm(x));
          break;

        case 'hidden':
          Object.assign(answers, await this.hidden(x));
          break;

        case 'input':
          Object.assign(answers, await this.input(x));
          break;

        case 'interactive':
          Object.assign(answers, await this.interactive(x));
          break;

        case 'keypress':
          Object.assign(answers, await this.keypress(x));
          break;

        case 'quiz':
          Object.assign(answers, await this.quiz(x));
          break;

        case 'secure':
          Object.assign(answers, await this.secure(x));
          break;

        default:
          break;
      }
    }

    return answers;
  }
}

module.exports = Qoa;
