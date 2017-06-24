'use strict';
/*jshint
  node: true
*/

var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
var expect = require('chai').expect;
var saIdParser = require('../south-african-id-parser.js');

describe('South African ID Number Parsing', function () {
    var validIdNumbers = [{
        idNumber: '9001049818080',
        dateOfBirth: new Date(1990, 0, 4),
        isMale: true,
        isFemale: false,
        isSouthAfricanCitizen: true
    }, {
        idNumber: '1012311412187',
        dateOfBirth: new Date(2010, 11, 31),
        isMale: false,
        isFemale: true,
        isSouthAfricanCitizen: false
    }];
    var invalidIdNumbers = [{
        idNumber: '9001049881080' //invalid check digit
    }, {
        idNumber: '9002302419087' //invalid date
    }, {
        idNumber: '9001049881a83' //has a character in there
    }, {
        idNumber: '90010498813' //wrong length
    }];

    it('should correctly validate valid ID numbers', function() {
        validIdNumbers.forEach(function(validIdNumber) {
            expect(saIdParser.validate(validIdNumber.idNumber)).to.equal(true);
        });
    });
    it('should correctly validate invalid ID numbers', function() {
        invalidIdNumbers.forEach(function(invalidIdNumber) {
            expect(saIdParser.validate(invalidIdNumber.idNumber)).to.equal(false);
        });
    });
       
    it('should parse valid date of birth correctly', function() {
        validIdNumbers.forEach(function(validIdNumber) {
            var parsedDate = saIdParser.parseDateOfBirth(validIdNumber.idNumber);
            var expectedDate = validIdNumber.dateOfBirth;
            expect(parsedDate.getTime()).to.equal(expectedDate.getTime());
        });
    });
    it ('should parse valid gender correctly', function() {
        validIdNumbers.forEach(function(validIdNumber) {
            expect(saIdParser.parseIsMale(validIdNumber.idNumber))
                .to.equal(validIdNumber.isMale);
            expect(saIdParser.parseIsFemale(validIdNumber.idNumber))
                .to.equal(validIdNumber.isFemale);
        });
    });
    it ('should parse valid citizenship correctly', function() {
        validIdNumbers.forEach(function(validIdNumber) {
            expect(saIdParser.parseIsSouthAfricanCitizen(validIdNumber.idNumber))
                .to.equal(validIdNumber.isSouthAfricanCitizen);
        });
    });

    it('should correctly parse valid ID numbers', function() {
        validIdNumbers.forEach(function(validIdNumber) {
            var info = saIdParser.parse(validIdNumber.idNumber);
            expect(info.isValid).to.equal(true);
            expect(info.dateOfBirth.getTime()).to.equal(validIdNumber.dateOfBirth.getTime());
            expect(info.isMale).to.equal(validIdNumber.isMale);
            expect(info.isFemale).to.equal(validIdNumber.isFemale);
            expect(info.isSouthAfricanCitizen).to.equal(validIdNumber.isSouthAfricanCitizen);
        });
    });

    it('should correctly parse invalid ID numbers', function() {
        invalidIdNumbers.forEach(function(invalidIdNumber) {
            var info = saIdParser.parse(invalidIdNumbers.idNumber);
            expect(info).to.deep.equal({isValid: false});
        });
    });
});
