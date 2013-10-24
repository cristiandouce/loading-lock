/**
 * Module dependencies.
 */

var spin = require('spin');
var classes = require('classes');

/**
 * Module expose.
 */

module.exports = LoadingLock;

/**
 * Return new `LoadingLock` instance.
 *
 * @param {DOMNode} el Document Object Model Node Element
 * @param {Object} options Options object.
 * @return {LoadingLock} `LoadingLock` instance.
 * @api public
 */

function LoadingLock (el, options) {
  if (!(this instanceof LoadingLock)) {
    return new LoadingLock(el, options);
  }

  this.el = el;

  this.classes = classes(el);
  this.classes.add('loading-lock');

  // create lock screen element
  // with proper css classes
  this.lockScreen = document.createElement('span');
  this.lockScreen.classList.add('lock-spinner');

  // insert lock screen element for
  // `spin` height a width refs
  this.el.appendChild(this.lockScreen);

  // set size of spinner from el's size or options
  // defaults to `25`
  this.size = Math.min(this.el.offsetWidth / 5, this.el.offsetHeight / 5) || options.size || 25;

}

/**
 * Locks element adding 'locked' class
 *
 * @return {LoadingLock} `LoadingLock` instance.
 * @api public
 */

LoadingLock.prototype.lock = function() {
  this.classes.add('locked');
  this.spinner = spin(this.lockScreen, { delay: 1, size: this.size });
  return this;
}

/**
 * Unlocks element removing 'locked' class
 *
 * @return {LoadingLock} `LoadingLock` instance.
 * @api public
 */

LoadingLock.prototype.unlock = function() {
  this.classes.remove('locked');
  this.spinner.remove();

  return this;
}