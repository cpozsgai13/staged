import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Registration } from '../classes/Registration';

@Component({
  selector: 'app-register-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-popup.component.html',
  styleUrl: './register-popup.component.css'
})
export class RegisterPopupComponent {
  @Output() submit = new EventEmitter<Registration>();

  onRegister(name: string, first: string, last: string, email: string, password: string, use_2fa: boolean): void {
    let registration = new Registration();
    registration.password = password;
    registration.name = name;
    registration.first = first;
    registration.last = last;
    registration.email = email;
    registration.use_2fa = use_2fa;
    this.submit.emit(registration);
  }

  onClose(): void {
  }
}
