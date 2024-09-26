export interface SafeOption {
  value: string;
  display: string;
}

// Опции
export const SAFE_TYPES: SafeOption[] = [
  { value: 'Black', display: 'Black' },
  { value: 'Blue', display: 'Blue' },
  { value: 'Brown', display: 'Brown' },
  { value: 'Cherry Red', display: 'Cherry Red' },
  { value: 'Cream', display: 'Cream' },
  { value: 'Frozen Blue', display: 'Frozen Blue' },
  { value: 'Grey', display: 'Grey' },
  { value: 'Havanna Brown', display: 'Havanna Brown' },
  { value: 'Honey Yellow', display: 'Honey Yellow' },
  { value: 'Jungle Green', display: 'Jungle Green' },
  { value: 'Lagoon Blue', display: 'Lagoon Blue' },
  { value: 'Lava Orange', display: 'Lava Orange' },
  { value: 'Lemon Yellow', display: 'Lemon Yellow' },
  { value: 'Lizzard Green', display: 'Lizzard Green' },
  { value: 'Maple Green', display: 'Maple Green' },
  { value: 'Mint Ice', display: 'Mint Ice' },
  { value: 'Ocean Blue', display: 'Ocean Blue' },
  { value: 'Pebble Grey', display: 'Pebble Grey' },
  { value: 'White', display: 'White' },
];

export const SAFE_FURNITURES: SafeOption[] = [
  { value: 'Bronze', display: 'Bronze' },
  { value: 'Classic', display: 'Classic' },
  { value: 'Gold', display: 'Gold' },
  { value: 'Graphite', display: 'Graphite' },
  { value: 'Grey', display: 'Grey' },
];

export const SAFE_THREADS: SafeOption[] = [
  { value: 'Black', display: 'Black' },
  { value: 'Brown', display: 'Brown' },
  { value: 'Red', display: 'Red' },
  { value: 'White', display: 'White' },
];

export const SAFE_FINISHES: SafeOption[] = [
  { value: 'Black', display: 'Black' },
  { value: 'Grey', display: 'Grey' },
];

export const SHELF_COUNTS: SafeOption[] = [
  { value: '1', display: '1' },
  { value: '3', display: '3' },
  { value: '5', display: '5' },
];

export const WOOD_COLORS: SafeOption[] = [
  { value: 'ebony_grigio', display: 'Ebony Grigio' },
  { value: 'macassar', display: 'Macassar' },
];

// Маппинг значений опций к индексам изображений
export const SAFE_TYPE_INDICES: { [key: string]: number } = {
  'Black': 1,
  'Blue': 2,
  'Brown': 3,
  'Cherry Red': 4,
  'Cream': 5,
  'Frozen Blue': 6,
  'Grey': 7,
  'Havanna Brown': 8,
  'Honey Yellow': 9,
  'Jungle Green': 10,
  'Lagoon Blue': 11,
  'Lava Orange': 12,
  'Lemon Yellow': 13,
  'Lizzard Green': 14,
  'Maple Green': 15,
  'Mint Ice': 16,
  'Ocean Blue': 17,
  'Pebble Grey': 18,
  'White': 19,
};

export const SAFE_FURNITURE_INDICES: { [key: string]: number } = {
  'Bronze': 1,
  'Classic': 2,
  'Gold': 3,
  'Graphite': 4,
  'Grey': 5,
};

export const SAFE_THREAD_INDICES: { [key: string]: number } = {
  'Black': 1,
  'Brown': 2,
  'Red': 3,
  'White': 4,
};

export const SAFE_FINISHING_INDICES: { [key: string]: number } = {
  'Black': 1,
  'Grey': 2,
};

export const SHELF_COUNT_INDICES_WOOD: { [key: string]: number } = {
  '1': 1,
  '3': 2,
  '5': 3,
};

export const SHELF_COUNT_INDICES_MECHANISM: { [key: string]: number } = {
  '1': 3,
  '3': 2,
  '5': 1,
};

export const WOOD_COLOR_INDICES: { [key: string]: number } = {
  'ebony_grigio': 1,
  'macassar': 2,
};
