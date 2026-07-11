import type { WordLength } from '@/shared/config/game'

const words4 = [
  'adam', 'alma', 'agaç', 'aýak', 'açar', 'aýal', 'bagt', 'çaga', 'çyra', 'daýy',
  'däli', 'däne', 'deri', 'doga', 'dost', 'düýe', 'ekin', 'elek', 'eşik', 'gala',
  'gapy', 'gara', 'gaýa', 'gämi', 'gije', 'guýy', 'guzy', 'güýç', 'güýz', 'halk',
  'haly', 'howa', 'jora', 'kaka', 'kädi', 'käse', 'köçe', 'läle', 'mele', 'näme',
  'näçe', 'odun', 'ogul', 'ojak', 'orak', 'otag', 'oýun', 'ökde', 'ölke', 'reňk',
  'sana', 'sary', 'saýa', 'süýt', 'tüwi', 'tüýs', 'uçar', 'ussa', 'uzyn', 'üzüm',
  'üçin', 'wada', 'wagt', 'ýaka', 'ýara', 'ýoda',
]

const words5 = [
  'çörek', 'kitap', 'balyk', 'burun', 'darak', 'durna', 'gyzyl', 'horaz', 'köpri', 'kömür',
  'nahar', 'oglan', 'pagta', 'palta', 'pişik', 'sagat', 'sowuk', 'söýgi', 'surat', 'şeker',
  'tilki', 'ýigit', 'ýürek', 'deňiz', 'şäher', 'şeýle', 'taýak', 'tomus', 'palow', 'peýda',
  'zaman', 'ýüpek', 'gawun', 'aýdym', 'almaz', 'bedew', 'bägül', 'bilim', 'bulut', 'çeşme',
  'damja', 'derýa', 'doňuz', 'dünýä', 'galam', 'garga', 'gazan', 'gelin', 'hasap', 'howuz',
  'hünär', 'kelem', 'kirpi', 'laçyn', 'mekan', 'perde', 'sähra', 'sapak', 'semiz', 'sowal',
  'söweş', 'süýji', 'tebip', 'tigir', 'towuk', 'töleg', 'tüsse', 'umman', 'ýazgy', 'ýylan',
  'çopan', 'dükan', 'gujak', 'kelle', 'nagyş', 'tokaý', 'tozan', 'ussat', 'zenan', 'aşpez',
  'çemçe', 'dogan', 'gaýyk', 'kesel', 'körpe', 'möjek', 'polat', 'sekiz', 'sygyr', 'syçan',
  'teşne', 'ýaňak',
]

const words6 = [
  'barmak', 'baýrak', 'baýlyk', 'başlyk', 'bilbil', 'bugdaý', 'daýhan', 'deprek', 'görnüş', 'gudrat',
  'haýwan', 'kölege', 'köýnek', 'kirpik', 'meýdan', 'mekdep', 'peýnir', 'salkyn', 'sahypa', 'toprak',
  'tüýdük', 'wezipe', 'ýaprak', 'ýaşlyk', 'ýelken', 'ýyldyz', 'zähmet', 'zeýtun', 'adalat', 'belent',
  'bürgüt', 'derman', 'garpyz', 'maýmyn', 'mermer', 'palçyk', 'rugsat', 'rysgal', 'saglyk', 'serdar',
  'şägirt', 'towşan', 'ýabany', 'ýaglyk', 'ýumşak', 'zergär',
]

/** Uzunluga gore kelime havuzu. */
export const WORDS_BY_LENGTH: Record<WordLength, readonly string[]> = {
  4: words4,
  5: words5,
  6: words6,
}
