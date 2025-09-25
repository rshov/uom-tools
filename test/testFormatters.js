const expect = require("chai").expect;
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
  formatLength,
  formatVolume,
} = require("../dist/index");

describe("test formatFractionalInches()", () => {
  it("should format 0 as 0", () => {
    expect(formatFractionalInches(0)).to.equal("0");
    expect(formatFractionalInches(0, "in", "in16")).to.equal("0");
    expect(formatFractionalInches(0, "in", "in32")).to.equal("0");
    expect(formatFractionalInches(0, "in", "in64")).to.equal("0");
  });
  it("should convert from the given units", () => {
    expect(formatFractionalInches(1)).to.equal("1");
    expect(formatFractionalInches(1, "ft", "in16", true)).to.equal('12"');
    expect(formatFractionalInches(1, "cm", "in16", true)).to.equal('3/8"');
  });
  it("should format 0.25 as 1/4", () => {
    expect(formatFractionalInches(0.25, "in", "in16")).to.equal("1/4");
    expect(formatFractionalInches(0.25, "in", "in32")).to.equal("1/4");
    expect(formatFractionalInches(0.25, "in", "in64")).to.equal("1/4");
  });
  it("should format 0.1875 as 3/16 (reduces 6/32 and 12/64)", () => {
    expect(formatFractionalInches(0.1875, "in", "in16")).to.equal("3/16");
    expect(formatFractionalInches(0.1875, "in", "in32")).to.equal("3/16");
    expect(formatFractionalInches(0.1875, "in", "in64")).to.equal("3/16");
  });
  it("should format 3/32 and 3/64", () => {
    expect(formatFractionalInches(0.09375, "in", "in32")).to.equal("3/32");
    expect(formatFractionalInches(0.046875, "in", "in64")).to.equal("3/64");
  });
  it("should round to nearest", () => {
    expect(formatFractionalInches(0.19, "in", "in16")).to.equal("3/16");
    expect(formatFractionalInches(0.09, "in", "in32")).to.equal("3/32");
    expect(formatFractionalInches(0.04, "in", "in64")).to.equal("3/64");
  });
  it("should include units", () => {
    expect(formatFractionalInches(0.25, "in", "in16", true)).to.equal('1/4"');
    expect(formatFractionalInches(0.25, "in", "in32", true)).to.equal('1/4"');
    expect(formatFractionalInches(0.25, "in", "in64", true)).to.equal('1/4"');
  });
});

