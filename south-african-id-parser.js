(function (global, factory) {
    'use strict';
    
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        global.saIdParser = factory();
}(this, (function () {
    'use strict';

    return {
        parse: parse,
        validate: validate,
        parseDateOfBirth: parseDateOfBirth,
        parseIsMale: parseIsMale,
        parseIsFemale: parseIsFemale,
        parseIsSouthAfricanCitizen: parseIsSouthAfricanCitizen
    };

    function parse(idNumber) {
        var isValid = validate(idNumber);
        if (!isValid) {
            return {
                isValid: false
            };
        }

        return {
            isValid: isValid,
            dateOfBirth: parseDateOfBirth(idNumber),
            isMale: parseIsMale(idNumber),
            isFemale: parseIsFemale(idNumber),
            isSouthAfricanCitizen: parseIsSouthAfricanCitizen(idNumber)
        };
    }

    function validate(idNumber) {
        if (!regexpValidate(idNumber) || !datePartValidate(idNumber) || !controlDigitValidate(idNumber)) {
            return false;
        }

        return true;
    }

    function regexpValidate(idNumber) {
        if (typeof(idNumber) !== 'string') {
            return false;
        }
        var regexp = /^[0-9]{13}$/;
        return regexp.test(idNumber);
    }

    function datePartValidate(idNumber) {
        var dateOfBirth = parseDateOfBirth(idNumber);
        return !!dateOfBirth;
    }

    function controlDigitValidate(idNumber) {
        var checkDigit = parseInt(idNumber[12], 10);

        var oddDigitsSum = 0;

        for (var i = 0; i < idNumber.length - 1; i+=2) {
            oddDigitsSum += parseInt(idNumber[i], 10);
        }
        var evenDigits = '';
        for (var j = 1; j < idNumber.length - 1; j+=2) {
            evenDigits += idNumber[j];
        }
        evenDigits = parseInt(evenDigits, 10);
        evenDigits *= 2;
        evenDigits = '' + evenDigits;

        var sumOfEvenDigits = 0;
        for (var k = 0; k < evenDigits.length; k++) {
            sumOfEvenDigits += parseInt(evenDigits[k], 10);
        }
        var total = sumOfEvenDigits + oddDigitsSum;
        var computedCheckDigit = 10 - (total % 10);

        if (computedCheckDigit === 10) {
            computedCheckDigit = 0;
        }
        return computedCheckDigit === checkDigit;
    }

    function parseDateOfBirth(idNumber) {
        if (!regexpValidate(idNumber)) {
            return undefined;
        }

        //get year, and assume century
        var currentYear = new Date().getFullYear();
        var currentCentury = Math.floor(currentYear/100)*100;
        var yearPart = currentCentury + parseInt(idNumber.substring(0,2), 10);
        if (yearPart > currentYear) {
            yearPart -= 100; //must be last century
        }
        
        //In Javascript, Jan=0. In ID Numbers, Jan=1.
        var monthPart = parseInt(idNumber.substring(2,4), 10)-1;

        var dayPart = parseInt(idNumber.substring(4,6), 10);

        var dateOfBirth = new Date(yearPart, monthPart, dayPart);

        //validate that date is in a valid range by making sure that it wasn't 'corrected' during construction
        if (!dateOfBirth || dateOfBirth.getFullYear() !== yearPart || dateOfBirth.getMonth() !== monthPart || dateOfBirth.getDate() !== dayPart) {
            return undefined;
        }
        
        return dateOfBirth;
    }

    function parseIsMale(idNumber) {
        return !parseIsFemale(idNumber);
    }

    function parseIsFemale(idNumber) {
        if (!regexpValidate(idNumber)) {
            return undefined;
        }
        return parseInt(idNumber[6], 10) <= 4;
    }

    function parseIsSouthAfricanCitizen(idNumber) {
        if (!regexpValidate(idNumber)) {
            return undefined;
        }
        return parseInt(idNumber[10], 10) === 0;
    }
})));
