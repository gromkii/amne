(function() {
  'use strict';

  var expect = require('chai').expect;
  var Counter = require('../src/Counter');


  describe('Counter Test', () => {
    describe('sample-input.txt', ()=> {
      var input = 'sampleData/sample-input.txt';
      var tempCount = new Counter(input);

      it('should return valid input path', () => {
        expect(tempCount.checkInputPath()).to.eq(true);
        expect(tempCount.valid).to.eq(true);
      });
      it('should return valid data array', () => {
        expect(tempCount.parseData()).to.not.eq(-1);
      });
      it('should return an array of 3 subranges', () => {
        var parsed = tempCount.parseData();
        var { days, numberofSubranges, priceRange } = parsed;
        var subranges = tempCount.createSubranges(days, numberofSubranges, priceRange);
        expect(subranges.length).to.eq(3);
      });
      it('should return valid output array [3, 0, 1]', () => {
        var parsed = tempCount.parseData();
        var { days, numberofSubranges, priceRange } = parsed;
        var subranges = tempCount.createSubranges(days, numberofSubranges, priceRange);
        var resultsArray = tempCount.getCount(subranges);

        expect(resultsArray.length).to.eq(3);
        expect(resultsArray).to.deep.eq([3,0,-1]);
      });
    });

    describe('invalid1.txt', () => {
      var input = 'sampleData/invalid1.txt';
      var tempCount = new Counter(input);

      it('should return valid input path', () => {
        expect(tempCount.checkInputPath()).to.eq(true);
        expect(tempCount.valid).to.eq(true);
      });
      it('should return invalid arguments', () => {
        expect(tempCount.parseData()).to.eq(-1);
      });
      it('should return error message, too many arguments', () => {
        expect(tempCount.errorMessage).to.eq('Too many arguments provided.');
      })
    });

    describe('invalid2.txt', () => {
      var input = 'sampleData/invalid2.txt';
      var tempCount = new Counter(input);

      it('should return valid input path', () => {
        expect(tempCount.checkInputPath()).to.eq(true);
        expect(tempCount.valid).to.eq(true);
      });
      it('should return invalid arguments', () => {
        expect(tempCount.parseData()).to.eq(-1);
      })
      it('should return error message, too many lines.', () => {
        expect(tempCount.errorMessage).to.eq('Too many lines provided.')
      })

    })
  })
}());
