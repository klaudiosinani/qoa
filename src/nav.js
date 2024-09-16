'use strict';
const Menu = require('./menu');
const Separator = require('./separator');

const {log} = console;

class Nav extends Menu {
  constructor(opts = {}) {
    super(opts);
    this._idx = 0;
    this._symbol = opts.symbol || '>';
  }

  get _formatItem() {
    return {
      selected: x => `  ${this._symbol} ${x}`,
      menu: x => `  ${this._whitespace(this._symbol.length)} ${x}`
    };
  }

  get _menuItems() {
    return this._menu.map((x, i) => {
      const _x = x instanceof Separator ? x._seperator : x;
      if ((i === this._idx) && !(x instanceof Separator)) {
        return this._formatItem.selected(_x);
      }

      return this._formatItem.menu(_x);
    });
  }

  _whitespace(n) {
    return new Array(n + 1).join(' ');
  }

  _decrementIdx() {
    this._idx = (this._idx === 0 ? this._menu.length : this._idx) - 1;
  }

  _incrementIdx() {
    this._idx = this._idx === this._menu.length - 1 ? 0 : this._idx + 1;
  }

  _displayMenu() {
    log(this._menuItems.join('\n'));
  }

  _refreshMenu() {
    this._clearMenu();
    this._displayMenu();
  }

  _displayQuestion() {
    log(this._formatQuery());
    this._displayMenu();
  }

  _displaySelection(x) {
    this._clearMenu();
    log(this._formatItem.selected(x));
  }

  _moveUpwards() {
    this._decrementIdx();
    this._refreshMenu();
  }

  _moveDownwards() {
    this._incrementIdx();
    this._refreshMenu();
  }
}

module.exports = Nav;
