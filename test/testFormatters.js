const expect = require('chai').expect
const {
  formatFractionalInches,
  formatFeetAndFractionalInches,
  formatFeetAndDecimalInches,
  formatDecimalInches,
  formatFeetDecimal,
} = require('../dist/index')


describe('test formatFractionalInches()', () => {
  it('should format 0 as 0', () => {
    expect(formatFractionalInches(0, 'in16')).to.equal('0')
    expect(formatFractionalInches(0, 'in32')).to.equal('0')
    expect(formatFractionalInches(0, 'in64')).to.equal('0')
  })
  it('should format 0.25 as 1/4', () => {
    expect(formatFractionalInches(0.25, 'in16')).to.equal('1/4')
    expect(formatFractionalInches(0.25, 'in32')).to.equal('1/4')
    expect(formatFractionalInches(0.25, 'in64')).to.equal('1/4')
  })
  it('should format 0.1875 as 3/16 (reduces 6/32 and 12/64)', () => {
    expect(formatFractionalInches(0.1875, 'in16')).to.equal('3/16')
    expect(formatFractionalInches(0.1875, 'in32')).to.equal('3/16')
    expect(formatFractionalInches(0.1875, 'in64')).to.equal('3/16')
  })
  it('should format 3/32 and 3/64', () => {
    expect(formatFractionalInches(0.09375, 'in32')).to.equal('3/32')
    expect(formatFractionalInches(0.046875, 'in64')).to.equal('3/64')
  })
  it('should round to nearest', () => {
    expect(formatFractionalInches(0.19, 'in16')).to.equal('3/16')
    expect(formatFractionalInches(0.09, 'in32')).to.equal('3/32')
    expect(formatFractionalInches(0.04, 'in64')).to.equal('3/64')
  })
  it('should include units', () => {
    expect(formatFractionalInches(0.25, 'in16', true)).to.equal('1/4"')
    expect(formatFractionalInches(0.25, 'in32', true)).to.equal('1/4"')
    expect(formatFractionalInches(0.25, 'in64', true)).to.equal('1/4"')
  })
})


describe('test formatFeetAndFractionalInches()', () => {
  it('should format 0', () => {
    expect(formatFeetAndFractionalInches(0, 'in16')).to.equal('0 ft')
    expect(formatFeetAndFractionalInches(0, 'in32')).to.equal('0 ft')
    expect(formatFeetAndFractionalInches(0, 'in64')).to.equal('0 ft')
  })
  it('should format as only inches when there are no feet', () => {
    expect(formatFeetAndFractionalInches(0.25, 'in16')).to.equal('1/4"')
    expect(formatFeetAndFractionalInches(0.25, 'in32')).to.equal('1/4"')
    expect(formatFeetAndFractionalInches(0.25, 'in64')).to.equal('1/4"')
  })
  it('should format as whole feet with units "ft" when no inches', () => {
    expect(formatFeetAndFractionalInches(36, 'in16')).to.equal('3 ft')
    expect(formatFeetAndFractionalInches(36, 'in32')).to.equal('3 ft')
    expect(formatFeetAndFractionalInches(36, 'in64')).to.equal('3 ft')
  })
  it('should format as feet and whole inches', () => {
    expect(formatFeetAndFractionalInches(38, 'in16')).to.equal('3\' 2"')
    expect(formatFeetAndFractionalInches(38, 'in32')).to.equal('3\' 2"')
    expect(formatFeetAndFractionalInches(38, 'in64')).to.equal('3\' 2"')
  })
  it('should format as feet and fractional inches', () => {
    expect(formatFeetAndFractionalInches(38.5, 'in16')).to.equal('3\' 2-1/2"')
    expect(formatFeetAndFractionalInches(38.5, 'in32')).to.equal('3\' 2-1/2"')
    expect(formatFeetAndFractionalInches(38.5, 'in64')).to.equal('3\' 2-1/2"')
  })
})


describe('test formatFeetAndDecimalInches()', () => {
  it('should format 0', () => {
    expect(formatFeetAndDecimalInches(0, 'in')).to.equal('0 ft')
  })
  it('should format as only inches when there are no feet', () => {
    expect(formatFeetAndDecimalInches(0.25, 'in')).to.equal('0.25"')
  })
  it('should format as whole feet with units "ft" when no inches', () => {
    expect(formatFeetAndDecimalInches(36, 'in')).to.equal('3 ft')
  })
  it('should format as feet and whole inches', () => {
    expect(formatFeetAndDecimalInches(38, 'in')).to.equal('3\' 2"')
  })
  it('should format as feet and fractional inches', () => {
    expect(formatFeetAndDecimalInches(38.5, 'in')).to.equal('3\' 2.5"')
  })
})


describe('test formatDecimalInches()', () => {
  it('should format 0', () => {
    expect(formatDecimalInches(0)).to.equal('0')
  })
  it('should format whole number', () => {
    expect(formatDecimalInches(5)).to.equal('5')
  })
  it('should format with comma for thousands', () => {
    expect(formatDecimalInches(5000)).to.equal('5,000')
  })
  it('should format 1 decimal place', () => {
    expect(formatDecimalInches(0.2)).to.equal('0.2')
  })
  it('should format 2 decimal places', () => {
    expect(formatDecimalInches(0.25)).to.equal('0.25')
  })
  it('should format to max 4 decimal places', () => {
    expect(formatDecimalInches(0.25678)).to.equal('0.2568')
  })
  it('should format with units "', () => {
    expect(formatDecimalInches(5, true)).to.equal('5"')
    expect(formatDecimalInches(0.5, true)).to.equal('0.5"')
  })
})


describe('test formatFeetDecimal()', () => {
  it('should format 0', () => {
    expect(formatFeetDecimal(0)).to.equal('0')
  })
  it('should format whole number', () => {
    expect(formatFeetDecimal(5)).to.equal('5')
  })
  it('should format with comma for thousands', () => {
    expect(formatFeetDecimal(5000)).to.equal('5,000')
  })
  it('should format 1 decimal place', () => {
    expect(formatFeetDecimal(0.2)).to.equal('0.2')
  })
  it('should format 2 decimal places', () => {
    expect(formatFeetDecimal(0.25)).to.equal('0.25')
  })
  it('should format to max 2 decimal places', () => {
    expect(formatFeetDecimal(0.25678)).to.equal('0.26')
  })
  it('should format with units "ft"', () => {
    expect(formatFeetDecimal(5, true)).to.equal('5 ft')
    expect(formatFeetDecimal(0.5, true)).to.equal('0.5 ft')
  })
})

  //TODO
// describe('test formatWholeFeet()', () => {
// describe('test formatFeetDecimal()', () => {
// describe('test formatMillimeters()', () => {
// describe('test formatCentimeters()', () => {
// describe('test formatMeters()', () => {
// describe('test formatLength()', () => {
