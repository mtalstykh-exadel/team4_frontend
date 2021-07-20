import { i18n } from "@lingui/core";
import catalogEn from "@lingui/loader!../locales/en/messages.po";
import catalogRu from "@lingui/loader!../locales/ru/messages.po";

export class LangService {
  constructor(){
    this.currentLang = JSON.parse(localStorage.getItem("jwt=data"));
    this.langKey = "lang";
  }
  defineLang() {
    if (this.currentLang?.lang){
      this.saveLang(this.currentLang.lang);
    }
    else if (localStorage.getItem(this.langKey)){
      this.saveLang(localStorage.getItem(this.langKey));
    }
    else {
      this.saveLang("en");
    }
  }
  saveLang(lang) {
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
    localStorage.setItem(this.langKey, lang);  
  }
}


