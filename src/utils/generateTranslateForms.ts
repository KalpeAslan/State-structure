type generetedTranslatedForm = {
  nameRu: string;
  nameKz: string;
  nameEng: string;
};
export const generateTranslateForms = (
  ru: string,
  kz: string,
  en: string
): generetedTranslatedForm => ({
  nameRu: ru,
  nameKz: kz,
  nameEng: en,
});
