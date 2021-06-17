import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginViewModel } from './login-view-model';
import { SignUpViewModel } from './sign-up-view-model';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient: HttpClient;

  constructor(private httpBackend:HttpBackend,private jwtHelperService: JwtHelperService) 
  {

  }

  currentUserName:string = "";

  public Login(loginViewModel: LoginViewModel):Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>("/authenticate",loginViewModel,{responseType:"json",
     observe: "response"})
    .pipe(map(response => {
      if(response)
      {
        this.currentUserName = response.body.userName;
        sessionStorage.currentUser = JSON.stringify(response.body);
        sessionStorage.XSRFRequestToken = response.headers.get("XSRF-REQUEST-TOKEN");
      }
      return response.body;
    }));
  }
  public Register(signUpViewModel: SignUpViewModel):Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>("/register",signUpViewModel,{responseType:"json",
     observe: "response"})
    .pipe(map(response => {
      if(response)
      {
        this.currentUserName = response.body.userName;
        sessionStorage.currentUser = JSON.stringify(response.body);
        sessionStorage.XSRFRequestToken = response.headers.get("XSRF-REQUEST-TOKEN");
      }
      return response.body;
    }));
  }

  getUserByEmail(Email: string): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>("/api/getUserByEmail/" + Email, { responseType: "json" });
  }

  public Logout()
  {
    sessionStorage.removeItem("currentUser");
    this.currentUserName = "";
  }

  public isAuthenticated() : boolean
  {
    var token = sessionStorage.getItem("currentUser")? 
    JSON.parse(sessionStorage.getItem("currentUser")!).token : null;
    if (this.jwtHelperService.isTokenExpired(token))
    {
      return false; //token is not valid
    }
    else
    {
      return true; //token is valid
    }
  }
}
