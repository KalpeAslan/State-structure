interface ITranslate {
  nameRu: string;
  nameKz: string;
  nameEng: string;
}

import store from "@/store";
console.log(store);
export const translate = function (translate: ITranslate) {
  switch (store.getters.GET_CURRENT_LANGUAGE) {
    case "ru":
      return translate.nameRu;
    case "kz":
      return translate.nameKz;
    case "en":
      return translate.nameEng;
  }
};