describe("test formatFeetAndFractionalInches()", () => {
  it("should format 0", () => {
    expect(formatFeetAndFractionalInches(0)).to.equal("0 ft");
    expect(formatFeetAndFractionalInches(0, "in", "in16")).to.equal("0 ft");
    expect(formatFeetAndFractionalInches(0, "in", "in32")).to.equal("0 ft");
    expect(formatFeetAndFractionalInches(0, "in", "in64")).to.equal("0 ft");
  });
  it("should convert from the given units", () => {
    expect(formatFeetAndFractionalInches(1)).to.equal('1"');
    expect(formatFeetAndFractionalInches(1, "ft")).to.equal("1 ft");
    expect(formatFeetAndFractionalInches(1, "cm")).to.equal('3/8"');
  });
  it("should convert from the given units", () => {
    expect(formatFeetAndFractionalInches(6)).to.equal('6"');
    expect(formatFeetAndFractionalInches(6, "in")).to.equal('6"');
    expect(formatFeetAndFractionalInches(6, "ft")).to.equal("6 ft");
    expect(formatFeetAndFractionalInches(6, "m")).to.equal("19' 8-3/16\"");
  });
  it("should format as only inches when there are no feet", () => {
    expect(formatFeetAndFractionalInches(0.25, "in", "in16")).to.equal('1/4"');
    expect(formatFeetAndFractionalInches(0.25, "in", "in32")).to.equal('1/4"');
    expect(formatFeetAndFractionalInches(0.25, "in", "in64")).to.equal('1/4"');
  });
  it('should format as whole feet with units "ft" when no inches', () => {
    expect(formatFeetAndFractionalInches(36, "in", "in16")).to.equal("3 ft");
    expect(formatFeetAndFractionalInches(36, "in", "in32")).to.equal("3 ft");
    expect(formatFeetAndFractionalInches(36, "in", "in64")).to.equal("3 ft");
  });
  it("should format as feet and whole inches", () => {
    expect(formatFeetAndFractionalInches(38, "in", "in16")).to.equal("3' 2\"");
    expect(formatFeetAndFractionalInches(38, "in", "in32")).to.equal("3' 2\"");
    expect(formatFeetAndFractionalInches(38, "in", "in64")).to.equal("3' 2\"");
  });
  it("should format as feet and fractional inches", () => {
    expect(formatFeetAndFractionalInches(38.5, "in", "in16")).to.equal(
      "3' 2-1/2\""
    );
    expect(formatFeetAndFractionalInches(38.5, "in", "in32")).to.equal(
      "3' 2-1/2\""
    );
    expect(formatFeetAndFractionalInches(38.5, "in", "in64")).to.equal(
      "3' 2-1/2\""
    );
  });
  it('should format as only feet if inches round to 0" or 12"', () => {
    expect(formatFeetAndFractionalInches(59.99999, "in", "in")).to.equal(
      "5 ft"
    );
    expect(formatFeetAndFractionalInches(59.99999, "in", "in16")).to.equal(
      "5 ft"
    );
    expect(formatFeetAndFractionalInches(59.99999, "in", "in32")).to.equal(
      "5 ft"
    );
    expect(formatFeetAndFractionalInches(59.99999, "in", "in64")).to.equal(
      "5 ft"
    );
    expect(formatFeetAndFractionalInches(60.00001, "in", "in")).to.equal(
      "5 ft"
    );
    expect(formatFeetAndFractionalInches(60.00001, "in", "in16")).to.equal(
      "5 ft"
    );
    expect(formatFeetAndFractionalInches(60.00001, "in", "in32")).to.equal(
      "5 ft"
    );
    expect(formatFeetAndFractionalInches(60.00001, "in", "in64")).to.equal(
      "5 ft"
    );
    expect(formatFeetAndFractionalInches(59.9, "in", "in")).to.equal("4' 11\"");
    expect(formatFeetAndFractionalInches(60.1, "in", "in")).to.equal("5 ft");
  });
});

describe("test formatFeetAndDecimalInches()", () => {
  it("should format 0", () => {
    expect(formatFeetAndDecimalInches(0)).to.equal("0 ft");
    expect(formatFeetAndDecimalInches(0, "in")).to.equal("0 ft");
  });
  it("should convert from the given units", () => {
    expect(formatFeetAndDecimalInches(6)).to.equal('6"');
    expect(formatFeetAndDecimalInches(6, "in")).to.equal('6"');
    expect(formatFeetAndDecimalInches(6, "ft")).to.equal("6 ft");
    expect(formatFeetAndDecimalInches(6, "m")).to.equal("19' 8.22\"");
  });
  it("should format as only inches when there are no feet", () => {
    expect(formatFeetAndDecimalInches(0.25)).to.equal('0.25"');
  });
  it('should format as whole feet with units "ft" when no inches', () => {
    expect(formatFeetAndDecimalInches(36)).to.equal("3 ft");
  });
  it("should format as feet and whole inches", () => {
    expect(formatFeetAndDecimalInches(38)).to.equal("3' 2\"");
  });
  it("should format as feet and fractional inches", () => {
    expect(formatFeetAndDecimalInches(38.5)).to.equal("3' 2.5\"");
  });
});

