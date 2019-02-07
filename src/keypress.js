'use strict';
const readline = require('readline');
const Menu = require('./menu');

const {log} = console;

class Keypress extends Menu {
  constructor(opts = {}) {
    super(opts);
  }

  get _formatItem() {
    return {
      menu: (x, i) => `  (${i + 1}) ${x}`,
      selected: (x, i) => `  (${i}) ${x}`
    };
  }

  get _menuItems() {
    return this._menu.slice(0, 9).map(this._formatItem.menu);
  }

  _displayMenu() {
    log(this._menuItems.join('\n'));
  }

  _displaySelection(x, n) {
    this._clearMenu();
    log(this._formatItem.selected(x, n));
  }

  _displayQuestion() {
    log(this._formatQuery());
    this._displayMenu();
  }

  request() {
    const answer = {};

    const onkeypress = (_, key) => {
      const {ctrl, name} = key;

      if (key && ctrl && name === 'c') {
        this._cursor.show();
        return this._input.pause();
      }

      const n = Number(name);

      if (n >= 1 && n <= this._menu.length) {
        const selection = this._menu[n - 1];
        answer[this._handle] = selection;
        this._emitter.emit('selection');
        this._displaySelection(selection, n);
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

module.exports = Keypress;
