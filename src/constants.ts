export const modes = {
  a: {
    arabicName: 'مفتوح',
    displayName: 'Maftuuh ( \ufe77 )',
    medial: '\ufe77', // https://codepoints.net/U+FE77
  },
  i: {
    arabicName: 'مكسور',
    displayName: 'Maksuur ( \ufe7b )',
    medial: '\ufe7b', // https://codepoints.net/U+FE7B
  },
  u: {
    arabicName: 'مضموم',
    displayName: 'Madhmuum ( \ufe79 )',
    medial: '\ufe79', // https://codepoints.net/U+FE79
  },
  saakin_a: {
    arabicName: 'فتحة ساكنة',
    displayName: 'Saakin ( أَ + \ufe7f )',
    medial: null,
  },
  saakin_u: {
    arabicName: 'ضمة ساكنة',
    displayName: 'Saakin ( أُ + \ufe7f )',
    medial: null,
  },
  saakin_i: {
    arabicName: 'كسرة ساكنة',
    displayName: 'Saakin ( أِ + \ufe7f )',
    medial: null,
  },
  combined: {
    arabicName: 'مجموع',
    displayName: 'All together',
    medial: null,
  },
} as const;

export type ModeKey = keyof typeof modes;
export type Modes = typeof modes;

type ExpandUnion<T extends string> = {
  [K in T]: string;
};

export type Alphabet = {
  [key: string]: {
    base: string;
  } & ExpandUnion<ModeKey>;
};

