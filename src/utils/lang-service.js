import { i18n } from "@lingui/core";
import catalogEn from "@lingui/loader!../locales/en/messages.po";
import catalogRu from "@lingui/loader!../locales/ru/messages.po";

class Lang {
  get() {
    const current = JSON.parse(localStorage.getItem("jwt=data"));
    this.set(current.lang);
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
    }
  }
}

export default new Lang();
