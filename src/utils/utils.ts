import {language} from "@/store/interfaces";

export type generetedTranslatedForm = {
    nameRu: string;
    nameKz: string;
    nameEng: string;
    nameKaz?: string;
    nameRus?: string;
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
    },
    translate(stringObject: generetedTranslatedForm, currentLanguage: language):string {
        switch (currentLanguage){
            case 'en':
                return stringObject.nameRu
            case 'kz':
                return stringObject.nameKaz
            default:
                return stringObject.nameRus
        }
    }
}
