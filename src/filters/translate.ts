interface ITranslate {
  nameRus?: string;
  nameKaz?: string;
  nameRu?: string;
  nameKz?: string;
  nameEng: string;
  textRu: string;
  textKz: string;
  textEng: string;
}

import store from "@/store";
export const translate = function (translate: ITranslate) {
  switch (store.getters.GET_CURRENT_LANGUAGE) {
    case "ru":
      return translate.nameRus || translate.nameRu || translate.textRu;
    case "kz":
      return translate.nameKaz || translate.nameKz || translate.textKz;
    case "en":
      return (
        translate.nameEng ||
        translate.nameRus ||
        translate.nameRu ||
        translate.textEng
      );
  }
};
