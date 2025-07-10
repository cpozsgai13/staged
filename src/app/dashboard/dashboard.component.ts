import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  users:any[]=[];
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.getAllusers();
  }

  getAllusers() {
    let users = ['admin', 'Chris', 'Nick'];
    return users;
    // debugger;
    // this.http.get('https://freeapi.gerasim.in/api/User/GetAllUsers').subscribe((res:any) => {
    //   this.users = res.data;
    // } , error => {
    //   alert("Error From API")
    // })
  }

}
