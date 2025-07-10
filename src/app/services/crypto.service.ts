import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  privateKey: string = 'AAARF';
  constructor() { }

  public encrypt(password: string) : string {
    return CryptoJS.AES.encrypt(password, this.privateKey).toString();
  }

  public decrypt(encPassword: string): string {
    return CryptoJS.AES.decrypt(encPassword, this.privateKey).toString(CryptoJS.enc.Utf8);
  }
}
