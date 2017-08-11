(function(){
  'use strict';

  var fs = require('fs');
  // var Counter = require('./Counter.js');
  /**
   * Input from CLI, hopefully the input.txt path.
   * @type {String}
   */
  var input = process.argv[2] ? process.argv[2] : null;
  var Counter = require('./Counter.js');
  var newCounter = new Counter(input);
  var valid = newCounter.valid;



  if (valid) {
    /**
     * Get objet of parsed data.
     * @type {Object}
     */
    var parsed = newCounter.parseData();
    if (parsed === -1) { valid = false }

    /**
     * Abstract parsed data into variables.
     * @type {Int, Int, Array}
     */
    var {
      days,
      numberofSubranges,
      priceRange
    } = parsed; // TODO: Move these to constructor!

    /**
     * 2d array of subranges based on numberofSubranges
     * @type {Array[Array<int>]}
     */
    var subranges = newCounter.createSubranges(days, numberofSubranges, priceRange);

    /**
     * Array of results based on subrange increments.
     * @type {Array<int>}
     */
    var subrangeCountResults = newCounter.getCount(subranges);

    // Display final subrangeCountResults in formatted output.
    // We could write an output file I guess?
    console.log(subrangeCountResults.join('\n'));
  }
}());
