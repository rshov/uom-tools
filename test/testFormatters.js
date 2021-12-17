const expect = require('chai').expect
const {
  formatFractionalInches,
  formatFeetAndFractionalInches,
  formatFeetAndDecimalInches,
  formatDecimalInches,
  formatFeetDecimal,
  formatWholeFeet,
  formatMillimeters,
  formatCentimeters,
  formatMeters,
  formatLength
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


describe('test formatWholeFeet()', () => {
  it('should format 0', () => {
    expect(formatWholeFeet(0)).to.equal('0')
  })
  it('should format whole number', () => {
    expect(formatWholeFeet(24)).to.equal('2')
  })
  it('should format with comma for thousands', () => {
    expect(formatWholeFeet(12000)).to.equal('1,000')
  })
  it('should round down a number with decimals', () => {
    expect(formatWholeFeet(24.85)).to.equal('2')
  })
  it('should show units "\'"', () => {
    expect(formatWholeFeet(30, true)).to.equal('2\'')
  })
})


describe('test formatMillimeters()', () => {
  it('should format 0', () => {
    expect(formatMillimeters(0)).to.equal('0')
  })
  it('should format whole number', () => {
    expect(formatMillimeters(10)).to.equal('254')
  })
  it('should format with comma for thousands', () => {
    expect(formatMillimeters(40)).to.equal('1,016')
  })
  it('should round a number with decimals', () => {
    expect(formatMillimeters(1)).to.equal('25')
    expect(formatMillimeters(2)).to.equal('51')
  })
  it('should show units "mm"', () => {
    expect(formatMillimeters(1, true)).to.equal('25 mm')
  })
})


describe('test formatCentimeters()', () => {
  it('should format 0', () => {
    expect(formatCentimeters(0)).to.equal('0')
  })
  it('should format whole number', () => {
    expect(formatCentimeters(100)).to.equal('254')
  })
  it('should format with comma for thousands', () => {
    expect(formatCentimeters(400)).to.equal('1,016')
  })
  it('should round to 1 decimal place', () => {
    expect(formatCentimeters(1)).to.equal('2.5')
    expect(formatCentimeters(2)).to.equal('5.1')
  })
  it('should show units "cm"', () => {
    expect(formatCentimeters(10, true)).to.equal('25.4 cm')
  })
})


describe('test formatMeters()', () => {
  it('should format 0', () => {
    expect(formatMeters(0)).to.equal('0')
  })
  it('should format whole number', () => {
    expect(formatMeters(10000)).to.equal('254')
  })
  it('should format with comma for thousands', () => {
    expect(formatMeters(40000)).to.equal('1,016')
  })
  it('should round to 2 decimal places', () => {
    expect(formatMeters(10)).to.equal('0.25')
    expect(formatMeters(20)).to.equal('0.51')
  })
  it('should show units "m"', () => {
    expect(formatMeters(100, true)).to.equal('2.54 m')
  })
})


// LengthFormatDisplay: "mm" | "cm" | "m" | "in" | "ft" | "ft_in"
describe('test formatLength()', () => {
  it('should format 0', () => {
    expect(formatLength(0, 'mm')).to.equal('0')
    expect(formatLength(0, 'cm')).to.equal('0')
    expect(formatLength(0, 'm')).to.equal('0')
    expect(formatLength(0, 'in')).to.equal('0')
    expect(formatLength(0, 'ft')).to.equal('0')
    expect(formatLength(0, 'ft_in')).to.equal('0 ft')
  })
  it('should format in the given unit', () => {
    expect(formatLength(1, 'mm')).to.equal('25')
    expect(formatLength(1, 'cm')).to.equal('2.5')
    expect(formatLength(100, 'm')).to.equal('2.54')
    expect(formatLength(20.5, 'in', 'in')).to.equal('20.5')
    expect(formatLength(20.5, 'in', 'in16')).to.equal('20-1/2')
    expect(formatLength(20.5, 'in', 'in32')).to.equal('20-1/2')
    expect(formatLength(20.5, 'in', 'in64')).to.equal('20-1/2')
    expect(formatLength(18, 'ft')).to.equal('1.5')
    expect(formatLength(20.5, 'ft_in')).to.equal('1\' 8-1/2"')
  })
  it('should format in the given unit and show the unit symbol', () => {
    expect(formatLength(1, 'mm', undefined, true)).to.equal('25 mm')
    expect(formatLength(1, 'cm', undefined, true)).to.equal('2.5 cm')
    expect(formatLength(100, 'm', undefined, true)).to.equal('2.54 m')
    expect(formatLength(20.5, 'in', 'in', true)).to.equal('20.5"')
    expect(formatLength(20.5, 'in', 'in16', true)).to.equal('20-1/2"')
    expect(formatLength(20.5, 'in', 'in32', true)).to.equal('20-1/2"')
    expect(formatLength(20.5, 'in', 'in64', true)).to.equal('20-1/2"')
    expect(formatLength(18, 'ft', undefined, true)).to.equal('1.5 ft')
    expect(formatLength(20.5, 'ft_in', undefined, true)).to.equal('1\' 8-1/2"')
  })
  it('should always show units for feet & inches even when showUnits is false', () => {
    expect(formatLength(20, 'ft_in')).to.equal('1\' 8"')
  })
})
