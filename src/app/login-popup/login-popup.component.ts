import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Login } from '../classes/Login';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css'
})
export class LoginPopupComponent {
  @Input() user: string|null = null;
  @Output() submit = new EventEmitter<Login>();
  username: string|null = null;
  password: string|null = null;

onClose(): void {
}

onLogin(user: any, password: any): void {
  //  Get the input values
  let login = new Login();

  login.name = user.value;
  login.password = password.value;
  login.loggedIn = false;
  login.id = -1;

  this.submit.emit(login);
}
}
