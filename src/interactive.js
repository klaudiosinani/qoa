'use strict';
const readline = require('readline');
const Nav = require('./nav');

class Interactive extends Nav {
  constructor(opts = {}) {
    super(opts);
  }

  request() {
    const answer = {};

    const onkeypress = (_, key) => {
      const {name, ctrl} = key;

      if (key && ctrl && name === 'c') {
        this._cursor.show();
        this._input.pause();
      }

      switch (name) {
        case 'up':
        case 'k':
          this._moveUpwards();
          break;

        case 'down':
        case 'j':
          this._moveDownwards();
          break;

        case 'return':
          answer[this._handle] = this._menu[this._idx];
          this._emitter.emit('selection');
          this._displaySelection(answer[this._handle]);
          break;

        default:
          break;
      }
    };

    return new Promise(resolve => {
      this._cursor.hide();
      this._displayQuestion();

      this._input.resume();
      this._input.setRawMode(true);
      readline.emitKeypressEvents(this._input);

      this._input.on('keypress', onkeypress);

      this._emitter.on('selection', () => {
        this._cursor.show();
        this._input.pause();
        this._input.setRawMode(false);
        this._input.removeListener('keypress', onkeypress);
        resolve(answer);
      });
    });
  }
}

module.exports = Interactive;