describe("test formatDecimalInches()", () => {
  it("should format 0", () => {
    expect(formatDecimalInches(0)).to.equal("0");
  });
  it("should convert from the given units", () => {
    expect(formatDecimalInches(2, "ft")).to.equal("24");
    expect(formatDecimalInches(10, "cm")).to.equal("3.94");
  });
  it("should format whole number", () => {
    expect(formatDecimalInches(5)).to.equal("5");
  });
  it("should format with comma for thousands", () => {
    expect(formatDecimalInches(5000)).to.equal("5,000");
  });
  it("should format 1 decimal place", () => {
    expect(formatDecimalInches(0.2)).to.equal("0.2");
  });
  it("should format 2 decimal places", () => {
    expect(formatDecimalInches(0.25)).to.equal("0.25");
  });
  it("should format to max 2 decimal places", () => {
    expect(formatDecimalInches(0.25678)).to.equal("0.26");
  });
  it('should format with units "', () => {
    expect(formatDecimalInches(5, "in", true)).to.equal('5"');
    expect(formatDecimalInches(0.5, "in", true)).to.equal('0.5"');
  });
});

describe("test formatFeetDecimal()", () => {
  it("should format 0", () => {
    expect(formatFeetDecimal(0)).to.equal("0");
  });
  it("should convert from the given units", () => {
    expect(formatFeetDecimal(2)).to.equal("2");
    expect(formatFeetDecimal(2, "ft")).to.equal("2");
    expect(formatFeetDecimal(24, "in")).to.equal("2");
    expect(formatFeetDecimal(100, "cm")).to.equal("3.28");
  });
  it("should format whole number", () => {
    expect(formatFeetDecimal(5)).to.equal("5");
  });
  it("should format with comma for thousands", () => {
    expect(formatFeetDecimal(5000)).to.equal("5,000");
  });
  it("should format 1 decimal place", () => {
    expect(formatFeetDecimal(0.2)).to.equal("0.2");
  });
  it("should format 2 decimal places", () => {
    expect(formatFeetDecimal(0.25)).to.equal("0.25");
  });
  it("should format to max 2 decimal places", () => {
    expect(formatFeetDecimal(0.25678)).to.equal("0.26");
  });
  it('should format with units "ft"', () => {
    expect(formatFeetDecimal(5, "ft", true)).to.equal("5 ft");
    expect(formatFeetDecimal(0.5, "ft", true)).to.equal("0.5 ft");
  });
});

describe("test formatWholeFeet()", () => {
  it("should format 0", () => {
    expect(formatWholeFeet(0)).to.equal("0");
  });
  it("should convert from the given units", () => {
    expect(formatWholeFeet(2)).to.equal("2");
    expect(formatWholeFeet(2, "ft")).to.equal("2");
    expect(formatWholeFeet(24, "in")).to.equal("2");
    expect(formatWholeFeet(100, "cm")).to.equal("3");
  });
  it("should format whole number", () => {
    expect(formatWholeFeet(5)).to.equal("5");
  });
  it("should format with comma for thousands", () => {
    expect(formatWholeFeet(1000)).to.equal("1,000");
  });
  it("should round down a number with decimals", () => {
    expect(formatWholeFeet(5.8)).to.equal("5");
  });
  it('should show units "\'"', () => {
    expect(formatWholeFeet(2, "ft", true)).to.equal("2'");
  });
});

describe("test formatMillimeters()", () => {
  it("should format 0", () => {
    expect(formatMillimeters(0)).to.equal("0");
  });
  it("should format whole number", () => {
    expect(formatMillimeters(10)).to.equal("10");
  });
  it("should format with comma for thousands", () => {
    expect(formatMillimeters(1000)).to.equal("1,000");
  });
  it("should round a number with decimals", () => {
    expect(formatMillimeters(5.2)).to.equal("5");
    expect(formatMillimeters(5.8)).to.equal("6");
  });
  it('should show units "mm"', () => {
    expect(formatMillimeters(5, "mm", true)).to.equal("5 mm");
  });
  it("should convert from the given units", () => {
    expect(formatMillimeters(2)).to.equal("2");
    expect(formatMillimeters(2, "mm")).to.equal("2");
    expect(formatMillimeters(2, "cm")).to.equal("20");
    expect(formatMillimeters(2, "m")).to.equal("2,000");
    expect(formatMillimeters(2, "in")).to.equal("51");
  });
});

