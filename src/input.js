'use strict';
const Text = require('./text');

class Input extends Text {
  constructor(opts = {}) {
    super(opts);
  }

  request() {
    return new Promise(resolve => {
      const result = {};

      const prompt = this._createPrompt();

      prompt.question(this._formatQuery(), answer => {
        result[this._handle] = answer;
        prompt.close();
        resolve(result);
      });
    });
  }
}

module.exports = Input;
