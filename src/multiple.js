'use strict';
const readline = require('readline');
const Nav = require('./nav');

class Multiple extends Nav {
  constructor(opts = {}) {
    super(opts);
    this._selectedIdx = [];
  }

  get _formatItem() {
    return {
      selected: x => `(●) ${x}`,
      menu: x => `( ) ${x}`
    };
  }

  get _menuItems() {
    return this._menu.map((x, i) => {
      if (this._selectedIdx.includes(i) > -1) {
        return `  ${this._idx === i ? `${this._symbol}` : `${this._whitespace(this._symbol.length)}`} ${this._formatItem.selected(x)}`;
      }

      return `  ${this._idx === i ? `${this._symbol}` : `${this._whitespace(this._symbol.length)}`} ${this._formatItem.menu(x)}`;
    });
  }

  _selectItem() {
    const idx = this._selectedIdx.includes(this._idx);
    if (idx > -1) {
      this._selectedIdx.splice(idx, 1);
    } else {
      this._selectedIdx.push(this._idx);
    }

    this._refreshMenu();
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

        case 'space':
          this._selectItem();
          break;

        case 'return':
          answer[this._handle] = this._selectedIdx.map(item => this._menu[item]);
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

module.exports = Multiple;
