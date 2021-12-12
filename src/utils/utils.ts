type generetedTranslatedForm = {
    nameRu: string;
    nameKz: string;
    nameEng: string;
};
export const utils = {
    generateTranslateForms: (
        ru: string,
        kz: string,
        en: string
    ): generetedTranslatedForm => ({
        nameRu: ru,
        nameKz: kz,
        nameEng: en,
    }),
    fixPdfName: (name: string): string => {
        return name.includes('::') ? name.split('::')[0] : name
    }
}