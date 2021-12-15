"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFraction = exports.parseInches = exports.parseFeet = exports.parseInchesAndFeet = exports.parseMillimeters = exports.parseCentimeters = exports.parseMeters = exports.parseLength = exports.formatWatts = exports.formatCentimeters = exports.formatMillimeters = exports.formatFeetDecimal = void 0;
const numeral = require("numeral");
const convert_1 = require("convert");
const INVALID_FORMAT_MSG = 'Invalid format';
/**
 * Formats a number of feet for display with 2 decimal places and the units 'ft'.
 */
function formatFeetDecimal(feet) {
    const ft = feet || 0;
    return numeral(ft).format('0,0.[00]') + ' ft';
}
exports.formatFeetDecimal = formatFeetDecimal;
/**
 * Formats a number of inches for display as millimeters.
 */
function formatMillimeters(inches) {
    let mm = 0;
    if (inches) {
        mm = inches * 25.4;
    }
    return numeral(mm).format('0,0');
}
exports.formatMillimeters = formatMillimeters;
/**
 * Formats a number of inches for display as centimeters.
 */
function formatCentimeters(inches) {
    let cm = 0;
    if (inches) {
        cm = inches * 2.54;
    }
    return numeral(cm).format('0,0.[0]');
}
exports.formatCentimeters = formatCentimeters;
/**
 * Formats a number of watts for display with no decimal places and the units 'W'.
 */
function formatWatts(watts, hideUnits) {
    const w = watts || 0;
    const units = hideUnits ? '' : ' W';
    return numeral(w).format('0,0') + units;
}
exports.formatWatts = formatWatts;
/**
 * Determines whether the given value is a finite number.
 */
function isNumber(num) {
    return (!isNaN(num) && isFinite(num));
}
/**
 * Parses a string and returns a length in the target units, or inches if not specified.
 * Supports parsing lengths in millimeters, centimeters, meters, feet and inches (fractional or decimal).
 * @returns The length as a decimal number in the target units
 * @throws an error if the string format cannot be parsed
 */
function parseLength(input, targetUnit = 'in') {
    if (!input) {
        return 0;
    }
    if (input.includes('feet') || input.includes('foot') || input.includes('ft') || input.includes('\'') || input.includes('in') || input.includes('"')) {
        const inches = parseInchesAndFeet(input);
        return (0, convert_1.default)(inches, 'inches').to(targetUnit);
    }
    else if (input.includes('mm') || input.includes('millimeter')) {
        const mm = parseMillimeters(input);
        return (0, convert_1.default)(mm, 'mm').to(targetUnit);
    }
    else if (input.includes('cm') || input.includes('centimeter')) {
        const cm = parseCentimeters(input);
        return (0, convert_1.default)(cm, 'cm').to(targetUnit);
    }
    else if (input.includes('m')) { // This also covers 'meter' and 'meters'
        const m = parseMeters(input);
        return (0, convert_1.default)(m, 'meters').to(targetUnit);
    }
    else {
        // If no units specified then assume inches
        const inches = parseInchesAndFeet(input);
        return (0, convert_1.default)(inches, 'inches').to(targetUnit);
    }
}
exports.parseLength = parseLength;
function parseMeters(input) {
    if (!input)
        return 0;
    const str = input
        .replaceAll('meters', '')
        .replaceAll('meter', '')
        .replaceAll('m', '')
        .trim();
    const num = Number(str);
    if (isNumber(num)) {
        return num;
    }
    throw new Error(INVALID_FORMAT_MSG);
}
exports.parseMeters = parseMeters;
function parseCentimeters(input) {
    if (!input)
        return 0;
    const str = input
        .replaceAll('centimeters', '')
        .replaceAll('centimeter', '')
        .replaceAll('cm', '')
        .trim();
    const num = Number(str);
    if (isNumber(num)) {
        return num;
    }
    throw new Error(INVALID_FORMAT_MSG);
}
exports.parseCentimeters = parseCentimeters;
function parseMillimeters(input) {
    if (!input)
        return 0;
    const str = input
        .replaceAll('millimeters', '')
        .replaceAll('millimeter', '')
        .replaceAll('mm', '')
        .trim();
    const num = Number(str);
    if (isNumber(num)) {
        return num;
    }
    throw new Error(INVALID_FORMAT_MSG);
}
exports.parseMillimeters = parseMillimeters;
/**
 * Parse a string containing feet and inches to return the number of inches.
 * Feet are supported using single quotes, 'ft' or 'feet' or 'foot'.
 * Inches are supported using two single quotes, double quotes, 'in', 'inch', or 'inches'.
 * Inches may also include fractions.
 * Supports the following input string formats:
 *   5          // If no units are specified then uses the targetUnit of 'ft' or 'in'
 *   5.25       // If no units are specified then uses the targetUnit of 'ft' or 'in'
 *   5 ft       // With or without space between number and 'ft'
 *   5'         // Use single quote for feet
 *   6"         // Can omit feet and just parse inches
 *   5'6"       // Can parse both feet and inches
 *   5' 6"      // Can have a space between feet and inches
 *   5' 6''     // Can use single or double quotes for inches
 *   5' 6-1/4"      // Can use fractional inches
 *   5 ft 6 in      // Can use 'ft' or 'in' or single/double quotes
 *   5 ft 6-1/4 in  // Can use 'ft' or 'in' or single/double quotes
 * @returns The number of feet as a decimal number
 * @throws an error if the string format cannot be parsed
 */
