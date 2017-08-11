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
    dayWindow,
    priceRange
  } = parsed;

  console.log(days);
  console.log(dayWindow);
  console.log(priceRange);

  /**
   * parseData from inputData
   * @param  {String} data
   * @return {Object}      An object containing parsed input data.
   */
  function parseData(data) {
    var formatData = data.split('\n');
    var args       = formatData[0].split(' ');
    var days       = parseInt(args[0]);
    var dayWindow  = parseInt(args[1]);
    var priceRange = formatData[1];

    return {
      days,
      dayWindow,
      priceRange
    }
  }

  function createSubranges(days, dayWindow, priceRange) {

  }




}());
