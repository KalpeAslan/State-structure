interface ITranslate {
  nameRus?: string;
  nameKaz?: string;
  nameRu?: string;
  nameKz?: string;
  nameEng: string;
}

import store from "@/store";
export const translate = function (translate: ITranslate) {
  switch (store.getters.GET_CURRENT_LANGUAGE) {
    case "ru":
      return translate.nameRus ? translate.nameRus : translate.nameRu;
    case "kz":
      return translate.nameKaz ? translate.nameKaz : translate.nameKz;
    case "en":
      return translate.nameEng;
  }
};
