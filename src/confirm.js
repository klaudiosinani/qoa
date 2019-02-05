'use strict';
const Text = require('./text');

class Confirm extends Text {
  constructor(opts = {}) {
    super(opts);
    this._deny = opts.deny || 'n';
    this._accept = opts.accept || 'Y';
  }

  _responses() {
    return `[${this._accept}/${this._deny}] `;
  }

  get _question() {
    return this._formatQuery() + this._responses();
  }

  request() {
    return new Promise(resolve => {
      const result = {};

      const prompt = this._createPrompt();

      prompt.question(this._question, answer => {
        result[this._handle] = answer === this._accept;
        prompt.close();
        resolve(result);
      });
    });
  }
}

module.exports = Confirm;