export const alphabet: Alphabet = {
  hamzah: {
    base: 'أ',
    saakin_a: 'أَءْ',
    saakin_u: 'أُءْ',
    saakin_i: 'أِءْ',
    a: 'أَ',
    u: 'أُ',
    i: 'إِ',
    combined: 'أ',
  },
  beh: {
    base: 'ب',
    saakin_a: 'أَبْ',
    saakin_u: 'أُبْ',
    saakin_i: 'أِبْ',
    a: 'بَ',
    u: 'بُ',
    i: 'بِ',
    combined: 'ب',
  },
  teh: {
    base: 'ت',
    saakin_a: 'أَتْ',
    saakin_u: 'أُتْ',
    saakin_i: 'أِتْ',
    a: 'تَ',
    u: 'تُ',
    i: 'تِ',
    combined: 'ت',
  },
  theh: {
    base: 'ث',
    saakin_a: 'أَثْ',
    saakin_u: 'أُثْ',
    saakin_i: 'أِثْ',
    a: 'ثَ',
    u: 'ثُ',
    i: 'ثِ',
    combined: 'ث',
  },
  jeem: {
    base: 'ج',
    saakin_a: 'أَجْ',
    saakin_u: 'أُجْ',
    saakin_i: 'أِجْ',
    a: 'جَ',
    u: 'جُ',
    i: 'جِ',
    combined: 'ج',
  },
  hah: {
    base: 'ح',
    saakin_a: 'أَحْ',
    saakin_u: 'أُحْ',
    saakin_i: 'أِحْ',
    a: 'حَ',
    u: 'حُ',
    i: 'حِ',
    combined: 'ح',
  },
  khah: {
    base: 'خ',
    saakin_a: 'أَخْ',
    saakin_u: 'أُخْ',
    saakin_i: 'أِخْ',
    a: 'خَ',
    u: 'خُ',
    i: 'خِ',
    combined: 'خ',
  },
  dal: {
    base: 'د',
    saakin_a: 'أَدْ',
    saakin_u: 'أُدْ',
    saakin_i: 'أِدْ',
    a: 'دَ',
    u: 'دُ',
    i: 'دِ',
    combined: 'د',
  },
  thal: {
    base: 'ذ',
    saakin_a: 'أَذْ',
    saakin_u: 'أُذْ',
    saakin_i: 'أِذْ',
    a: 'ذَ',
    u: 'ذُ',
    i: 'ذِ',
    combined: 'ذ',
  },
  ra: {
    base: 'ر',
    saakin_a: 'أَرْ',
    saakin_u: 'أُرْ',
    saakin_i: 'أِرْ',
    a: 'رَ',
    u: 'رُ',
    i: 'رِ',
    combined: 'ر',
  },
  zay: {
    base: 'ز',
    saakin_a: 'أَزْ',
    saakin_u: 'أُزْ',
    saakin_i: 'أِزْ',
    a: 'زَ',
    u: 'زُ',
    i: 'زِ',
    combined: 'ز',
  },
  seen: {
    base: 'س',
    saakin_a: 'أَسْ',
    saakin_u: 'أُسْ',
    saakin_i: 'أِسْ',
    a: 'سَ',
    u: 'سُ',
    i: 'سِ',
    combined: 'س',
  },
  sheen: {
    base: 'ش',
    saakin_a: 'أَشْ',
    saakin_u: 'أُشْ',
    saakin_i: 'أِشْ',
    a: 'شَ',
    u: 'شُ',
    i: 'شِ',
    combined: 'ش',
  },
  sad: {
    base: 'ص',
    saakin_a: 'أَصْ',
    saakin_u: 'أُصْ',
    saakin_i: 'أِصْ',
    a: 'صَ',
    u: 'صُ',
    i: 'صِ',
    combined: 'ص',
  },
  dad: {
    base: 'ض',
    saakin_a: 'أَضْ',
    saakin_u: 'أُضْ',
    saakin_i: 'أِضْ',
    a: 'ضَ',
    u: 'ضُ',
    i: 'ضِ',
    combined: 'ض',
  },
  tah: {
    base: 'ط',
    saakin_a: 'أَطْ',
    saakin_u: 'أُطْ',
    saakin_i: 'أِطْ',
    a: 'طَ',
    u: 'طُ',
    i: 'طِ',
    combined: 'ط',
  },
  zah: {
    base: 'ظ',
    saakin_a: 'أَظْ',
    saakin_u: 'أُظْ',
    saakin_i: 'أِظْ',
    a: 'ظَ',
    u: 'ظُ',
    i: 'ظِ',
    combined: 'ظ',
  },
  ain: {
    base: 'ع',
    saakin_a: 'أَعْ',
    saakin_u: 'أُعْ',
    saakin_i: 'أِعْ',
    a: 'عَ',
    u: 'عُ',
    i: 'عِ',
    combined: 'ع',
  },
  ghain: {
    base: 'غ',
    saakin_a: 'أَغْ',
    saakin_u: 'أُغْ',
    saakin_i: 'أِغْ',
    a: 'غَ',
    u: 'غُ',
    i: 'غِ',
    combined: 'غ',
  },
  feh: {
    base: 'ف',
    saakin_a: 'أَفْ',
    saakin_u: 'أُفْ',
    saakin_i: 'أِفْ',
    a: 'فَ',
    u: 'فُ',
    i: 'فِ',
    combined: 'ف',
  },
  qaf: {
    base: 'ق',
    saakin_a: 'أَقْ',
    saakin_u: 'أُقْ',
    saakin_i: 'أِقْ',
    a: 'قَ',
    u: 'قُ',
    i: 'قِ',
    combined: 'ق',
  },
  kaf: {
    base: 'ك',
    saakin_a: 'أَكْ',
    saakin_u: 'أُكْ',
    saakin_i: 'أِكْ',
    a: 'كَ',
    u: 'كُ',
    i: 'كِ',
    combined: 'ك',
  },
  lam: {
    base: 'ل',
    saakin_a: 'أَلْ',
    saakin_u: 'أُلْ',
    saakin_i: 'أِلْ',
    a: 'لَ',
    u: 'لُ',
    i: 'لِ',
    combined: 'ل',
  },
  meem: {
    base: 'م',
    saakin_a: 'أَمْ',
    saakin_u: 'أُمْ',
    saakin_i: 'أِمْ',
    a: 'مَ',
    u: 'مُ',
    i: 'مِ',
    combined: 'م',
  },
  noon: {
    base: 'ن',
    saakin_a: 'أَنْ',
    saakin_u: 'أُنْ',
    saakin_i: 'أِنْ',
    a: 'نَ',
    u: 'نُ',
    i: 'نِ',
    combined: 'ن',
  },
  ha: {
    base: 'ه',
    saakin_a: 'أَهْ',
    saakin_u: 'أُهْ',
    saakin_i: 'أِهْ',
    a: 'هَ',
    u: 'هُ',
    i: 'هِ',
    combined: 'ه',
  },
  waw: {
    base: 'و',
    saakin_a: 'أَوْ',
    saakin_u: 'أُوْ',
    saakin_i: 'أِوْ',
    a: 'وَ',
    u: 'وُ',
    i: 'وِ',
    combined: 'و',
  },
  ya: {
    base: 'ي',
    saakin_a: 'أَيْ',
    saakin_u: 'أُيْ',
    saakin_i: 'أِيْ',
    a: 'يَ',
    u: 'يُ',
    i: 'يِ',
    combined: 'ي',
  },
} as const;

export type Letter = keyof typeof alphabet;
