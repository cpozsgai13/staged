import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL_HTTPS } from '../constants';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = BASE_URL_HTTPS;
  private loginUrl = BASE_URL_HTTPS + '/login'; 
  private echoUrl = BASE_URL_HTTPS + '/echo';
  private mockUrlUserList = "http://localhost:3000/users";
  constructor(private http: HttpClient) { }

  public echo(): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    let options = {headers: headers};
    return this.http.get(this.echoUrl, options);
  }

  public getUserList(): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    let options = {headers: headers};
    const url = this.baseUrl + '/users';
    return this.http.get(url, options);
  }

  public loginUser(login_data: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    let options = {headers: headers};
    console.log(`Login using url: ${this.loginUrl}`);
    return this.http.post(this.loginUrl, login_data, options);
  }

  public registerUser(register_data: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    let options = {headers: headers, withCredentials: true};
    const url = this.baseUrl + '/register';
    
    return this.http.post(url, register_data, options);
  }

  async getUserListMock(): Promise<string[]> {
    const res = await fetch(this.mockUrlUserList, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json_data = await res.json();
    console.log(JSON.stringify(res));
    return json_data.users ?? [];
  }

  // public loginUser(login_data: any): any {
  //   let headers = new HttpHeaders(
  //     {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'GET, POST, PUT',
  //       'Access-Control-Allow-Headers': 'Content-Type'
  //     }
  //   );
  //   let options = {headers: headers};
  //   const resp = this.http.post(this.apiUrl, login_data, options).subscribe(
  //     (data) => {
  //       console.log("Got response: " + JSON.stringify(data));
  //     }
  //   );
  // }  
}