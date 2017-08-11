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
    subranges,
    priceRange
  } = parsed;

  console.log(days);
  console.log(subranges);
  console.log(priceRange);

  var results = createSubranges(days, subranges, priceRange);

  console.log(results);

  /**
   * parseData from inputData
   * @param  {String} data
   * @return {Object}      An object containing parsed input data.
   */
  function parseData(data) {
    var formatData = data.split('\n');
    var args       = formatData[0].split(' ');
    var days       = parseInt(args[0]);
    var subranges  = parseInt(args[1]);
    var priceRange = formatData[1].split(' ');

    return {
      days,
      subranges,
      priceRange
    }
  }

  /**
   * Logic for solving subrange.
   * @param  {int} days
   * @param  {int} subranges
   * @param  {Array} priceRange
   * @return {Array}            Returns desired output.
   */
  function createSubranges(days, subranges, priceRange) {
    // Calculate the number of subranges.
    var subrangeWindowSize = days - subranges + 1;
    var results = [];
    var countResults = [];
    // Divide priceRange in to the number of subranges. N - K + 1
    for (var i = 0; i < subrangeWindowSize; i++) {
      var temp = priceRange.slice();
      results.push(temp.slice(i, subrangeWindowSize + i));
    }

    for (var i = 0; i < results.length; i++) {
      var count = 0;

      for (var j = 0; j < results[i].length; j++) {
        if (results[i][j] < results[i][j+1]) {
          count++

          // This check needs to happen for the number of items left in the array.
          if (results[i][j+1] < results[i][j+2]) {
            count++
          }
        } else if (results[i][j] > results[i][j+1]) {
          count--
          // This check needs to happen for the number of items left in the array.
          if (results[i][j+1] > results[i][j+2]) {
            count--
          }
        }
      }
      countResults.push(count);
    }

    return countResults;
  }




}());
