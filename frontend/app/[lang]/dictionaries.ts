import "server-only"

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  hi: () => import("./dictionaries/hi.json").then((module) => module.default),
  mr: () => import("./dictionaries/mr.json").then((module) => module.default),
  gu: () => import("./dictionaries/gu.json").then((module) => module.default),
  ta: () => import("./dictionaries/ta.json").then((module) => module.default),
  te: () => import("./dictionaries/te.json").then((module) => module.default),
  kn: () => import("./dictionaries/kn.json").then((module) => module.default),
}

export const getDictionary = async (locale: keyof typeof dictionaries) => dictionaries[locale]?.() ?? dictionaries.en()