function parseInchesAndFeet(input) {
    if (!input)
        return 0;
    let str = standardizeFeetSymbol(input);
    str = replaceInchSymbolBySpace(str);
    let feet = 0, inches = 0;
    const indexFeetSymbol = str.indexOf('\'');
    // If the input contains feet then parse the feet
    if (indexFeetSymbol !== -1) {
        const s = str.substring(0, indexFeetSymbol);
        feet = parseFeet(s);
    }
    // Find the substring containing just the inches; this will be entire string if no feet are given
    let strInches = str;
    if (indexFeetSymbol !== -1) {
        strInches = (indexFeetSymbol + 1 < str.length)
            ? str.substring(indexFeetSymbol + 1)
            : '';
    }
    inches = parseInches(strInches);
    // Convert result to inches
    return (feet * 12) + inches;
}
exports.parseInchesAndFeet = parseInchesAndFeet;
/**
 * Parses a string containing feet and returns the number of feet.
 * Note that the string may also contain inches after the feet but only the feet number will be returned.
 */
function parseFeet(input) {
    if (!input)
        return 0;
    let str = standardizeFeetSymbol(input);
    // Take only the substring up until a single quote
    const index = str.indexOf('\'');
    if (index !== -1) {
        str = str.substring(0, index).trim();
    }
    if (!str)
        return 0;
    // Try to convert the string to a number
    const num = Number(str);
    if (isNumber(num)) {
        return num;
    }
    throw new Error(INVALID_FORMAT_MSG);
}
exports.parseFeet = parseFeet;
/**
 * Parses a string containing inches and/or fractions and returns the number of inches.
 * Supports the following input string formats:
 *   6         // No units specified
 *   6.25      // No units specified
 *   6"        // Double quote
 *   6''       // Two single quotes
 *   6 in      // With or without space between number and 'in'
 *   6 inch    // With or without space between number and 'inch'
 *   6 inches  // With or without space between number and 'inches'
 *   6-1/4"    // With fraction, separated by a dash
 *   6 1/4"    // With fraction, separated by a space
 * @throws an error if the string format cannot be parsed
 */
function parseInches(input) {
    if (!input)
        return 0;
    let str = standardizeFeetSymbol(input);
    // If feet are included in input then strip it out to leave just the inches
    const indexFt = str.indexOf('\'');
    if (indexFt !== -1 && indexFt < str.length) {
        str = str.substring(indexFt + 1).trim();
    }
    // Remove inches unit label and replace by space for parsing.
    // Also replace dash with a space (for fractions like 5-1/4").
    str = replaceInchSymbolBySpace(str);
    let inches = 0;
    const arr = str.split(' ');
    arr.forEach(s => {
        if (s.includes('/')) {
            inches += parseFraction(s);
        }
        else {
            const num = Number(s);
            if (!isNumber(num)) {
                throw new Error(INVALID_FORMAT_MSG);
            }
            inches += num;
        }
    });
    return inches;
}
exports.parseInches = parseInches;
/**
 * Parses a fraction and returns the decimal number representing the fraction.
 * For example, "1/4" would return 0.25
 * @throws an error if the string cannot be parsed as a fraction
 */
function parseFraction(input) {
    if (!input)
        return 0;
    let str = replaceInchSymbolBySpace(input);
    if (!str.includes('/')) {
        throw new Error(INVALID_FORMAT_MSG);
    }
    const arr = str.split('/');
    const numerator = Number(arr[0]);
    const denominator = Number(arr[1]);
    if (!isNumber(numerator) || !isNumber(denominator)) {
        throw new Error(INVALID_FORMAT_MSG);
    }
    if (!denominator) {
        throw new Error('Divide by zero');
    }
    return numerator / denominator;
}
exports.parseFraction = parseFraction;
/**
 * Standardize feet symbol to just a single quote.
 * First change two single-quotes to a double-quote so we don't confuse feet and inches symbols.
 */
function standardizeFeetSymbol(input) {
    return input
        .replaceAll('\'\'', '"')
        .replaceAll('feet', '\'')
        .replaceAll('foot', '\'')
        .replaceAll('ft', '\'')
        .trim();
}
/**
 * Replaces all inches symbols by spaces to help parse the string.
 */
function replaceInchSymbolBySpace(input) {
    return input
        .replaceAll('inches', ' ')
        .replaceAll('inch', ' ')
        .replaceAll('in', ' ')
        .replaceAll('"', ' ')
        .replaceAll('\'\'', ' ')
        .replaceAll('-', ' ')
        .trim();
}
