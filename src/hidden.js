'use strict';
const readline = require('readline');
const Text = require('./text');

class Hidden extends Text {
  constructor(opts = {}) {
    super(opts);
  }

  _clearLastChar() {
    this._clearChars(1);
  }

  request() {
    let secret = '';
    const prompt = this._createPrompt();

    const onkeypress = (char, key) => {
      const {ctrl, name} = key;

      if (key && ctrl && name === 'c') {
        this._input.pause();
      }

      switch (name) {
        case 'return':
          this._input.pause();
          break;

        case 'backspace':
          secret = this._removeLastChar(secret);
          break;

        default:
          if (!char || char.length > 2) {
            return;
          }

          secret += prompt.line;
          prompt.line = '';
          this._clearLastChar();
          break;
      }
    };

    return new Promise(resolve => {
      const result = {};

      readline.emitKeypressEvents(this._input);
      this._input.on('keypress', onkeypress);

      prompt.question(this._formatQuery(), () => {
        result[this._handle] = secret;
        this._input.removeListener('keypress', onkeypress);
        prompt.close();
        resolve(result);
      });
    });
  }
}

module.exports = Hidden;
