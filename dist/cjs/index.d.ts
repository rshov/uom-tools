export type LengthUOM = "mm" | "cm" | "m" | "in" | "ft";
export type LengthDisplayFormat = "mm" | "cm" | "m" | "in" | "ft" | "ft_in";
export type InchDisplayFormat = "in" | "in16" | "in32" | "in64";
export type VolumeUnitOfMeasure = "mL" | "oz";
export declare const LengthUOMs: LengthUOM[];
export declare const LengthDisplayFormats: LengthDisplayFormat[];
export declare const InchDisplayFormats: InchDisplayFormat[];
export declare const VolumeUnitOfMeasures: VolumeUnitOfMeasure[];
/**
 * Formats a number of inches for display as whole feet, ignoring any amount beyond the last whole foot.
 * @param {Number} length The number of inches to format
 * @param {LengthUOM} uom The units of the given length
 * @param {Boolean | String} units Whether to include the unit of measure in the formatted string, or the units string to use
 * @returns {String} A formatted string with the number of feet
 */
export declare function formatWholeFeet(length: number, uom?: LengthUOM, units?: boolean | string): string;
/**
 * Formats the number of inches to be displayed as a fractional value.
 * For example, 3.25 would become "3 - 1/4".
 * @param {Number} inches The decimal inches to format
 * @param {LengthUOM} uom The units of the given length
 * @param {String} inchFormat How to display inches
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the fractional inches.
 */
export declare function formatFractionalInches(length: number, uom?: LengthUOM, inchFormat?: InchDisplayFormat, showUnits?: boolean): string;
/**
 * Formats a length for display in feet and fractional inches.
 * If there are no inches to display then units are "ft", otherwise uses single quote.
 * For example: 3' 4-1/8"  -or-  4 ft
 * @param {Number} length The length to format
 * @param {LengthUOM} uom The units of the given length
 * @param {String} inchDisplay How to display inches
 * @returns {String} A formatted string with the number of inches
 */
export declare function formatFeetAndFractionalInches(length: number, uom?: LengthUOM, inchDisplay?: InchDisplayFormat): string;
/**
 * Formats a length for display in feet and decimal inches.
 * If there are no inches to display then units are "ft", otherwise uses single quote.
 * For example: 3' 4.125"  -or-  4 ft
 * @param {Number} length The length to format
 * @param {LengthUOM} uom The units of the given length
 * @returns {String} A formatted string with the number of inches
 */
export declare function formatFeetAndDecimalInches(length: number, uom?: LengthUOM): string;
/**
 * Formats a length for display in inches, allowing up to 4 decimal places.
 * @param {Number} length The length to format
 * @param {LengthUOM} uom The units of the given length
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of inches
 */
export declare function formatDecimalInches(length: number, uom?: LengthUOM, showUnits?: boolean): string;
/**
 * Formats a length for display in millimeters.
 * @param {Number} inches The length to display in millimeters
 * @param {LengthUOM} uom The units of the given length
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of millimeters
 */
export declare function formatMillimeters(length: number, uom?: LengthUOM, showUnits?: boolean): string;
/**
 * Formats a length for display in centimeters, allowing up to 1 decimal place.
 * @param {Number} inches The length to display in centimeters
 * @param {LengthUOM} uom The units of the given length
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of centimeters
 */
export declare function formatCentimeters(length: number, uom?: LengthUOM, showUnits?: boolean): string;
/**
 * Formats a length for display in meters, allowing up to 2 decimal places.
 * @param {Number} inches The length to display in meters
 * @param {LengthUOM} uom The units of the given length
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string with the number of meters
 */
export declare function formatMeters(length: number, uom?: LengthUOM, showUnits?: boolean): string;
/**
 * Formats a length for display in the display format and units.
 * @param {Number} length The length to be formatted
 * @param {LengthUOM} uom The unit of measure for the given length
 * @param {LengthDisplayFormat} displayFormat The units to display, LengthUOM
 * @param {InchDisplayFormat} inchFormat The display format for inches, if applicable
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string in the given unit of measure
 */
export declare function formatLength(length?: number, uom?: LengthUOM, displayFormat?: LengthDisplayFormat, inchFormat?: InchDisplayFormat, showUnits?: boolean): string;
/**
 * Formats a number of feet for display with 2 decimal places and the units 'ft'.
 */
export declare function formatFeetDecimal(length: number, uom?: LengthUOM, showUnits?: boolean): string;
/**
 * Formats a volume for display in mL or fluid ounces.
 * @param {Number} mL The number of milliliters to display
 * @param {String} unitOfMeasure The units to display, VolumeUnitOfMeasure
 * @param {Boolean} showUnits Whether to include the unit of measure in the formatted string
 * @returns {String} A formatted string in the given unit of measure
 */
export declare function formatVolume(mL: number, unitOfMeasure: VolumeUnitOfMeasure, showUnits: boolean): string;
/**
 * Parses a string and returns a volume in mL or fluid ounces.
 * Supports parsing volumes with unit indicators like "100 mL" or "10 oz".
 * @param input The input string to parse
 * @param unitOfMeasure The units to use, VolumeUnitOfMeasure
 * @returns The volume as a decimal number in the given units
 * @throws an error if the string format cannot be parsed
 */
export declare function parseVolume(input: string, unitOfMeasure?: VolumeUnitOfMeasure): number;
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
export declare function parseLength(input?: string, targetUnit?: LengthUOM, defaultUnit?: LengthUOM): number;
export declare function parseMeters(input?: string): number;
export declare function parseCentimeters(input?: string): number;
export declare function parseMillimeters(input?: string): number;
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
export declare function parseInchesAndFeet(input?: string, defaultUnit?: LengthUOM): number;
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
//# sourceMappingURL=index.d.ts.map