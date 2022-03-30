const numeral = require('numeral')
import convert from 'convert'

const INVALID_FORMAT_MSG = 'Invalid format'


export type LengthUOM =
  'mm' |     // Millimeters allowing decimals (i.e. 3.4)
  'cm' |     // Centimeters allowing decimals (i.e. 3.4)
  'm' |      // Meters allowing decimals (i.e. 3.4)
  'in' |     // Inches allowing decimals (i.e. 3.4558)
  'ft'       // Feet allowing decimals (i.e. 3.4)

// The formats allowed for displaying a length
export type LengthDisplayFormat =
  'mm' |   // i.e. 3 mm
  'cm' |   // i.e. 3.4 cm
  'm' |    // i.e. 3.45 m
  'in' |   // Inches shown in the chosen InchDisplayFormat (i.e. 30.5" or 30-1/2")
  'ft' |   // Feet allowing decimals (i.e. 3.4')
  'ft_in'  // Whole number feet with inches in InchDisplayFormat (i.e. 5' 3.5" or 5' 3-1/2")

// The formats allowed for displaying inches in either decimal or fractions
export type InchDisplayFormat =
  'in' |     // Inches allowing decimals (i.e. 3.25)
  'in16' |   // Inches as fraction, 16ths of an inch (i.e. 3/16 or 1/4)
  'in32' |   // Inches as fraction, 32nds of an inch (i.e. 3/32 or 1/4)
  'in64'     // Inches as fraction, 64ths of an inch (i.3. 3/64 or 1/4)


/**
 * Gets the numerator for a fraction based on the given number and units to display.
 * If the given number is a whole number, then 0 is returned.
 * For 16ths, it is better to round glass sizes down to allow for cutting tolerance, but
 * for 32nds and 64ths, rounding up or down doesn't matter because cutting tolerance is 1/16.
 * @param {Number} num The decimal inches to get the fraction numerator for
 * @param {String} inchDisplay How to display inches
 * @returns {Number} The value for the numerator
 */
function getNumerator (num: number, inchDisplay: InchDisplayFormat) {
  // Get the fractional value beyond the decimal point (i.e. 3.25 would get 0.25)
  const fraction = num % 1
  if (!fraction) return 0
  switch (inchDisplay) {
    case 'in16':
      return Math.floor(fraction * 16)
    case 'in32':
      return Math.round(fraction * 32)
    case 'in64':
      return Math.round(fraction * 64)
    default:
      return 0
  }
}

/**
 * Gets the default denominator value based on the units to display.
 * @param {String} inchDisplay How to display inches
 * @returns {Number} The value for the denominator
 */
function getDenominatorValue (inchDisplay: InchDisplayFormat) {
  switch (inchDisplay) {
    case 'in16':
      return 16
    case 'in32':
      return 32
    case 'in64':
      return 64
    default:
      return 1
  }
}

/**
 * Reduces the fraction as much as possible, i.e. 4/16 becomes 1/4.
 * @param {Number} numerator The numerator of the fraction
 * @param {Number} denominator The denominator of the fraction
 * @returns {Object} An object with the numerator and denominator that have been reduced. 
 */
function reduceFraction (numerator: number, denominator: number) {
  while (numerator / 2 >= 1 && numerator % 2 === 0) {
    numerator = numerator / 2
    denominator = denominator / 2
  }
  return {
    numerator,
    denominator
  }
}

/**
 * Formats a number of inches for display as whole feet, ignoring any amount beyond the last whole foot.
 * @param {Number} length The number of inches to format
 * @param {LengthUOM} uom The units of the given length
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of feet
 */
export function formatWholeFeet (length: number, uom: LengthUOM = 'ft', showUnits?: boolean) {
  const ft = uom === 'ft'
    ? length
    : convert(length, uom).to('ft')
  const feet = Math.floor(ft)
  const units = showUnits ? '\'' : ''
  return numeral(feet).format('0,0') + units
}

/**
 * Formats the number of inches to be displayed as a fractional value.
 * For example, 3.25 would become "3 - 1/4".
 * @param {Number} inches The decimal inches to format
 * @param {LengthUOM} uom The units of the given length
 * @param {String} inchFormat How to display inches
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the fractional inches.
 */
export function formatFractionalInches (
  length: number,
  uom: LengthUOM = 'in',
  inchFormat: InchDisplayFormat = 'in16',
  showUnits?: boolean,
) {
  const inches = uom === 'in'
    ? length
    : convert(length, uom).to('in')

  const units = showUnits ? '"' : ''

  // If it's a whole number then there's no fraction to show
  if (Number.isInteger(inches)) {
    return numeral(inches).format('0,0') + units
  }

  let numerator = getNumerator(inches, inchFormat)
  let denominator = getDenominatorValue(inchFormat)

  // Reduce the fraction to the lowest common denominator (LCD)
  const pair = reduceFraction(numerator, denominator)
  numerator = pair.numerator
  denominator = pair.denominator

  const wholeInches = Math.floor(inches)
  let formattedWholeInches = wholeInches ? numeral(wholeInches).format('0,0') : ''

  // If numerator is zero then display it as a whole number
  if (!numerator) {
    return (formattedWholeInches || '0') + units
  }

  if (formattedWholeInches) {
    formattedWholeInches += '-'
  }

  // Otherwise display it with the fraction
  return `${formattedWholeInches}${numerator}/${denominator}${units}`
}


