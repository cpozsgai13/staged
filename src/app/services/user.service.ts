import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL_HTTPS } from '../constants';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = BASE_URL_HTTPS;
  private usersUrl = BASE_URL_HTTPS + '/users'; 
  private baseMockUrl = 'http://localhost:3000';
  private mockUrlUserList = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

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

  public getUserName(id: number): Observable<any> {
    return this.getMockUserName(id);
  }

  public getUserId(name: string): Observable<any> {
    return this.getMockUserId(name);
  }

  public getMockUserId(name: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    let params = {'name': name};
    let options = {headers: headers, params: params};
    
    const url = this.baseMockUrl + '/userInfo';
    console.log(`getMockUserId ${name} ${url} ${JSON.stringify(params)}`)
    return this.http.get(url, options);
  }

  public getMockUserName(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    let params = {'id': id};
    let options = {headers: headers, params: params};
    
    const url = this.baseMockUrl + '/userInfo';
    console.log(`getMockUserName ${id} ${url}`)
    return this.http.get(url, options);
  }

  public getUserPhotoURLs(id: number): Observable<any> {
    return this.getMockUserPhotoURLs(id);
  }

  public getMockUserPhotoURLs(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    let params = {'id': id};
    let options = {headers: headers, params: params};
    
    const url = this.baseMockUrl + '/photos';
    return this.http.get(url, options);
  }

}