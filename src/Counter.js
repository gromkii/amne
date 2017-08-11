(function() {
  'use strict';

  const fs = require('fs');

  var Counter = function(input) {
    this.input = input;
    this.inputData = fs.readFileSync(input, 'utf8').toString();
    this.valid = this.checkInputPath(this.input, this.inputData);
    this.errorMessage = null;
  }

  /**
   * Check input data to ensure data is properly formatted.
   * @param  {String} input
   * @param  {String} inputData
   * @return {bool}           Return true if data is in valid format.
   */
  Counter.prototype.checkInputPath = function() {
    if (!this.input) {
      console.log('Error: invalid input file path.');
      console.log('Please use the syntax: node <index path.js> <input path.txt>');

      return false;
    }

    return true;
  }

  /**
   * parseData from inputData
   * @return {Object}      An object containing parsed input data if valid.
   */
  Counter.prototype.parseData = function() {
    var formatData         = this.inputData.split('\n');
    var args               = formatData[0].split(' ');
    var days               = parseInt(args[0]);
    var numberofSubranges  = parseInt(args[1]);
    var priceRange         = formatData[1].split(' ');


    // Check for data formatting.;
    if ((formatData.length >= 3 && formatData[2] !== '') || formatData.length < 2) {
      this.errorMessage = `Too ${formatData.length < 2 ? 'few' : 'many' } lines provided.`;
      return -1;
    }

    if (args.length > 2 || args.length < 2) {
      this.errorMessage = `Too ${args.length > 2 ? 'many' : 'few'} arguments provided.`;
      return -1;
    }

    return {
      days: days ? days : null,
      numberofSubranges: numberofSubranges ? numberofSubranges : null,
      priceRange: priceRange ? priceRange : null
    }
  }

  /**
   * Logic for solving subrange.
   * @param  {int} days
   * @param  {int} numberofSubranges
   * @param  {Array<int>} priceRange
   * @return {Array[Array<int>]}            Returns desired output.
   */
  Counter.prototype.createSubranges = function(days, numberofSubranges, priceRange) {
    // Calculate the number of numberofSubranges.
    var subrangeWindowSize = days - numberofSubranges + 1;
    var results = [];

    for (var i = 0; i < numberofSubranges; i++) {
      var temp = priceRange.slice();
      results.push(temp.slice(i, subrangeWindowSize + i));
    }

    return results;
  }

  /**
   * Get the count with way too many loops. 😩
   * @param  {Array[Array<int>]} subranges
   * @return {Array<int>}           Array of increment count results.
   */

  Counter.prototype.getCount = function(sub){
    var resultsArray = [];

    for (var i = 0; i < sub.length; i++) {
      var count = 0;
      var sequence = 0;

      // Check for sequence of increasing/decreasing values.
      for (var j = 0; j < sub[i].length; j++) {
        if (sub[i][j] < sub[i][j+1]) {
          if (sequence > 0) {
            count += sequence;
            sequence++;
          } else {
            sequence = 1;
          }
          count++
        } else if (sub[i][j] > sub[i][j+1]) {
          if (sequence < 0) {
            count += sequence;
            sequence--;
          } else {
            sequence = -1
          }
          count--;
        }

      }

      resultsArray.push(count);
    }

    return resultsArray;
  }

  module.exports = Counter;
}());
