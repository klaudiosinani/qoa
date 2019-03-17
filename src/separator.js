'use strict';

class Seperator {
  constructor(opts = {}) {
    this._seperator = opts.seperator || '***';
  }
}

module.exports = Seperator;
