(function(){
  var fs = require('fs');

  /**
   * Input from CLI, hopefully the input.txt path.
   * @type {String}
   */
  var input = process.argv[2] ? process.argv[2] : null;

  /**
   * Reading the data from input and converting to a sting.
   * @type {String}
   */
  var inputData = fs.readFileSync(input, 'utf8').toString();

  var valid = checkInputPath(input, inputData);


  if (valid) {
    /**
     * Get objet of parsed data.
     * @type {Object}
     */
    var parsed = parseData(inputData);
    if (parsed === -1) { valid = false }

    /**
     * Abstract parsed data into variables.
     * @type {Int, Int, Array}
     */
    var {
      days,
      numberofSubranges,
      priceRange
    } = parsed;

    /**
     * 2d array of subranges based on numberofSubranges
     * @type {Array[Array<int>]}
     */
    var subranges = createSubranges(days, numberofSubranges, priceRange);

    /**
     * Array of results based on subrange increments.
     * @type {Array<int>}
     */
    var subrangeCountResults = getCount(numberofSubranges, subranges);

    // Display final subrangeCountResults in formatted output.
    // We could write an output file I guess?
    console.log(subrangeCountResults.join('\n'));
  }

  /**
   * Check input data to ensure data is properly formatted.
   * @param  {String} input
   * @param  {String} inputData
   * @return {bool}           Return true if data is in valid format.
   */
  function checkInputPath(input, inputData) {
    if (!input) {
      console.log('Error: invalid input file path.');
      console.log('Please use the syntax: node <index path.js> <input path.txt>');

      return false;
    }

    var testData = parseData(inputData);

    if (!testData.days || !testData.numberofSubranges || !testData.priceRange) {
      console.log('Error: invalid file format, please refer to README');
      return false;
    }

    return true;

  }

  /**
   * parseData from inputData
   * @param  {String} data
   * @return {Object}      An object containing parsed input data.
   */
  function parseData(data) {
    var formatData         = data.split('\n');
    var args               = formatData[0].split(' ');
    var days               = parseInt(args[0]);
    var numberofSubranges  = parseInt(args[1]);
    var priceRange         = formatData[1].split(' ');


    // Check for data formatting.;
    if (formatData.length >= 3 && formatData[2] !== '') {
      console.error('Error: Too many lines!');
      return -1;
    }

    if (args.length > 2 || args.length < 2) {
      console.error('Error: invalid number of arguments (2)');
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
  function createSubranges(days, numberofSubranges, priceRange) {
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

  function getCount(num, sub){
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


}());
