(function() {
  'use strict';

  const fs = require('fs');

  var Counter = function(input) {
    this.input = input;
    this.inputData = fs.readFileSync(input, 'utf8').toString();
    this.valid = this.checkInputPath(this.input, this.inputData);
    this.days;
    this.numberofSubranges;
    this.priceRange;

    // Abstract from parseData.
    if (!this.parseData().error) {
      var { days, numberofSubranges, priceRange } = this.parseData();
      this.days = days;
      this.numberofSubranges = numberofSubranges;
      this.priceRange = priceRange;
    } else {
      console.log(this.parseData().errorMsg);
    }

    this.subranges = this.createSubranges();
    this.results = this.getCount();
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
   * parseData from inputData, check for erroneous data format.
   * @return {Object}      An object containing parsed input data if valid, or err.
   */
  Counter.prototype.parseData = function() {
    var formatData         = this.inputData.split('\n');
    var args               = formatData[0].split(' ');
    var days               = parseInt(args[0]);
    var numberofSubranges  = parseInt(args[1]);
    var priceRange         = formatData[1].split(' ');


    // Check for data formatting.;
    if ((formatData.length >= 3 && formatData[2] !== '') || formatData.length < 2) {
      return {
        errorMsg:`Too ${formatData.length < 2 ? 'few' : 'many' } lines provided.`,
        error:true
      };
    }

    if (args.length > 2 || args.length < 2) {
      return {
        errorMsg: `Too ${args.length > 2 ? 'many' : 'few'} arguments provided.`,
        error:true
      };
    }

    // Probably a more efficient way to handle this? 🤔
    if (args.length == 2) {
      if (args[0] < args[1]) {
        return {
          errorMsg:"Number of windows cannot exceed number of days. 1 < K < N" ,
          error:true
        }
      } else if (args[1] < 1) {
        return {
          errorMsg:"Need at least one window.",
          error:true
        }
      } else if (args[0] > 200000) {
        return {
          errorMsg:"Number of days provided is too large. < 200k",
          error:true
        }
      } else if (!days || !numberofSubranges) {
        return {
          error:true,
          errorMsg:"Invalid data type for window/subrange"
        }
      }
    }

    // Check to see that price data is valid.
    if (priceRange.length) {
      var price = priceRange.every(price => {
        return price < 1000000 && !isNaN(price) && price !== '';
      });

      if (!price) {
        return {
          error:true,
          errorMsg: "Invalid house price data. Must be a value < 1000000."
        }
      }
    }

    return {
      error:false,
      errorMsg:'',
      days,
      numberofSubranges,
      priceRange,
    }
  }

  /**
   * Logic for solving subrange.
   * @param  {int} days
   * @param  {int} numberofSubranges
   * @param  {Array<int>} priceRange
   * @return {Array[Array<int>]}            Returns desired output.
   */
  Counter.prototype.createSubranges = function() {
    // Calculate the number of numberofSubranges.
    var subrangeWindowSize = this.days - this.numberofSubranges + 1;
    var results = [];

    for (var i = 0; i < this.numberofSubranges; i++) {
      var temp = this.priceRange.slice();
      results.push(temp.slice(i, subrangeWindowSize + i));
    }

    return results;
  }

  /**
   * Get the count with way too many loops. 😩
   * @param  {Array[Array<int>]} subranges
   * @return {Array<int>}           Array of increment count results.
   */

  Counter.prototype.getCount = function(){
    var resultsArray = [];

    for (var i = 0; i < this.subranges.length; i++) {
      var count = 0;
      var sequence = 0;

      // Check for sequence of increasing/decreasing values.
      for (var j = 0; j < this.subranges[i].length; j++) {
        if (this.subranges[i][j] < this.subranges[i][j+1]) {
          if (sequence > 0) {
            count += sequence;
            sequence++;
          } else {
            sequence = 1;
          }
          count++
        } else if (this.subranges[i][j] > this.subranges[i][j+1]) {
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
