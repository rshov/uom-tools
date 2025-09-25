# uom-tools

A modern TypeScript/JavaScript library for parsing and formatting units of measure (UOM). Supports both CommonJS and ES modules, making it perfect for modern applications like TanStack Start, Next.js, and other TypeScript projects.

## Features

- **Length Units**: millimeters, centimeters, meters, decimal inches, fractional inches (16ths, 32nds, 64ths), feet, and combinations
- **Volume Units**: milliliters and fluid ounces
- **Modern TypeScript**: Full TypeScript support with type definitions
- **Dual Package**: Supports both CommonJS and ES modules
- **Tree Shakeable**: ES module exports for optimal bundle sizes

## Installation

```bash
npm install uom-tools
# or
pnpm add uom-tools
# or
yarn add uom-tools
```

## Usage

### ES Modules (Recommended)

```typescript
import {
  formatLength,
  parseLength,
  formatVolume,
  parseVolume,
} from "uom-tools";

// Format length
console.log(formatLength(5, "in", "cm")); // "12.7"
console.log(formatLength(5, "in", "ft_in")); // "5\""

// Parse length
console.log(parseLength("5' 4\"", "in")); // 64
console.log(parseLength("10' 4-1/2\"", "in")); // 124.5

// Format volume
console.log(formatVolume(100, "mL", true)); // "100 mL"
console.log(formatVolume(100, "oz", true)); // "3.4 oz"

// Parse volume
console.log(parseVolume("100", "mL")); // 100
console.log(parseVolume("3.4", "oz")); // 0.10055...
```

### CommonJS

```javascript
const { formatLength, parseLength } = require("uom-tools");

console.log(formatLength(5, "in", "cm")); // "12.7"
console.log(parseLength("5' 4\"", "in")); // 64
```

## API Reference

### Length Functions

#### `formatLength(value, fromUnit, toUnit, displayFormat?, showUnits?)`

Formats a length value from one unit to another.

- `value`: The numeric value to format
- `fromUnit`: Source unit (`"mm"`, `"cm"`, `"m"`, `"in"`, `"ft"`)
- `toUnit`: Target unit (`"mm"`, `"cm"`, `"m"`, `"in"`, `"ft"`, `"ft_in"`)
- `displayFormat`: For inches - `"in"` (decimal), `"in16"`, `"in32"`, `"in64"` (fractional)
- `showUnits`: Whether to include unit symbols

#### `parseLength(input, targetUnit, defaultUnit?)`

Parses a length string into a numeric value.

- `input`: String to parse (e.g., `"5' 4\""`, `"10 cm"`, `"5-1/2\""`)
- `targetUnit`: Unit to convert to
- `defaultUnit`: Default unit if none specified in input

### Volume Functions

#### `formatVolume(value, fromUnit, showUnits?)`

Formats a volume value.

- `value`: The numeric value to format
- `fromUnit`: Source unit (`"mL"`, `"oz"`)
- `showUnits`: Whether to include unit symbols

#### `parseVolume(input, targetUnit)`

Parses a volume string into a numeric value.

- `input`: String to parse (e.g., `"100 mL"`, `"3.4 oz"`)
- `targetUnit`: Unit to convert to

## Examples

### Length Formatting

```typescript
import { formatLength } from "uom-tools";

// Basic conversions
formatLength(5, "in", "cm"); // "12.7"
formatLength(100, "cm", "ft"); // "3.28"

// Fractional inches
formatLength(5.0625, "in", "in", "in16"); // "5-1/16"
formatLength(5.03125, "in", "in", "in32"); // "5-1/32"

// Feet and inches
formatLength(64, "in", "ft_in"); // "5' 4\""
formatLength(64.5, "in", "ft_in"); // "5' 4-1/2\""

// With units
formatLength(5, "in", "cm", undefined, true); // "12.7 cm"
```

### Length Parsing

```typescript
import { parseLength } from "uom-tools";

// Parse various formats
parseLength("5' 4\"", "in"); // 64
parseLength("10' 4-1/2\"", "in"); // 124.5
parseLength("10 cm", "in"); // 3.94
parseLength('5-1/2"', "in"); // 5.5
parseLength("100 mm", "cm"); // 10
```

### Volume Formatting

```typescript
import { formatVolume } from "uom-tools";

// Format volumes
formatVolume(100, "mL", true); // "100 mL"
formatVolume(100, "oz", true); // "3.4 oz"
formatVolume(1000, "mL", true); // "1,000 mL"
```

### Volume Parsing

```typescript
import { parseVolume } from "uom-tools";

// Parse volumes
parseVolume("100", "mL"); // 100
parseVolume("3.4", "oz"); // 0.10055...
parseVolume("1,000", "mL"); // 1000
```

## TypeScript Support

The package includes full TypeScript definitions:

```typescript
import type { LengthUOM, VolumeUOM } from "uom-tools";

// Length units: "mm" | "cm" | "m" | "in" | "ft"
// Volume units: "mL" | "oz"
```

## Modern Framework Support

This package works seamlessly with modern frameworks:

- **TanStack Start**: Full ES module support
- **Next.js**: Works with both App Router and Pages Router
- **Vite**: Optimized for Vite's ES module handling
- **Node.js**: Both CommonJS and ES module support

## License

MIT
