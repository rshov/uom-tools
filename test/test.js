const expect = require('chai').expect
const {
  parseFeet,
  parseInches,
  parseFraction,
  parseMillimeters,
  parseCentimeters,
  parseMeters,
  parseLength
} = require('../dist/index')


describe('test parseFraction()', () => {
  it('should return 0 when input is undefined', () => {
    const result = parseFraction()
    expect(result).to.equal(0)
  })
  it('should throw error when input is a letter', () => {
    expect(() => parseFraction('a')).to.throw()
  })
  it('should throw exception when input does not contain a forward slash', () => {
    expect(() => parseFraction('5')).to.throw()
  })
  it('should throw exception when denominator is zero', () => {
    expect(() => parseFraction('5/0')).to.throw()
  })
  it('should return number when input is a fraction', () => {
    const result = parseFraction('1/4')
    expect(result).to.equal(0.25)
  })
  it('should return number when input is a fraction', () => {
    const result = parseFraction('5/250')
    expect(result).to.equal(0.02)
  })
  it('should return number when fraction is larger than 1', () => {
    const result = parseFraction('200/5')
    expect(result).to.equal(40)
  })
  it('should return 0 when numerator is zero', () => {
    const result = parseFraction('0/5')
    expect(result).to.equal(0)
  })
  it('should return number when input has double quotes after fraction', () => {
    const result = parseFraction('1/4"')
    expect(result).to.equal(0.25)
  })
  it('should return number when input has space before or after fraction', () => {
    const result = parseFraction(' 1/4 "')
    expect(result).to.equal(0.25)
  })
})


describe('test parseInches()', () => {
  it('should return 0 when input is undefined', () => {
    const result = parseInches()
    expect(result).to.equal(0)
  })
  it('should throw error when input is a letter', () => {
    expect(() => parseInches('a')).to.throw()
  })
  it('should parse a string with just a number', () => {
    const result = parseInches('5')
    expect(result).to.equal(5)
  })
  it('should parse a string with just a decimal number', () => {
    const result = parseInches('5.25')
    expect(result).to.equal(5.25)
  })
  it('should parse a large number', () => {
    const result = parseInches('1000')
    expect(result).to.equal(1000)
  })
  it('should parse a string with a number and double quote', () => {
    const result = parseInches('5.25"')
    expect(result).to.equal(5.25)
  })
  it('should parse a string with a number and two single quotes', () => {
    const result = parseInches('5.25\'\'')
    expect(result).to.equal(5.25)
  })
  it('should parse a number containing "in"', () => {
    const result = parseInches('5.25in')
    expect(result).to.equal(5.25)
  })
  it('should parse a number containing "in" with a space before it', () => {
    const result = parseInches('5.25 in')
    expect(result).to.equal(5.25)
  })
  it('should parse a number containing "inch"', () => {
    const result = parseInches('5.25inch')
    expect(result).to.equal(5.25)
  })
  it('should parse a number containing "inch" with a space before it', () => {
    const result = parseInches('5.25 inch')
    expect(result).to.equal(5.25)
  })
  it('should parse a number containing "inches"', () => {
    const result = parseInches('5.25inches')
    expect(result).to.equal(5.25)
  })
  it('should parse a number containing "inches" with a space before it', () => {
    const result = parseInches('5.25 inches')
    expect(result).to.equal(5.25)
  })
  it('should parse a fraction by itself', () => {
    const result = parseInches('1/4')
    expect(result).to.equal(0.25)
  })
  it('should parse a fraction with double quote', () => {
    const result = parseInches('1/4"')
    expect(result).to.equal(0.25)
  })
  it('should parse a fraction with two single quotes', () => {
    const result = parseInches('1/4\'\'')
    expect(result).to.equal(0.25)
  })
  it('should parse a fraction with "in"', () => {
    const result = parseInches('1/4in')
    expect(result).to.equal(0.25)
  })
  it('should parse a fraction with "in" and a space before it', () => {
    const result = parseInches('1/4 in')
    expect(result).to.equal(0.25)
  })
  it('should parse a fraction with "in" and a space before it', () => {
    const result = parseInches('1/4 in')
    expect(result).to.equal(0.25)
  })
  it('should parse a fraction with "inch"', () => {
    const result = parseInches('1/4 inch')
    expect(result).to.equal(0.25)
  })
  it('should parse a fraction with "inches"', () => {
    const result = parseInches('1/4 inches')
    expect(result).to.equal(0.25)
  })
  it('should parse a number and a fraction separated by hash "-"', () => {
    const result = parseInches('5-1/4')
    expect(result).to.equal(5.25)
  })
  it('should parse a number and a fraction separated by hash "-" followed by double quote', () => {
    const result = parseInches('50-1/4"')
    expect(result).to.equal(50.25)
  })
  it('should parse a number and a fraction separated by hash "-" followed by two single quotes', () => {
    const result = parseInches('5-1/4\'\'')
    expect(result).to.equal(5.25)
  })
  it('should parse a number and a fraction separated by a space', () => {
    const result = parseInches('5 1/4')
    expect(result).to.equal(5.25)
  })
  it('should parse a number and a fraction separated by a space followed by double quote', () => {
    const result = parseInches('5 1/4"')
    expect(result).to.equal(5.25)
  })
  it('should parse a number and a fraction separated by a space followed by two single quotes', () => {
    const result = parseInches('5 1/4\'\'')
    expect(result).to.equal(5.25)
  })
})


