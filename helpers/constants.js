"use strict";

/* ============================================================
   Constants: Values
   ============================================================ */
const CONST_MIL = "Mil";
const CONST_MM = "Millimeter";
const CONST_CM = "Centimeter";
const CONST_M = "Meter";
const CONST_KM = "Kilometer";
const CONST_IN = "Inch";
const CONST_FT = "Foot";
const CONST_YD = "Yard";
const CONST_MI = "Mile";
const CONST_NMI = "Nautical Mile";

const CONST_ML = "Milliliter";
const CONST_L = "Liter";
const CONST_GAL_US = "Gallon (US)";
const CONST_GAL_UK = "Gallon (UK)";
const CONST_CC = "Cubic Centimeter";
const CONST_CI = "Cubic Inch";
const CONST_CF = "Cubic Foot";
const CONST_CM3 = "Cubic Meter";

const CONST_MG = "Milligram";
const CONST_G = "Gram";
const CONST_KG = "Kilogram";
const CONST_LB = "Pound";
const CONST_OUNCE = "Ounce";
const CONST_TON = "Ton";

const CONST_C = "Celsius";
const CONST_F = "Fahrenheit";
const CONST_K = "Kelvin";

// Area values
const CONST_SQMM = "Square Millimeter";
const CONST_SQCM = "Square Centimeter";
const CONST_SQM = "Square Meter";
const CONST_SQKM = "Square Kilometer";
const CONST_SQIN = "Square Inch";
const CONST_SQFT = "Square Foot";
const CONST_SQYD = "Square Yard";
const CONST_ACRE = "Acre";
const CONST_HECTARE = "Hectare";

// Data
const CONST_BIT = "Bit";
const CONST_KILOBIT = "Kilobit";
const CONST_MEGABIT = "Megabit";
const CONST_GIGABIT = "Gigabit";
const CONST_TERABIT = "Terabit";
const CONST_BYTE = "Byte";
const CONST_KILOBYTE = "Kilobyte";
const CONST_MEGABYTE = "Megabyte";
const CONST_GIGABYTE = "Gigabyte";
const CONST_TERABYTE = "Terabyte";

// Speed
const CONST_MPS = "Meter per second";
const CONST_KMPH = "Kilometer per hour";
const CONST_MPH = "Mile per hour";
const CONST_KNOT = "Knot"; // nautical mile per hour
const CONST_FPS = "Foot per second";

// Time
const CONST_SEC = "Second";
const CONST_MIN = "Minute";
const CONST_HOUR = "Hour";
const CONST_DAY = "Day";
const CONST_WEEK = "Week";
const CONST_MONTH = "Month"; // average month in days
const CONST_YEAR = "Year";

const CONST_FTIN = "ftin";

/* ============================================================
   Constants: Labels
   ============================================================ */
// Area
const LABEL_SQMM = "Square Millimeters (mm²)";
const LABEL_SQCM = "Square Centimeters (cm²)";
const LABEL_SQM = "Square Meters (m²)";
const LABEL_SQKM = "Square Kilometers (km²)";
const LABEL_SQIN = "Square Inches (in²)";
const LABEL_SQFT = "Square Feet (ft²)";
const LABEL_SQYD = "Square Yards (yd²)";
const LABEL_ACRE = "Acres (ac)";
const LABEL_HECTARE = "Hectares (ha)";

// Length
const LABEL_MIL = "Mils (thou)";
const LABEL_MM = "Millimeters (mm)";
const LABEL_CM = "Centimeters (cm)";
const LABEL_M = "Meters (m)";
const LABEL_KM = "Kilometers (km)";
const LABEL_IN = "Inches (in)";
const LABEL_FT = "Feet (ft)";
const LABEL_YD = "Yards (yd)";
const LABEL_MI = "Miles (mi)";
const LABEL_NMI = "Nautical Miles (nmi)";

// Volume
const LABEL_ML = "Milliliters (mL)";
const LABEL_L = "Liters (L)";
const LABEL_GAL_US = "US Gallons (gal US)";
const LABEL_GAL_UK = "UK Gallons (gal UK)";
const LABEL_CC = "Cubic Centimeters (cm³)";
const LABEL_CI = "Cubic Inches (in³)";
const LABEL_CF = "Cubic Feet (ft³)";
const LABEL_CM3 = "Cubic Meters (m³)";

// Mass
const LABEL_MG = "Milligrams (mg)";
const LABEL_G = "Grams (g)";
const LABEL_KG = "Kilograms (kg)";
const LABEL_LB = "Pounds (lb)";
const LABEL_OUNCE = "Ounces (oz)";
const LABEL_TON = "Tons (t)";

// Temperature
const LABEL_C = "Celsius (°C)";
const LABEL_F = "Fahrenheit (°F)";
const LABEL_K = "Kelvin (K)";

