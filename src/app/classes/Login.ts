export class Login { 
    id: number|undefined = undefined;
    name: string = '';
    password: string = '';
    loggedIn: boolean = false;
    constructor() {
      this.loggedIn = false;
    } 
}
