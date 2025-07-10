import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { RegisterPopupComponent } from '../register-popup/register-popup.component';
import { Login } from '../classes/Login';
import { Registration } from '../classes/Registration';
import { UserService } from '../services/user.service';
import { HomeComponent } from '../home/home';
import { forkJoin, timer } from 'rxjs';
import { AudioService } from '../services/audio.service';
import { CryptoService } from '../services/crypto.service';
declare const gapi: any;

const sleepMillis = (millis: number) => new Promise((r) => setTimeout(r, millis));

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginPopupComponent, RegisterPopupComponent, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [],
})
export class LoginComponent {
  isLoginVisible: boolean = false;
  isRegisterVisible: boolean = false;
  loginObj: Login|undefined = undefined;
  isLoggedIn: boolean = false;
  userId: number|undefined = undefined;
  userName: string|undefined = undefined;
  auth2: any;
  users: Set<string> = new Set<string>();
  mock: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  userService: UserService = inject(UserService);
  loginService: LoginService = inject(LoginService);
  audioService: AudioService = inject(AudioService);
  cryptoService: CryptoService = inject(CryptoService);

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    let id = this.route.snapshot.params['id'];
    if(id != 'undefined') {
      this.userId = Number(id);
    }
    this.isLoginVisible = false;
    this.isRegisterVisible = false;
    this.isLoggedIn = false;

    // let enc = this.cryptoService.encrypt('password1234');
    // let dec = this.cryptoService.decrypt(enc);
    this.loadUsers();
  }
  
  onRegister() {
    this.isRegisterVisible = true;
    this.isLoginVisible = false;
  }
      
  onClosePopup() {
    this.isLoginVisible = false;
    this.isRegisterVisible = false;
  }

  onCloseRegistration() {
    this.isRegisterVisible = false;
    this.isLoginVisible = false;
  }

  navigateHome(): void {
    console.log(`Navigating to user ${this.userName}  id ${this.userId} home`);
    this.ngZone.run(() => {
      console.log("In zone - navigate to home");
      this.router.navigate(['home', this.userId]);
    });
  }

  onLogin(): void {
    this.isLoginVisible = true;
    this.isRegisterVisible = false;
  }

  handleEcho(): void {
    //  Echo test works
    this.loginService.echo().subscribe(
      (res) => {
        console.log("Echo response: " + res);
      }
    );
  }

  loadUsers(): void {
    if(this.mock) {
      this.loginService.getUserListMock()
        .then((userList) => {
          for(const user in userList) {
            this.users.add(userList[user]);
          }
        });
    } else {
      this.loginService.getUserList().subscribe({
        next: (res: any) => {
          const userNames = res as Array<string>;
          for(const user in userNames) {
            this.users.add(user);
          }
          console.log(`Loaded ${this.users.size} Users`);
        },
        error: (error: any) => {
          console.log("Error retrieving user list " + JSON.stringify(error.message));
        },
        complete: () => {
          console.log("Load Users Complete");
        }
      });

    }

  }

  handleLoginSubmit($event: Login): void {
    if(!$event || !$event.name || !$event.password) {
      return;
    }
    //  Fork join will run in order and return a vector of responses in res.
    forkJoin(
      [this.loginService.loginUser($event), this.userService.getUserId($event.name)]
    ).subscribe((res) => {
      if(res) {
        console.log("Got fork response " + JSON.stringify(res));

        this.isLoggedIn = res[0];
        if(this.isLoggedIn) {
          this.userId = Number(res[1][0].id);
          this.userName = $event.name;
          this.loginObj = {
            id: this.userId,
            name: $event.name,
            password: $event.password,
            loggedIn: this.isLoggedIn
          };
          this.audioService.playLoginSuccess();
          this.navigateHome();
        } else {
          console.log("Login failed");
          this.isLoginVisible = false;
          this.audioService.playLoginFailure();
        }
      }
    });
  }

  handleRegistration($event: Registration): void {
    try {
      this.loginService.registerUser($event).subscribe({
        next: (res: any) => {
          console.log("Got res " + res);
          alert("User " + res.name + "added");
        },
        error: (error: any) => {
          console.log("Got error " + error);
          const userName = $event.name;
          if(error.status == 409) {
            const msg = 'User ${userName} already exists';
            alert(msg);
          } else {
            alert(error.message);
          }
        },
        complete: () => {
          console.log("Done");
        }
      });
  
    } catch(e) {
      console.log(e);
    } finally {
      console.log("finally -> done registration submit");
    }

  }
}
