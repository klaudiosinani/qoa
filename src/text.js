'use strict';
const {createInterface} = require('readline');
const Prompt = require('./prompt');

class Text extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this._historySize = 0;
    this._promptSymbol = '';
    this._validators = opts.validate || [];
  }

  get _promptOpts() {
    return {
      input: this._input,
      output: this._output,
      prompt: this._promptSymbol,
      historySize: this._historySize
    };
  }

  _createPrompt() {
    return createInterface(this._promptOpts);
  }

  _clearChars(n) {
    this._output.moveCursor(-n, 0);
    this._output.clearLine(1);
  }

  _removeLastChar(x) {
    return x.slice(0, x.length - 1);
  }

  _validateInput(answer) {
    const result = {};
    this._validators.forEach(validator => {
      const validationResult = validator.validate(answer);
      if (!validationResult && validator.warning) {
        console.log(validator.warning);
      }

      result[validator.name] = validationResult;
    });

    return result;
  }
}

module.exports = Text;
