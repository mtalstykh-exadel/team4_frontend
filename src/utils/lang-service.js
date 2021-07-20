import { i18n } from "@lingui/core";
import catalogEn from "@lingui/loader!../locales/en/messages.po";
import catalogRu from "@lingui/loader!../locales/ru/messages.po";

export class Lang {
  constructor(){
    this.systemLang;
    this.langKey = "lang";
    this.current = JSON.parse(localStorage.getItem("jwt=data"));
  }
  get() {
    if (this.current?.lang){
      this.set(this.current.lang);
    }
    else if (localStorage.getItem(this.langKey)){
      this.set(localStorage.getItem(this.langKey));
    }
    else {
      this.set("en");
    }
  }
  set(lang) {
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


