/**
 * Formats a number of feet for display with 2 decimal places and the units 'ft'.
 */
export declare function formatFeetDecimal(feet?: number): string;
/**
 * Formats a number of inches for display as millimeters.
 */
export declare function formatMillimeters(inches?: number): string;
/**
 * Formats a number of inches for display as centimeters.
 */
export declare function formatCentimeters(inches?: number): string;
/**
 * Formats a number of watts for display with no decimal places and the units 'W'.
 */
export declare function formatWatts(watts?: number, hideUnits?: boolean): string;
/**
 * Parses a string and returns a length in the target units, or inches if not specified.
 * Supports parsing lengths in millimeters, centimeters, meters, feet and inches (fractional or decimal).
 * @returns The length as a decimal number in the target units
 * @throws an error if the string format cannot be parsed
 */
export declare function parseLength(input?: string, targetUnit?: 'mm' | 'cm' | 'm' | 'in' | 'ft'): number;
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
export declare function parseInchesAndFeet(input?: string, targetUnit?: 'ft' | 'in'): number;
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
