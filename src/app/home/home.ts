import { Component, input, inject, NgZone } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService: UserService = inject(UserService);
  userId = -1;
  userName = '';
  photos: string [] = [];

  constructor(private router: Router, private ngZone: NgZone) {
    console.log("Home constructor");
    this.userId = Number(this.route.snapshot.params['id']);
    if(this.userId > 0) {

      this.userService.getUserName(this.userId).subscribe({
        next: (res: any) => {
          this.userName = res[0].name;
          console.log(`Loaded ${this.userName} from id`);
        },
        error: (error: any) => {
          console.log("Error retrieving user id " + JSON.stringify(error.message));
        },
        complete: () => {
          console.log(`getUserId Complete -> ${this.userId}`);
        }

      });

      this.userService.getUserPhotoURLs(this.userId).subscribe({
        next: (res: any) => {
          this.photos = res[0].photos as string [];
          console.log("Got photos " + JSON.stringify(res));
        },
        error: (error: any) => {
          console.log("Error retrieving photos " + JSON.stringify(error.message));
        },
        complete: () => {
          console.log(`getUserPhotoURLs Complete -> ${this.userId}`);
        }

      });
    }
  }

  logout() : void {
    this.router.navigate(['login']);
  }

}
export default HomeComponent;


