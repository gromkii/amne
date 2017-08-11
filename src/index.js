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

  /**
   * Get objet of parsed data.
   * @type {Object}
   */
  var parsed = parseData(inputData);

  /**
   * Abstract parsed data into variables.
   * @type {Int, Int, Array}
   */
  var {
    days,
    numberofSubranges,
    priceRange
  } = parsed;

  console.log(days);
  console.log(numberofSubranges);
  console.log(priceRange);

  var subranges = createSubranges(days, numberofSubranges, priceRange);

  console.log(subranges);

  var subrangeCountResults = getCount(subranges);

  console.log(subrangeCountResults);

  /**
   * parseData from inputData
   * @param  {String} data
   * @return {Object}      An object containing parsed input data.
   */
  function parseData(data) {
    var formatData = data.split('\n');
    var args       = formatData[0].split(' ');
    var days       = parseInt(args[0]);
    var numberofSubranges  = parseInt(args[1]);
    var priceRange = formatData[1].split(' ');

    return {
      days,
      numberofSubranges,
      priceRange
    }
  }

  /**
   * Logic for solving subrange.
   * @param  {int} days
   * @param  {int} numberofSubranges
   * @param  {Array} priceRange
   * @return {Array}            Returns desired output.
   */
  function createSubranges(days, numberofSubranges, priceRange) {
    // Calculate the number of numberofSubranges.
    var subrangeWindowSize = days - numberofSubranges + 1;
    var results = [];
    // Divide priceRange in to the number of numberofSubranges. N - K + 1
    for (var i = 0; i < subrangeWindowSize; i++) {
      var temp = priceRange.slice();
      results.push(temp.slice(i, subrangeWindowSize + i));
    }

    return results;
  }

  /**
   * Compares between values in numberofSubranges.
   * @param  {int} a
   * @param  {int} b
   * @return {int}   Returns count for increase/decreasing subrange.
   */
  function compareValues(a, b) {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    }
    return 0;
  }

  function getCount(subranges){
    var resultsArray = [];
    for (var i = 0; i < subranges.length; i++) {
      var count = 0;
      for (var j = 0; j < subranges[i].length; j++) {
        count += compareValues(subranges[i][j], subranges[i][j+1]);
      }
      resultsArray.push(count);
    }

    return resultsArray;
  }

}());
