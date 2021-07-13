class JWT{
    constructor(){
        this.jwtKey = "jwt=data";
        this.data;
    }
    parse(token){
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c){
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        this.data = JSON.parse(jsonPayload);
        this.save();
    }
    save(){
        localStorage.setItem(this.jwtKey, JSON.stringify(this.data));
    }
    get(){
        return localStorage.getItem(JSON.parse(this.jwtKey));
    }
}

export default new JWT();
