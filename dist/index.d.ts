export declare type LengthUOM = 'mm' | // Millimeters allowing decimals (i.e. 3.4)
'cm' | // Centimeters allowing decimals (i.e. 3.4)
'm' | // Meters allowing decimals (i.e. 3.4)
'in' | // Inches allowing decimals (i.e. 3.4558)
'ft';
export declare type LengthDisplayFormat = 'mm' | // i.e. 3 mm
'cm' | // i.e. 3.4 cm
'm' | // i.e. 3.45 m
'in' | // Inches shown in the chosen InchDisplayFormat (i.e. 30.5" or 30-1/2")
'ft' | // Feet allowing decimals (i.e. 3.4')
'ft_in';
export declare type InchDisplayFormat = 'in' | // Inches allowing decimals (i.e. 3.25)
'in16' | // Inches as fraction, 16ths of an inch (i.e. 3/16 or 1/4)
'in32' | // Inches as fraction, 32nds of an inch (i.e. 3/32 or 1/4)
'in64';
/**
 * Formats a number of inches for display as whole feet, ignoring any amount beyond the last whole foot.
 * @param {Number} inches The number of inches to format
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of feet
 */
export declare function formatWholeFeet(inches: number, showUnits?: boolean): string;
/**
 * Formats the number of inches to be displayed as a fractional value.
 * For example, 3.25 would become "3 - 1/4".
 * @param {Number} inches The decimal inches to format
 * @param {String} inchFormat How to display inches
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the fractional inches.
 */
export declare function formatFractionalInches(inches: number, inchFormat?: InchDisplayFormat, showUnits?: boolean): string;
/**
 * Formats a length for display in feet and fractional inches.
 * If there are no inches to display then units are "ft", otherwise uses single quote.
 * For example: 3' 4-1/8"  -or-  4 ft
 * @param {Number} inches The length in inches to format
 * @param {String} inchDisplay How to display inches
 * @returns {String} A formatted string with the number of inches
 */
export declare function formatFeetAndFractionalInches(totalInches: number, inchDisplay?: InchDisplayFormat): string;
/**
 * Formats a length for display in feet and decimal inches.
 * If there are no inches to display then units are "ft", otherwise uses single quote.
 * For example: 3' 4.125"  -or-  4 ft
 * @param {Number} inches The length in inches to format
 * @returns {String} A formatted string with the number of inches
 */
export declare function formatFeetAndDecimalInches(totalInches: number): string;
/**
 * Formats a length for display in inches, allowing up to 4 decimal places.
 * @param {Number} inches The number of inches to format
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of inches
 */
export declare function formatDecimalInches(inches: number, showUnits?: boolean): string;
/**
 * Formats a length for display in millimeters.
 * @param {Number} inches The number of inches to display in millimeters
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of millimeters
 */
export declare function formatMillimeters(inches: number, showUnits?: boolean): string;
/**
 * Formats a length for display in centimeters, allowing up to 1 decimal place.
 * @param {Number} inches The number of inches to display in centimeters
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of centimeters
 */
export declare function formatCentimeters(inches: number, showUnits?: boolean): string;
/**
 * Formats a length for display in meters, allowing up to 2 decimal places.
 * @param {Number} inches The number of inches to display in meters
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of meters
 */
export declare function formatMeters(inches: number, showUnits?: boolean): string;
/**
 * Formats a length for display in the given unit of measure.
 * @param {Number} inches The number of inches to be formatted
 * @param {String} lengthFormat The units to display, enums.LengthUOM
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @param {Boolean} allowFeet (n/a for metric units); true to show feet and inches, false for only inches
 * @returns {String} A formatted string in the given unit of measure
 */
export declare function formatLength(inches?: number, lengthFormat?: LengthDisplayFormat, inchFormat?: InchDisplayFormat, showUnits?: boolean): string;
/**
 * Formats a number of feet for display with 2 decimal places and the units 'ft'.
 */
export declare function formatFeetDecimal(feet?: number, showUnits?: boolean): string;
/**
 * Parses a string and returns a length in the target units, or inches if not specified.
 * Supports parsing lengths in millimeters, centimeters, meters, feet and inches (fractional or decimal).
 * @returns The length as a decimal number in the target units
 * @throws an error if the string format cannot be parsed
 */
export declare function parseLength(input?: string, targetUnit?: LengthUOM): number;
export declare function parseMeters(input?: string): number;
export declare function parseCentimeters(input?: string): number;
export declare function parseMillimeters(input?: string): number;
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
export declare function parseInchesAndFeet(input?: string): number;
/**
 * Parses a string containing feet and returns the number of feet.
 * Note that the string may also contain inches after the feet but only the feet number will be returned.
 */
export declare function parseFeet(input?: string): number;
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
export declare function parseInches(input?: string): number;
/**
 * Parses a fraction and returns the decimal number representing the fraction.
 * For example, "1/4" would return 0.25
 * @throws an error if the string cannot be parsed as a fraction
 */
export declare function parseFraction(input?: string): number;