describe("test formatCentimeters()", () => {
  it("should format 0", () => {
    expect(formatCentimeters(0)).to.equal("0");
  });
  it("should format whole number", () => {
    expect(formatCentimeters(5)).to.equal("5");
  });
  it("should format with comma for thousands", () => {
    expect(formatCentimeters(1000)).to.equal("1,000");
  });
  it("should round to 1 decimal place", () => {
    expect(formatCentimeters(2.48)).to.equal("2.5");
    expect(formatCentimeters(2.52)).to.equal("2.5");
  });
  it('should show units "cm"', () => {
    expect(formatCentimeters(5.6, "cm", true)).to.equal("5.6 cm");
  });
  it("should convert from the given units", () => {
    expect(formatCentimeters(2)).to.equal("2");
    expect(formatCentimeters(2, "cm")).to.equal("2");
    expect(formatCentimeters(20, "mm")).to.equal("2");
    expect(formatCentimeters(2, "m")).to.equal("200");
    expect(formatCentimeters(2, "in")).to.equal("5.1");
  });
});

describe("test formatMeters()", () => {
  it("should format 0", () => {
    expect(formatMeters(0)).to.equal("0");
  });
  it("should format whole number", () => {
    expect(formatMeters(5)).to.equal("5");
  });
  it("should format with comma for thousands", () => {
    expect(formatMeters(1000)).to.equal("1,000");
  });
  it("should round to 2 decimal places", () => {
    expect(formatMeters(2.554)).to.equal("2.55");
    expect(formatMeters(2.546)).to.equal("2.55");
  });
  it('should show units "m"', () => {
    expect(formatMeters(5.6, "m", true)).to.equal("5.6 m");
  });
  it("should convert from the given units", () => {
    expect(formatMeters(2)).to.equal("2");
    expect(formatMeters(2, "m")).to.equal("2");
    expect(formatMeters(200, "cm")).to.equal("2");
    expect(formatMeters(2000, "mm")).to.equal("2");
    expect(formatMeters(2000, "in")).to.equal("50.8");
  });
});

