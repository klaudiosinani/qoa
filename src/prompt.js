'use strict';

class Prompt {
  constructor(opts = {}) {
    this._type = opts.type;
    this._query = opts.query;
    this._handle = opts.handle;
    this._prefix = opts.prefix || '';
    this._underline = opts.underline || false;
    this._input = opts.input || process.stdin;
    this._output = opts.output || process.stdout;
  }

  _underlineText(x) {
    return `\u001B[4m${x}\u001B[24m`;
  }

  _formatQuery() {
    const query = [];

    if (this._prefix) {
      query.push(this._prefix);
    }

    query.push(this._underline ? this._underlineText(this._query) : this._query);

    return query.join(' ') + ' ';
  }
}

module.exports = Prompt;