// Data
const LABEL_BIT = "Bits (b)";
const LABEL_KILOBIT = "Kilobits (Kb)";
const LABEL_MEGABIT = "Megabits (Mb)";
const LABEL_GIGABIT = "Gigabits (Gb)";
const LABEL_TERABIT = "Terabits (Tb)";
const LABEL_BYTE = "Bytes (B)";
const LABEL_KILOBYTE = "Kilobytes (KB)";
const LABEL_MEGABYTE = "Megabytes (MB)";
const LABEL_GIGABYTE = "Gigabytes (GB)";
const LABEL_TERABYTE = "Terabytes (TB)";

// Speed
const LABEL_MPS = "Meters per second (m/s)";
const LABEL_KMPH = "Kilometers per hour (km/h)";
const LABEL_MPH = "Miles per hour (mph)";
const LABEL_KNOT = "Knots (nmi/h)";
const LABEL_FPS = "Feet per second (ft/s)";

// Time
const LABEL_SEC = "Seconds (s)";
const LABEL_MIN = "Minutes (min)";
const LABEL_HOUR = "Hours (h)";
const LABEL_DAY = "Days (d)";
const LABEL_WEEK = "Weeks (wk)";
const LABEL_MONTH = "Months (mo)";
const LABEL_YEAR = "Years (yr)";
// Special
const LABEL_FTIN = "Feet+Inches (ft'in\")";

/* ============================================================
Constants: Unit Lists (value-label pairs)
============================================================ */
const UNIT_KEYS = {
  temperature: [
    { value: CONST_C, label: LABEL_C },
    { value: CONST_F, label: LABEL_F },
    { value: CONST_K, label: LABEL_K },
  ],
  length: [
    { value: CONST_MIL, label: LABEL_MIL },
    { value: CONST_MM, label: LABEL_MM },
    { value: CONST_CM, label: LABEL_CM },
    { value: CONST_M, label: LABEL_M },
    { value: CONST_KM, label: LABEL_KM },
    { value: CONST_IN, label: LABEL_IN },
    { value: CONST_FT, label: LABEL_FT },
    { value: CONST_YD, label: LABEL_YD },
    { value: CONST_MI, label: LABEL_MI },
    { value: CONST_NMI, label: LABEL_NMI },
  ],
  volume: [
    { value: CONST_ML, label: LABEL_ML },
    { value: CONST_L, label: LABEL_L },
    { value: CONST_GAL_US, label: LABEL_GAL_US },
    { value: CONST_GAL_UK, label: LABEL_GAL_UK },
    { value: CONST_CC, label: LABEL_CC },
    { value: CONST_CI, label: LABEL_CI },
    { value: CONST_CF, label: LABEL_CF },
    { value: CONST_CM3, label: LABEL_CM3 },
  ],
  mass: [
    { value: CONST_MG, label: LABEL_MG },
    { value: CONST_G, label: LABEL_G },
    { value: CONST_KG, label: LABEL_KG },
    { value: CONST_LB, label: LABEL_LB },
    { value: CONST_OUNCE, label: LABEL_OUNCE },
    { value: CONST_TON, label: LABEL_TON },
  ],
  mass2: [
    { value: CONST_KG, label: LABEL_KG },
    { value: CONST_LB, label: LABEL_LB },
    { value: CONST_OUNCE, label: LABEL_OUNCE },
  ],
  height: [
    { value: CONST_FTIN, label: LABEL_FTIN },
    { value: CONST_CM, label: LABEL_CM },
    { value: CONST_IN, label: LABEL_IN },
    { value: CONST_M, label: LABEL_M },
  ],
  area: [
    { value: CONST_SQMM, label: LABEL_SQMM },
    { value: CONST_SQCM, label: LABEL_SQCM },
    { value: CONST_SQM, label: LABEL_SQM },
    { value: CONST_SQKM, label: LABEL_SQKM },
    { value: CONST_SQIN, label: LABEL_SQIN },
    { value: CONST_SQFT, label: LABEL_SQFT },
    { value: CONST_SQYD, label: LABEL_SQYD },
    { value: CONST_ACRE, label: LABEL_ACRE },
    { value: CONST_HECTARE, label: LABEL_HECTARE },
  ],
  data: [
    { value: CONST_BIT, label: LABEL_BIT },
    { value: CONST_KILOBIT, label: LABEL_KILOBIT },
    { value: CONST_MEGABIT, label: LABEL_MEGABIT },
    { value: CONST_GIGABIT, label: LABEL_GIGABIT },
    { value: CONST_TERABIT, label: LABEL_TERABIT },
    { value: CONST_BYTE, label: LABEL_BYTE },
    { value: CONST_KILOBYTE, label: LABEL_KILOBYTE },
    { value: CONST_MEGABYTE, label: LABEL_MEGABYTE },
    { value: CONST_GIGABYTE, label: LABEL_GIGABYTE },
    { value: CONST_TERABYTE, label: LABEL_TERABYTE },
  ],
  speed: [
    { value: CONST_MPS, label: LABEL_MPS },
    { value: CONST_KMPH, label: LABEL_KMPH },
    { value: CONST_MPH, label: LABEL_MPH },
    { value: CONST_KNOT, label: LABEL_KNOT },
    { value: CONST_FPS, label: LABEL_FPS },
  ],
  time: [
    { value: CONST_SEC, label: LABEL_SEC },
    { value: CONST_MIN, label: LABEL_MIN },
    { value: CONST_HOUR, label: LABEL_HOUR },
    { value: CONST_DAY, label: LABEL_DAY },
    { value: CONST_WEEK, label: LABEL_WEEK },
    { value: CONST_MONTH, label: LABEL_MONTH },
    { value: CONST_YEAR, label: LABEL_YEAR },
  ],
};