// LengthFormatDisplay: "mm" | "cm" | "m" | "in" | "ft" | "ft_in"
describe("test formatLength()", () => {
  it("should format 0", () => {
    expect(formatLength(0, "in", "mm")).to.equal("0");
    expect(formatLength(0, "mm", "cm")).to.equal("0");
    expect(formatLength(0, "cm", "m")).to.equal("0");
    expect(formatLength(0, "ft", "in")).to.equal("0");
    expect(formatLength(0, "m", "ft")).to.equal("0");
    expect(formatLength(0, undefined, "ft_in")).to.equal("0 ft");
  });
  it("should format in the given unit", () => {
    expect(formatLength(5, "mm", "mm")).to.equal("5");
    expect(formatLength(5, "cm", "cm")).to.equal("5");
    expect(formatLength(5, "m", "m")).to.equal("5");
    expect(formatLength(5.75, "in", "in", "in")).to.equal("5.75");
    expect(formatLength(5.0625, "in", "in", "in16")).to.equal("5-1/16");
    expect(formatLength(5.03125, "in", "in", "in32")).to.equal("5-1/32");
    expect(formatLength(5.015625, "in", "in", "in64")).to.equal("5-1/64");
    expect(formatLength(5, "ft", "ft")).to.equal("5");
    expect(formatLength(5, "in", "ft_in")).to.equal('5"');
  });
  it("should format in the given unit and show the unit symbol", () => {
    expect(formatLength(5, "mm", "mm", undefined, true)).to.equal("5 mm");
    expect(formatLength(5, "cm", "cm", undefined, true)).to.equal("5 cm");
    expect(formatLength(5, "m", "m", undefined, true)).to.equal("5 m");
    expect(formatLength(5.75, "in", "in", undefined, true)).to.equal('5-3/4"');
    expect(formatLength(5.75, "in", "in", "in", true)).to.equal('5.75"');
    expect(formatLength(5.0625, "in", "in", "in16", true)).to.equal('5-1/16"');
    expect(formatLength(5.03125, "in", "in", "in32", true)).to.equal('5-1/32"');
    expect(formatLength(5.015625, "in", "in", "in64", true)).to.equal(
      '5-1/64"'
    );
    expect(formatLength(5, "ft", "ft", undefined, true)).to.equal("5 ft");
    expect(formatLength(1.5, "in", "ft_in", undefined, true)).to.equal(
      '1-1/2"'
    );
    expect(formatLength(20.5, "in", "ft_in", undefined, true)).to.equal(
      "1' 8-1/2\""
    );
  });
  it("should convert the unit of measure", () => {
    expect(formatLength(1, "cm", "mm")).to.equal("10");
    expect(formatLength(1, "m", "cm")).to.equal("100");
    expect(formatLength(1, "ft", "in")).to.equal("12");
    expect(formatLength(12, "in", "ft")).to.equal("1");
    expect(formatLength(1, "in", "cm")).to.equal("2.5");
  });
  it("should always show units for feet & inches even when showUnits is false", () => {
    expect(formatLength(20, "in", "ft_in")).to.equal("1' 8\"");
  });
});

describe("test formatVolume()", () => {
  it("should format 0 mL", () => {
    expect(formatVolume(0, "mL", false)).to.equal("0");
    expect(formatVolume(0, "mL", true)).to.equal("0 mL");
  });
  it("should format whole numbers in mL", () => {
    expect(formatVolume(100, "mL", false)).to.equal("100");
    expect(formatVolume(100, "mL", true)).to.equal("100 mL");
  });
  it("should format large numbers with commas in mL", () => {
    expect(formatVolume(1000, "mL", false)).to.equal("1,000");
    expect(formatVolume(1000, "mL", true)).to.equal("1,000 mL");
  });
  it("should format very large numbers with commas in mL", () => {
    expect(formatVolume(1000000, "mL", false)).to.equal("1,000,000");
    expect(formatVolume(1000000, "mL", true)).to.equal("1,000,000 mL");
  });
  it("should format 0 oz", () => {
    expect(formatVolume(0, "oz", false)).to.equal("0");
    expect(formatVolume(0, "oz", true)).to.equal("0 oz");
  });
  it("should format whole numbers in oz", () => {
    expect(formatVolume(100, "oz", false)).to.equal("3.4");
    expect(formatVolume(100, "oz", true)).to.equal("3.4 oz");
  });
  it("should format decimal numbers in oz", () => {
    expect(formatVolume(29.5735, "oz", false)).to.equal("1");
    expect(formatVolume(29.5735, "oz", true)).to.equal("1 oz");
  });
  it("should format large numbers with commas in oz", () => {
    expect(formatVolume(1000, "oz", false)).to.equal("33.8");
    expect(formatVolume(1000, "oz", true)).to.equal("33.8 oz");
  });
  it("should convert mL to oz correctly", () => {
    // 1 mL = 0.03381413 oz
    expect(formatVolume(1, "oz", false)).to.equal("0");
    expect(formatVolume(30, "oz", false)).to.equal("1");
    expect(formatVolume(100, "oz", false)).to.equal("3.4");
  });
  it("should handle edge cases", () => {
    expect(formatVolume(0.1, "oz", false)).to.equal("0");
    expect(formatVolume(0.5, "oz", false)).to.equal("0");
    expect(formatVolume(1.5, "oz", false)).to.equal("0.1");
  });
});
