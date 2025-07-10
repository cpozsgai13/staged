import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  loginSoundFile: string = '/assets/sound/login-sound-1.wav';
  loginErrorFile: string = '/assets/sound/access_denied.wav';
  constructor() { }

  playFile(src: any): void {
    const audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }

  playLoginSuccess() : void {
    this.playFile(this.loginSoundFile);
  }

  playLoginFailure() : void {
    this.playFile(this.loginErrorFile);
  }
}