describe('test parseFeet()', () => {
  it('should return 0 when input is undefined', () => {
    const result = parseFeet()
    expect(result).to.equal(0)
  })
  it('should throw error when input is a letter', () => {
    expect(() => parseFeet('a')).to.throw()
  })
  it('should parse a string with just a number', () => {
    const result = parseFeet('5')
    expect(result).to.equal(5)
  })
  it('should parse a string with a number and spaces', () => {
    const result = parseFeet(' 5 ')
    expect(result).to.equal(5)
  })
  it('should parse a number with a decimal', () => {
    const result = parseFeet('5.3')
    expect(result).to.equal(5.3)
  })
  it('should parse a number with a single quote', () => {
    const result = parseFeet('5\'')
    expect(result).to.equal(5)
  })
  it('should parse a number with a single quote after a space', () => {
    const result = parseFeet('5 \'')
    expect(result).to.equal(5)
  })
  it('should parse a number with "ft"', () => {
    const result = parseFeet('5ft')
    expect(result).to.equal(5)
  })
  it('should parse a number with "ft" after a space', () => {
    const result = parseFeet('5 ft')
    expect(result).to.equal(5)
  })
  it('should parse a number with "feet"', () => {
    const result = parseFeet('5feet')
    expect(result).to.equal(5)
  })
  it('should parse a number with "feet" after a space', () => {
    const result = parseFeet('5 feet')
    expect(result).to.equal(5)
  })
  it('should parse a number with "foot"', () => {
    const result = parseFeet('5foot')
    expect(result).to.equal(5)
  })
  it('should parse a number with "foot after a space', () => {
    const result = parseFeet('5 foot')
    expect(result).to.equal(5)
  })
  it('should throw an error when there are inches but no feet', () => {
    expect(() => parseFeet('10"')).to.throw()
  })
})


describe('test parseMillimeters()', () => {
  it('should return 0 when input is undefined', () => {
    const result = parseMillimeters()
    expect(result).to.equal(0)
  })
  it('should throw error when input is a letter', () => {
    expect(() => parseMillimeters('a')).to.throw()
  })
  it('should parse a string with just a number', () => {
    const result = parseMillimeters('5')
    expect(result).to.equal(5)
  })
  it('should parse a string with a number and spaces', () => {
    const result = parseMillimeters(' 5 ')
    expect(result).to.equal(5)
  })
  it('should parse a number with a decimal', () => {
    const result = parseMillimeters('5.3')
    expect(result).to.equal(5.3)
  })
  it('should parse a number with "mm"', () => {
    const result = parseMillimeters('5mm')
    expect(result).to.equal(5)
  })
  it('should parse a number with "mm" and a space', () => {
    const result = parseMillimeters('5 mm')
    expect(result).to.equal(5)
  })
  it('should parse a number with "millimeter"', () => {
    const result = parseMillimeters('5millimeter')
    expect(result).to.equal(5)
  })
  it('should parse a number with "millimeter" after a space', () => {
    const result = parseMillimeters('5 millimeter')
    expect(result).to.equal(5)
  })
  it('should parse a number with "millimeters"', () => {
    const result = parseMillimeters('5millimeters')
    expect(result).to.equal(5)
  })
  it('should parse a number with "millimeters" after a space', () => {
    const result = parseMillimeters('5 millimeters')
    expect(result).to.equal(5)
  })
})


describe('test parseCentimeters()', () => {
  it('should return 0 when input is undefined', () => {
    const result = parseCentimeters()
    expect(result).to.equal(0)
  })
  it('should throw error when input is a letter', () => {
    expect(() => parseCentimeters('a')).to.throw()
  })
  it('should parse a string with just a number', () => {
    const result = parseCentimeters('5')
    expect(result).to.equal(5)
  })
  it('should parse a string with a number and spaces', () => {
    const result = parseCentimeters(' 5 ')
    expect(result).to.equal(5)
  })
  it('should parse a number with a decimal', () => {
    const result = parseCentimeters('5.3')
    expect(result).to.equal(5.3)
  })
  it('should parse a number with "cm"', () => {
    const result = parseCentimeters('5cm')
    expect(result).to.equal(5)
  })
  it('should parse a number with "cm" and a space', () => {
    const result = parseCentimeters('5 cm')
    expect(result).to.equal(5)
  })
  it('should parse a number with "centimeter"', () => {
    const result = parseCentimeters('5centimeter')
    expect(result).to.equal(5)
  })
  it('should parse a number with "centimeter" after a space', () => {
    const result = parseCentimeters('5 centimeter')
    expect(result).to.equal(5)
  })
  it('should parse a number with "centimeters"', () => {
    const result = parseCentimeters('5centimeters')
    expect(result).to.equal(5)
  })
  it('should parse a number with "centimeters" after a space', () => {
    const result = parseCentimeters('5 centimeters')
    expect(result).to.equal(5)
  })
})


