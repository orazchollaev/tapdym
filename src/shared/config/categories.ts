/** Kelime kategorileri — tek yerden ayarlanabilir. Her kategoriýa manyly ipuç bolmaly. */

export const WORD_CATEGORIES = {
  adamlar: "Adamlar", // maşgala, hünär
  at: "At", // adam atlary
  beden: "Beden", // beden agzalary
  haywan: "Haýwan", // haýwanlar
  guş: "Guş", // guşlar
  miwe: "Miwe", // miweler
  gök: "Gök önüm", // gök önümler
  nahar: "Nahar", // tagamlar
  esbap: "Esbap", // gurallar, öý goşlary
  eşik: "Eşik", // egin-eşik
  ulag: "Ulag", // ulaglar
  yer: "Ýer", // ýerler, mekanlar
  tebigat: "Tebigat", // tebigat
  pasyl: "Pasyl", // paslar, howa
  reňk: "Reňk", // reňkler
  sypat: "Sypat", // sypatlar
  duýgy: "Duýgy", // duýgular
  sport: "Sport", // sport
} as const

export type WordCategoryId = keyof typeof WORD_CATEGORIES

export function categoryLabel(id: WordCategoryId): string {
  return WORD_CATEGORIES[id]
}