/**
 * Formats a length for display in feet and fractional inches.
 * If there are no inches to display then units are "ft", otherwise uses single quote.
 * For example: 3' 4-1/8"  -or-  4 ft
 * @param {Number} length The length to format
 * @param {LengthUOM} uom The units of the given length
 * @param {String} inchDisplay How to display inches
 * @returns {String} A formatted string with the number of inches
 */
export function formatFeetAndFractionalInches (length: number, uom: LengthUOM = 'in', inchDisplay: InchDisplayFormat = 'in16') {
  const totalInches = uom === 'in'
    ? length
    : convert(length, uom).to('in')

  // Count how many whole feet there are
  const wholeFeet = Math.floor(totalInches / 12)

  // Get the remaining length in inches (should be less than a foot, could be zero)
  const inches = totalInches - (wholeFeet * 12)

  // If there are no remaining inches, then just return the feet, ie: "3 ft"
  if (inches < 0.0001) {
    return formatWholeFeet(wholeFeet, 'ft') + ' ft'
  }

  // Otherwise return the fractional inches, along with the feet if any
  const feetStr = wholeFeet ? formatWholeFeet(wholeFeet, 'ft', true) : ''
  const inchesStr = formatFractionalInches(inches, 'in', inchDisplay, true)
  return feetStr ? `${feetStr} ${inchesStr}` : inchesStr
}


/**
 * Formats a length for display in feet and decimal inches.
 * If there are no inches to display then units are "ft", otherwise uses single quote.
 * For example: 3' 4.125"  -or-  4 ft
 * @param {Number} length The length to format
 * @param {LengthUOM} uom The units of the given length
 * @returns {String} A formatted string with the number of inches
 */
export function formatFeetAndDecimalInches (length: number, uom: LengthUOM = 'in') {
  const totalInches = uom === 'in'
    ? length
    : convert(length, uom).to('in')

  // Count how many whole feet there are
  const wholeFeet = Math.floor(totalInches / 12)

  // Get the remaining length in inches (should be less than a foot, could be zero)
  const inches = totalInches - (wholeFeet * 12)

  // If there are no remaining inches, then just return the feet, ie: 4 ft
  if (inches < 0.0001) {
    return formatWholeFeet(wholeFeet, 'ft') + ' ft'
  }

  // Otherwise return the decimal inches, along with the feet if any
  const feetStr = wholeFeet ? formatWholeFeet(wholeFeet, 'ft', true) : undefined
  const inchesStr = formatDecimalInches(inches, 'in', true)
  return feetStr ? `${feetStr} ${inchesStr}` : inchesStr
}


/**
 * Formats a length for display in inches, allowing up to 4 decimal places.
 * @param {Number} length The length to format
 * @param {LengthUOM} uom The units of the given length
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of inches
 */
export function formatDecimalInches (length: number, uom: LengthUOM = 'in', showUnits?: boolean) {
  const inches = uom === 'in'
    ? length
    : convert(length, uom).to('in')
  const units = showUnits ? '"' : ''
  return numeral(inches).format('0,0.[0000]') + units
}


/**
 * Formats a length for display in millimeters.
 * @param {Number} inches The length to display in millimeters
 * @param {LengthUOM} uom The units of the given length
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of millimeters
 */
export function formatMillimeters (length: number, uom: LengthUOM = 'mm', showUnits?: boolean) {
  const mm = uom === 'mm'
    ? length
    : convert(length, uom).to('mm')
  const unitStr = showUnits ? ' mm' : ''
  return numeral(mm).format('0,0') + unitStr
}


/**
 * Formats a length for display in centimeters, allowing up to 1 decimal place.
 * @param {Number} inches The length to display in centimeters
 * @param {LengthUOM} uom The units of the given length
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of centimeters
 */
export function formatCentimeters (length: number, uom: LengthUOM = 'cm', showUnits?: boolean) {
  const cm = uom === 'cm'
    ? length
    : convert(length, uom).to('cm')
  const unitStr = showUnits ? ' cm' : ''
  return numeral(cm).format('0,0.[0]') + unitStr
}


/**
 * Formats a length for display in meters, allowing up to 2 decimal places.
 * @param {Number} inches The length to display in meters
 * @param {LengthUOM} uom The units of the given length
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of meters
 */
export function formatMeters (length: number, uom: LengthUOM = 'm', showUnits?: boolean) {
  const m = uom === 'm'
    ? length
    : convert(length, uom).to('m')
  const unitStr = showUnits ? ' m' : ''
  return numeral(m).format('0,0.[00]') + unitStr
}


