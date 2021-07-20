import { i18n } from "@lingui/core";
import catalogEn from "@lingui/loader!../locales/en/messages.po";
import catalogRu from "@lingui/loader!../locales/ru/messages.po";

const currentLang = JSON.parse(localStorage.getItem("jwt=data"));
const langKey = "lang";

const switchLang = (lang) => {
    switch (lang) {
      case "ru":
          i18n.load("ru", catalogRu.messages);
          i18n.activate("ru");
        break;
      case "en":
          i18n.load("en", catalogEn.messages);
          i18n.activate("en");
        break;
      default:
          i18n.load("en", catalogEn.messages);
          i18n.activate("en");
          lang = "en";
        break;
      }
    localStorage.setItem(langKey, lang);  
};

const defineLang = () => {
  if (currentLang?.lang){
    switchLang(currentLang.lang);
  }
  else if (localStorage.getItem(langKey)){
    switchLang(localStorage.getItem(langKey));
  }
  else {
    switchLang("en");
  }
};

export { switchLang, defineLang };
