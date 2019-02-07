'use strict';
const events = require('events');
const Prompt = require('./prompt');

class Menu extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this._menu = opts.menu || [];
    this._emitter = new events.EventEmitter();
  }

  get _cursor() {
    return {
      hide: () => {
        if (!this._output.isTTY) {
          return;
        }

        this._output.write('\u001B[?25l');
      },
      show: () => {
        if (!this._output.isTTY) {
          return;
        }

        this._output.write('\u001B[?25h');
      }
    };
  }

  _clearLines(n) {
    for (let i = 0; i < n; i++) {
      this._output.moveCursor(0, -1);
      this._output.clearLine();
      this._output.cursorTo(0);
    }
  }

  _clearMenu() {
    this._clearLines(this._menu.length);
  }
}

module.exports = Menu;
