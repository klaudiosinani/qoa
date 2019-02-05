'use strict';
const readline = require('readline');
const Text = require('./text');

class Secure extends Text {
  constructor(opts = {}) {
    super(opts);
    this._symbol = opts.symbol || '*';
  }

  _secureStr(n) {
    return new Array(n + 1).join(this._symbol);
  }

  _displaySecureStr(n) {
    const str = this._secureStr(n);
    this._output.write(str);
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
          this._clearChars(secret.length);
          secret = this._removeLastChar(secret);
          this._displaySecureStr(secret.length);
          break;

        default:
          if (!char || char.length > 2) {
            return;
          }

          secret += prompt.line;
          prompt.line = '';
          this._clearChars(secret.length);
          this._displaySecureStr(secret.length);
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

module.exports = Secure;
