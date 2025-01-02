// utils/matchUtils.js
// Fungsi untuk mencocokkan kata kunci dengan sinonim kategori dan ukuran
export const findMatch = (input, synonymMapping) => {
  for (const [key, synonyms] of Object.entries(synonymMapping)) {
    if ([key, ...synonyms].some((syn) => input.includes(syn))) {
      return key;
    }
  }
  return null;
};