/* ============================================================
   Conversion Factors: All linear modes share this
   Base units:
   - Length → meters
   - Volume → liters
   - Mass → kilograms
   - Area → square meters
   ============================================================ */
const CONVERSION_FACTORS = {
  // Length
  [CONST_MIL]: 0.0000254,
  [CONST_MM]: 0.001,
  [CONST_CM]: 0.01,
  [CONST_M]: 1,
  [CONST_KM]: 1000,
  [CONST_IN]: 0.0254,
  [CONST_FT]: 0.3048,
  [CONST_YD]: 0.9144,
  [CONST_MI]: 1609.344,
  [CONST_NMI]: 1852,

  // Volume
  [CONST_ML]: 0.001,
  [CONST_L]: 1,
  [CONST_GAL_US]: 3.78541,
  [CONST_GAL_UK]: 4.54609,
  [CONST_CC]: 0.001,
  [CONST_CI]: 0.0163871,
  [CONST_CF]: 28.3168,
  [CONST_CM3]: 1000,

  // Mass
  [CONST_MG]: 0.000001,
  [CONST_G]: 0.001,
  [CONST_KG]: 1,
  [CONST_TON]: 1000,
  [CONST_LB]: 0.45359237,
  [CONST_OUNCE]: 0.0283495,

  // Area
  [CONST_SQMM]: 0.000001,
  [CONST_SQCM]: 0.0001,
  [CONST_SQM]: 1,
  [CONST_SQKM]: 1000000,
  [CONST_SQIN]: 0.00064516,
  [CONST_SQFT]: 0.092903,
  [CONST_SQYD]: 0.836127,
  [CONST_ACRE]: 4046.856,
  [CONST_HECTARE]: 10000,

  //Data
  [CONST_BIT]: 1,
  [CONST_KILOBIT]: 1000,
  [CONST_MEGABIT]: 1000 ** 2,
  [CONST_GIGABIT]: 1000 ** 3,
  [CONST_TERABIT]: 1000 ** 4,
  [CONST_BYTE]: 8,
  [CONST_KILOBYTE]: 8 * 1000,
  [CONST_MEGABYTE]: 8 * 1000 ** 2,
  [CONST_GIGABYTE]: 8 * 1000 ** 3,
  [CONST_TERABYTE]: 8 * 1000 ** 4,

  // speed
  [CONST_MPS]: 1,
  [CONST_KMPH]: 1000 / 3600, // km/h → m/s
  [CONST_MPH]: 1609.344 / 3600, // mph → m/s
  [CONST_KNOT]: 1852 / 3600, // nautical mile/h → m/s
  [CONST_FPS]: 0.3048,

  // Time
  [CONST_SEC]: 1,
  [CONST_MIN]: 60,
  [CONST_HOUR]: 3600,
  [CONST_DAY]: 86400,
  [CONST_WEEK]: 604800,
  [CONST_MONTH]: 2629800, // Average month = 30.44 days
  [CONST_YEAR]: 31557600,
};

/* ============================================================
   Constants: Temperature Conversions
   ============================================================ */
const TEMP_TO_C = {
  [CONST_C]: (val) => val,
  [CONST_F]: (val) => ((val - 32) * 5) / 9,
  [CONST_K]: (val) => val - 273.15,
};

const TEMP_FROM_C = {
  [CONST_C]: (val) => val,
  [CONST_F]: (val) => (val * 9) / 5 + 32,
  [CONST_K]: (val) => val + 273.15,
};

/* ============================================================
    Set default for modes
   ============================================================ */

const defaultUnits_UnitConverter = {
  height: [CONST_FTIN, CONST_CM],
  length: [CONST_FT, CONST_CM],
  volume: [CONST_GAL_US, CONST_L],
  mass: [CONST_KG, CONST_LB],
  temperature: [CONST_C, CONST_F],
  area: [CONST_SQFT, CONST_ACRE],
  data: [CONST_KILOBYTE, CONST_MEGABYTE],
  speed: [CONST_KMPH, CONST_MPS],
  time: [CONST_HOUR, CONST_MIN],
};

/* ============================================================
   Constants: Modes
   ============================================================ */
const MODES = [
  { value: "area", label: "Area" },
  { value: "length", label: "Length" },
  { value: "height", label: "Height" },
  { value: "volume", label: "Volume" },
  { value: "mass", label: "Mass" },
  { value: "temperature", label: "Temperature" },
  { value: "data", label: "Data" },
  { value: "speed", label: "Speed" },
  { value: "time", label: "Time" },
];
