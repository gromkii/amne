(function(){
  var fs = require('fs');

  var input = process.argv[2] ? process.argv[2] : null;

  if (input && process.argv.length === 3) {
    fs.readFile(input, (err, data) => {
      if (err) {
        console.log('Error: ' + error);
      }

      var formatData = String(data).split('\n');
      var args = formatData[0];
      var inputData = formatData[1];

      console.log('Arguments: ' + args);
      console.log('Supplied data: ' + inputData);
     });
  } else {

  }


}());
