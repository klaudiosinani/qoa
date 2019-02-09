'use strict';
const readline = require('readline');
const Nav = require('./nav');

class Quiz extends Nav {
  constructor(opts = {}) {
    super(opts);
    this._answer = opts.answer;
    this._choices = opts.choices;
    this._amount = opts.amount || 3;

    this._generateMenuItems();
  }

  _randomIdx(bound) {
    return Math.floor(Math.random() * bound);
  }

  _generateMenuItems() {
    while (this._menu.length < this._amount - 1) {
      const x = this._choices[this._randomIdx(this._choices.length)];
      if (x !== this._answer && !this._menu.includes(x)) {
        this._menu.push(x);
      }
    }

    this._menu.splice(this._randomIdx(this._amount), 0, this._answer);
  }

  request() {
    const result = {};

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
          result[this._handle] = Object.assign({}, {
            answer: this._menu[this._idx],
            isCorrect: this._answer === this._menu[this._idx]
          });
          this._emitter.emit('selection');
          this._displaySelection(result[this._handle].answer);
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
        resolve(result);
      });
    });
  }
}

module.exports = Quiz;
