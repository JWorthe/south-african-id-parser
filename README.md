South African ID Number Parser
==============================

[![Build Status](https://travis-ci.org/JWorthe/south-african-id-parser.svg?branch=master)](https://travis-ci.org/JWorthe/south-african-id-parser)

The ID Numbers issued in South Africa follow a regular format that you
can use to derive some information about them. The following
information is available:

* Date of Birth
* Sex
* Citizenship

This library can also check if the ID number supplied is a valid South
African ID number.

More information on the ID number format can be found
[here](http://geekswithblogs.net/willemf/archive/2005/10/30/58561.aspx)
and [here](http://knowles.co.za/generating-south-african-id-numbers/).

Usage
-----

Download the library from NPM using the following command in a terminal:

```
npm install --save south-african-id-parser
```

### Usage In NodeJS

```
var saIdParser = require('south-african-id-parser');
var info = saIdParser.parse('9001049818080');
```

### Usage In the Browser

When used in the browser, the library will add the `saIdParser` object
to the window for you to use.

```
<script src="south-african-id-parser.js"></script>
<script>
    var info = saIdParser.parse('9001049818080');
</script>
```

### Parse Everything

The package exposes the `.parse(idNumber)` method for calling all of
the validation and parsing in one.

If validation fails, the resulting object only has the isValid property.

```
var saIdParser = require('south-african-id-parser');
var validIdNumber = '9001049818080';

var info = saIdParser.parse(validIdNumber);
//info === {
//  isValid: true,
//  dateOfBirth: new Date(1990, 01, 04),
//  isMale: true,
//  isFemale: false,
//  isSouthAfricanCitizen: true
//}

var invalidIdNumber = '1234567';
info = saIdParser.parse(invalidIdNumber);
//info === {
//  isValid: false
//}
```

### Only Validate

`.validate(idNumber)` only checks if the ID number is valid.

```
var saIdParser = require('south-african-id-parser');
var validIdNumber = '9001049818080';
var isValid = saIdParser.validate(validIdNumber);

//valid === true
```

### Only Parse Date of Birth

The method does not do a full validation on the ID number, but it will
return undefined if either the number supplied is not a 13 digit
number string or the date section of the ID number is invalid.

```
var saIdParser = require('south-african-id-parser');
var validIdNumber = '9001049818080';
var dateOfBirth = saIdParser.parseDateOfBirth(validIdNumber);

//dateOfBirth === new Date(1990, 01, 04)
```

The date of birth included in the ID number has a two digit year. For
example, 90 instead of 1990.

This is handled by comparing the date of birth to the current date,
and choosing the century that gives the person the lowest age, while
still putting their age in the past.

For example, assuming that the current date is 10 December 2015. If
the date of birth parsed is 10 December 15, it will be interpreted as
10 December 2015. If, on the other hand, the date of birth is parsed
as 11 December 15, that will be interpreted as 10 December 1915.

### Only Parse Sex

The method does not do a full validation on the ID number, but it will
return undefined if the number supplied is not a 13 digit number
string.

```
var saIdParser = require('south-african-id-parser');
var validIdNumber = '9001049818080';
var isFemale = saIdParser.parseIsFemale(validIdNumber);
var isMale = saIdParser.parseIsMale(validIdNumber);

//isFemale === false
//isMale === true
```

### Only Parse Citizenship

The method does not do a full validation on the ID number, but it will
return undefined if the number supplied is not a 13 digit number
string.

```
var saIdParser = require('south-african-id-parser');
var validIdNumber = '9001049818080';
var isSouthAfricanCitizen = saIdParser.parseIsSouthAfricanCitizen(validIdNumber);

//isSouthAfricanCitizen === true
```

License
-------

Copyright 2017, Justin Worthe

This library can be used free of charge under either the ISC license
or the GNU GPL 3.0.

- [https://opensource.org/licenses/ISC](https://opensource.org/licenses/ISC)
- [http://www.gnu.org/licenses/gpl-3.0.html](http://www.gnu.org/licenses/gpl-3.0.html)
