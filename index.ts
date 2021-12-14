import numeral = require('numeral')
import convert from 'convert'

const INVALID_FORMAT_MSG = 'Invalid format'


/**
 * Formats a number of feet for display with 2 decimal places and the units 'ft'.
 */
export function formatFeetDecimal (feet?: number) {
  const ft = feet || 0
  return numeral(ft).format('0,0.[00]') + ' ft'
}


/**
 * Formats a number of inches for display as millimeters.
 */
export function formatMillimeters (inches?: number) {
  let mm = 0
  if (inches) {
    mm = inches * 25.4
  }
  return numeral(mm).format('0,0')
}


/**
 * Formats a number of inches for display as centimeters.
 */
export function formatCentimeters (inches?: number) {
  let cm = 0
  if (inches) {
    cm = inches * 2.54
  }
  return numeral(cm).format('0,0.[0]')
}


/**
 * Formats a number of watts for display with no decimal places and the units 'W'.
 */
export function formatWatts (watts?: number, hideUnits?: boolean) {
  const w = watts || 0
  const units = hideUnits ? '' : ' W'
  return numeral(w).format('0,0') + units
}


/**
 * Determines whether the given value is a finite number.
 */
function isNumber (num: number) {
  return (!isNaN(num) && isFinite(num))
}


/**
 * Parses a string and returns a length in the target units, or inches if not specified.
 * Supports parsing lengths in millimeters, centimeters, meters, feet and inches (fractional or decimal).
 * @returns The length as a decimal number in the target units
 * @throws an error if the string format cannot be parsed
 */
export function parseLength (input?: string, targetUnit: 'mm' | 'cm' | 'm' | 'in' | 'ft' = 'in') {
  if (!input) {
    return 0
  }

  if (input.includes('feet') || input.includes('foot') || input.includes('ft') || input.includes('\'') || input.includes('in') || input.includes('"')) {
    const inches = parseInchesAndFeet(input)
    return convert(inches, 'inches').to(targetUnit)
  }
  else if (input.includes('mm') || input.includes('millimeter')) {
    const mm = parseMillimeters(input)
    return convert(mm, 'mm').to(targetUnit)
  }
  else if (input.includes('cm') || input.includes('centimeter')) {
    const cm = parseCentimeters(input)
    return convert(cm, 'cm').to(targetUnit)
  }
  else if (input.includes('m')) {  // This also covers 'meter' and 'meters'
    const m = parseMeters(input)
    return convert(m, 'meters').to(targetUnit)
  }
  else {
    // If no units specified then assume inches
    const inches = parseInchesAndFeet(input)
    return convert(inches, 'inches').to(targetUnit)
  }
}


export function parseMeters (input?: string) {
  if (!input) return 0
  const str = input
    .replaceAll('meters', '')
    .replaceAll('meter', '')
    .replaceAll('m', '')
    .trim()
  const num = Number(str)
  if (isNumber(num)) {
    return num
  }
  throw new Error(INVALID_FORMAT_MSG)
}


export function parseCentimeters (input?: string) {
  if (!input) return 0
  const str = input
    .replaceAll('centimeters', '')
    .replaceAll('centimeter', '')
    .replaceAll('cm', '')
    .trim()
  const num = Number(str)
  if (isNumber(num)) {
    return num
  }
  throw new Error(INVALID_FORMAT_MSG)
}


export function parseMillimeters (input?: string) {
  if (!input) return 0
  const str = input
    .replaceAll('millimeters', '')
    .replaceAll('millimeter', '')
    .replaceAll('mm', '')
    .trim()
  const num = Number(str)
  if (isNumber(num)) {
    return num
  }
  throw new Error(INVALID_FORMAT_MSG)
}


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
export function parseInchesAndFeet (input?: string, targetUnit: 'ft' | 'in' = 'in') {
  if (!input) return 0
  // Remove all spaces and replace two single-quotes with a double quote
  const str = input.replaceAll(' ', '').replaceAll('\'\'', '"')
  const num = Number(str)
  if (isNumber(num)) {
    return num
  }
  else if (input.includes('feet') || input.includes('foot') || input.includes('ft') || input.includes('\'')) {
    const feet = parseFeet(input) //TODO: str or input?

    const array = str.split('\'')
    let inches = 0
    if (array.length > 1) {
      inches = parseInches(array[1])
    }
    if (isNaN(feet) || isNaN(inches)) {
      throw new Error(INVALID_FORMAT_MSG)
    }
    return (feet * 12) + inches
  }
  else if (str.indexOf('"') !== -1) {
    const inches = parseInches(str)
    if (isNaN(inches)) {
      throw new Error(INVALID_FORMAT_MSG)
    }
    return inches
  }
  throw new Error(INVALID_FORMAT_MSG)
}


/**
 * Parses a string containing feet and returns the number of feet.
 * Note that the string may also contain inches after the feet but only the feet number will be returned.
 */
export function parseFeet (input?: string) {
  if (!input) return 0

  let str = standardizeFeetSymbol(input)

  // Take only the substring up until a single quote
  const index = str.indexOf('\'')
  if (index !== -1) {
    str = str.substring(0, index).trim()
  }

  if (!str) return 0

  // Try to convert the string to a number
  const num = Number(str)
  if (isNumber(num)) {
    return num
  }

  throw new Error(INVALID_FORMAT_MSG)
}


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
export function parseInches (input?: string) {
  if (!input) return 0

  let str = standardizeFeetSymbol(input)

  // If feet are included in input then strip it out to leave just the inches
  const indexFt = str.indexOf('\'')
  if (indexFt !== -1 && indexFt < str.length) {
    str = str.substring(indexFt + 1).trim()
  }

  // Remove inches unit label and replace by space for parsing.
  // Also replace dash with a space (for fractions like 5-1/4").
  str = replaceInchSymbolBySpace(str)

  let inches = 0
  const arr = str.split(' ')

  arr.forEach(s => {
    if (s.includes('/')) {
      inches += parseFraction(s)
    }
    else {
      const num = Number(s)
      if (!isNumber(num)) {
        throw new Error(INVALID_FORMAT_MSG)
      }
      inches += num
    }
  })

  return inches
}


/**
 * Parses a fraction and returns the decimal number representing the fraction.
 * For example, "1/4" would return 0.25
 * @throws an error if the string cannot be parsed as a fraction
 */
export function parseFraction (input?: string) {
  if (!input) return 0

  let str = replaceInchSymbolBySpace(input)

  if (!str.includes('/')) {
    throw new Error(INVALID_FORMAT_MSG)
  }

  const arr = str.split('/')
  const numerator = Number(arr[0])
  const denominator = Number(arr[1])

  if (!isNumber(numerator) || !isNumber(denominator)) {
    throw new Error(INVALID_FORMAT_MSG)
  }

  if (!denominator) {
    throw new Error('Divide by zero')
  }

  return numerator / denominator
}


/**
 * Standardize feet symbol to just a single quote.
 * First change two single-quotes to a double-quote so we don't confuse feet and inches symbols.
 */
function standardizeFeetSymbol (input: string) {
  return input
    .replaceAll('\'\'', '"')
    .replaceAll('feet', '\'')
    .replaceAll('foot', '\'')
    .replaceAll('ft', '\'')
    .trim()
}


/**
 * Replaces all inches symbols by spaces to help parse the string.
 */
function replaceInchSymbolBySpace (input: string) {
  return input
    .replaceAll('inches', ' ')
    .replaceAll('inch', ' ')
    .replaceAll('in', ' ')
    .replaceAll('"', ' ')
    .replaceAll('\'\'', ' ')
    .replaceAll('-', ' ')
    .trim()
}