import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOGIN, SIGN_UP, USERS_DATA } from '../interfaces/api-endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  baseURL = 'http://localhost:3500'
  constructor(private http: HttpClient) {}

  getSignUpData(data){
    return this.http.post(this.baseURL + SIGN_UP, data);
  }

  getLoginData(data){
    return this.http.post(this.baseURL + LOGIN, data);
  }

  getAllUsers(){
    return this.http.get(this.baseURL + USERS_DATA);
  }
}
