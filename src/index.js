(function(){
  'use strict';

  var fs = require('fs');
  // var Counter = require('./Counter.js');
  /**
   * Input from CLI, hopefully the input.txt path.
   * @type {String}
   */
  var input = process.argv[2] ? process.argv[2] : null;

  /**
   * Create new instance of Counter.
   * @type {Counter}
   */
  var Counter = require('./Counter.js');
  var newCounter = new Counter(input);

  console.log(newCounter.results.join('\n'));



}());
