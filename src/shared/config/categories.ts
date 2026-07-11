/** Kelime kategorileri — tek yerden ayarlanabilir. */

export const WORD_CATEGORIES = {
  umumy: "Umumy", // abstrakt / sypat / galanlar
  adamlar: "Adamlar", // maşgala, hünär, ynsan atlary
  beden: "Beden", // beden agzalary
  esbap: "Esbap", // gurallar, öý goşlary, egin-eşik
  yer: "Ýer", // ýerler, mekanlar
  at: "At", // adam atlary
  haywan: "Haýwan",
  sport: "Sport", // sport görnüşi + toparlar
  karhana: "Kärhana", // kompaniýa / brend
  miwe: "Miwe",
  nahar: "Nahar",
  tebigat: "Tebigat",
} as const

export type WordCategoryId = keyof typeof WORD_CATEGORIES

export function categoryLabel(id: WordCategoryId): string {
  return WORD_CATEGORIES[id]
}