/**
 * Formats a length for display in the display format and units.
 * @param {Number} length The length to be formatted
 * @param {LengthUOM} uom The unit of measure for the given length
 * @param {LengthDisplayFormat} displayFormat The units to display, enums.LengthUOM
 * @param {InchDisplayFormat} inchFormat The display format for inches, if applicable
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string in the given unit of measure
 */
export function formatLength (
  length: number = 0,
  uom: LengthUOM = 'in',
  displayFormat: LengthDisplayFormat = 'in',
  inchFormat: InchDisplayFormat = 'in16',
  showUnits?: boolean,
) {
  switch (displayFormat) {
    case 'mm':
      return formatMillimeters(length, uom, showUnits)
    case 'cm':
      return formatCentimeters(length, uom, showUnits)
    case 'm':
      return formatMeters(length, uom, showUnits)
    case 'ft':
      return formatFeetDecimal(length, uom, showUnits)
    case 'ft_in':
      return inchFormat === 'in'
        ? formatFeetAndDecimalInches(length, uom)
        : formatFeetAndFractionalInches(length, uom, inchFormat)
    default: // Inches 'in'
      return inchFormat === 'in'
        ? formatDecimalInches(length, uom, showUnits)
        : formatFractionalInches(length, uom, inchFormat, showUnits)
  }
}


/**
 * Formats a number of feet for display with 2 decimal places and the units 'ft'.
 */
export function formatFeetDecimal (length: number, uom: LengthUOM = 'ft', showUnits?: boolean) {
  const ft = uom === 'ft'
    ? length
    : convert(length, uom).to('ft')
  const units = showUnits ? ' ft' : ''
  return numeral(ft).format('0,0.[00]') + units
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
 * @param input The input string to parse
 * @param targetUnit The units in which to return the input value; i.e. 'in' will return a value in inches
 * @param defaultUnit The units to use if no units are specified in the input string;
 *                    for example, the input "5" does not specify the units, defaultUnits of 'mm' would
 *                    assume the input is 5 millimeters, which would then be converted to the targetUnit
 * @returns The length as a decimal number in the target units
 * @throws an error if the string format cannot be parsed
 */
export function parseLength (input?: string, targetUnit: LengthUOM = 'in', defaultUnit?: LengthUOM) {
  if (!input) {
    return 0
  }

  // If no default unit is specified then use the target units as default
  if (!defaultUnit) {
    defaultUnit = targetUnit
  }

  if (input.includes('feet') || input.includes('foot') || input.includes('ft') || input.includes('\'') || input.includes('in') || input.includes('"')) {
    const inches = parseInchesAndFeet(input, defaultUnit)
    return convert(inches, 'in').to(targetUnit)
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
    return convert(m, 'm').to(targetUnit)
  }
  else {
    // No units were specified, so try to parse as a number
    const num = Number(input.replaceAll(',', '').trim())
    if (isNumber(num)) {
      if (defaultUnit === 'ft' && targetUnit === 'in') {
        return num * 12  // Workaround for floating point problem with convert library
      }
      return convert(num, defaultUnit).to(targetUnit)
    }
  }

  throw new Error(INVALID_FORMAT_MSG)
}


export function parseMeters (input?: string) {
  if (!input) return 0
  const str = input
    .replaceAll('meters', '')
    .replaceAll('meter', '')
    .replaceAll('m', '')
    .replaceAll(',', '')
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
    .replaceAll(',', '')
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
    .replaceAll(',', '')
    .trim()
  const num = Number(str)
  if (isNumber(num)) {
    return num
  }
  throw new Error(INVALID_FORMAT_MSG)
}


/**
 * Parse a string containing feet and/or inches to return the number of inches.
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
export function parseInchesAndFeet (input?: string, defaultUnit: LengthUOM = 'in') {
  if (!input) return 0

  // Strip out any comma separators
  input = input.replaceAll(',', '')

  // Check if input is just a number with no units
  const num = Number(input)
  if (isNumber(num)) {
    return defaultUnit === 'ft' ? num * 12 : num
  }

  let str = standardizeFeetSymbol(input)
  str = replaceInchSymbolBySpace(str)

  let feet = 0
  const indexFeetSymbol = str.indexOf('\'')

  // If the input contains feet then parse the feet
  if (indexFeetSymbol !== -1) {
    const s = str.substring(0, indexFeetSymbol)
    feet = parseFeet(s)
  }

  // Find the substring containing just the inches; this will be entire string if no feet are given
  let strInches = str
  if (indexFeetSymbol !== -1) {
    strInches = (indexFeetSymbol + 1 < str.length)
      ? str.substring(indexFeetSymbol + 1)
      : ''
  }

  // Convert result to inches
  return parseInches(strInches) + (feet * 12)
}


/**
 * Parses a string containing feet and returns the number of feet.
 * Note that the string may also contain inches after the feet but only the feet number will be returned.
 */
export function parseFeet (input?: string) {
  if (!input) return 0

  let str = standardizeFeetSymbol(input)
    .replaceAll(',', '')

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
    .replaceAll(',', '')

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
    .replaceAll(',', '')

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