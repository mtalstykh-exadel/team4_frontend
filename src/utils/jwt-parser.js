import jwt_decode from "jwt-decode";

export class JWT {
  constructor() {
    this.jwtKey = "jwt=data";
    this.data;
  }
  parse(token) {
    this.data = jwt_decode(token);
    this.save();
  }
  save() {
    localStorage.setItem(this.jwtKey, JSON.stringify(this.data));
  }
  get() {
    return JSON.parse(localStorage.getItem(this.jwtKey));
  }
  remove() {
    localStorage.removeItem(this.jwtKey);
  }
}