describe('test parseMeters()', () => {
  it('should return 0 when input is undefined', () => {
    const result = parseMeters()
    expect(result).to.equal(0)
  })
  it('should throw error when input is a letter', () => {
    expect(() => parseMeters('a')).to.throw()
  })
  it('should parse a string with just a number', () => {
    const result = parseMeters('5')
    expect(result).to.equal(5)
  })
  it('should parse a string with a number and spaces', () => {
    const result = parseMeters(' 5 ')
    expect(result).to.equal(5)
  })
  it('should parse a number with a decimal', () => {
    const result = parseMeters('5.3')
    expect(result).to.equal(5.3)
  })
  it('should parse a number with "m"', () => {
    const result = parseMeters('5m')
    expect(result).to.equal(5)
  })
  it('should parse a number with "m" and a space', () => {
    const result = parseMeters('5 m')
    expect(result).to.equal(5)
  })
  it('should parse a number with "meter"', () => {
    const result = parseMeters('5meter')
    expect(result).to.equal(5)
  })
  it('should parse a number with "meter" after a space', () => {
    const result = parseMeters('5 meter')
    expect(result).to.equal(5)
  })
  it('should parse a number with "meters"', () => {
    const result = parseMeters('5meters')
    expect(result).to.equal(5)
  })
  it('should parse a number with "meters" after a space', () => {
    const result = parseMeters('5 meters')
    expect(result).to.equal(5)
  })
})


describe('test parseLength()', () => {
  it('should return 0 when input is undefined', () => {
    const result = parseLength()
    expect(result).to.equal(0)
  })
  it('should throw error when input is a letter', () => {
    expect(() => parseLength('a')).to.throw()
  })
  it('should parse a string with just a number', () => {
    const result = parseLength('5')
    expect(result).to.equal(5)
  })
  it('should parse a string with a number and spaces', () => {
    const result = parseLength(' 5 ')
    expect(result).to.equal(5)
  })
  it('should parse a number with a decimal', () => {
    const result = parseLength('5.3')
    expect(result).to.equal(5.3)
  })
  it('should parse a number with "m"', () => {
    const result = parseLength('5 m', 'm')
    expect(result).to.equal(5)
  })
  it('should parse a number with "cm"', () => {
    const result = parseLength('5 cm', 'cm')
    expect(result).to.equal(5)
  })
  it('should parse a number with "mm"', () => {
    const result = parseLength('5 mm', 'mm')
    expect(result).to.equal(5)
  })
  it('should parse a number with feet (single quote)', () => {
    const result = parseLength('5 \'', 'ft')
    expect(result).to.equal(5)
  })
  it('should parse a number with feet "ft"', () => {
    const result = parseLength('5 ft', 'ft')
    expect(result).to.equal(5)
  })
  it('should parse a number with inches (double quote)', () => {
    const result = parseLength('5"', 'in')
    expect(result).to.equal(5)
  })
  it('should parse a number with inches "in"', () => {
    const result = parseLength('5 in', 'in')
    expect(result).to.equal(5)
  })
  it('should parse feet and inches using quotes and return inches', () => {
    const result = parseLength('5\' 3"', 'in')
    expect(result).to.equal(63)
  })
  it('should parse feet and inches and a fraction using quotes and return inches', () => {
    const result = parseLength('5\' 3-1/2"', 'in')
    expect(result).to.equal(63.5)
  })
  it('should parse feet and inches using quotes and return feet', () => {
    const result = parseLength('5\' 3"', 'ft')
    expect(result).to.equal(5.25)
  })
  it('should parse feet and inches and a fraction using quotes and return feet', () => {
    const result = parseLength('5\' 3-3/4"', 'ft')
    expect(result).to.equal(5.3125)
  })
  it('should convert mm to in', () => {
    const result = parseLength('254 mm', 'in')
    expect(result).to.equal(10)
  })
  it('should convert in to mm', () => {
    const result = parseLength('10"', 'mm')
    expect(result).to.equal(254)
  })
  it('should convert mm to cm', () => {
    const result = parseLength('100 mm', 'cm')
    expect(result).to.equal(10)
  })
  it('should convert cm to meters', () => {
    const result = parseLength('150 cm', 'm')
    expect(result).to.equal(1.5)
  })
  it('should convert inches to feet', () => {
    const result = parseLength('30 in', 'ft')
    expect(result).to.equal(2.5)
  })
  it('should convert feet to inches', () => {
    const result = parseLength('2.5 ft', 'in')
    expect(result).to.equal(30)
  })
})