import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }


  // service that calls to the create account API from the server to database
  postAccounts(accountType: boolean, firstName: string, lastName: string, username: string, phoneNum: string, email: string, password: string) {
    const user = {accountType, firstName, lastName, username, phoneNum, email, password};
    return this.http.post(`${this.apiUrl}/createAccount`, user);
  }

  // service that calls to the authentication API from the server to database
  loginAccount(username: string, password: string) {
    const user = {username, password};
    return this.http.post(`${this.apiUrl}/authenticate`, user);
  }
  
}
