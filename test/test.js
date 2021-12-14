const expect = require('chai').expect
const { parseInches, parseFraction } = require('../dist/index')


describe('test parseFraction()', () => {
  it('should return 0 when input is undefined', () => {
    const result = parseFraction()
    expect(result).to.equal(0)
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