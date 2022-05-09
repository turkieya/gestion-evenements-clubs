import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:4000/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  //currentUser = {};
  public currentUserSubject:BehaviorSubject<User>;
  public currentUser:Observable<User>;
  public loggedUser!: any;
  public emailloggedUser!: any;
  public RoleUser!: any;
  public idUser!: any;
  currentuser: any;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
    this.currentUserSubject=new BehaviorSubject<User>(JSON.parse(JSON.stringify(localStorage.getItem('currentUser')!)));
    this.currentUser=this.currentUserSubject.asObservable();
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `http://localhost:4000/user/register-user`;
  
    return this.http.post(api,user)

          .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`http://localhost:4000/user/signin`, user)
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      console.log(user);
      this.loggedUser=user.msg.username;
      this.emailloggedUser=user.msg.email;
      this.RoleUser=user.msg.role;
      this.idUser=user.msg._id;
      return user;
      ///.subscribe((res: any) => {
       // localStorage.setItem('access_token', res.token);
       // this.getUserProfile(res._id).subscribe((res) => {
         // this.currentUser = res;
        //  this.router.navigate(['user-profile/' + res.msg._id]);
      //  })
      }));
  }

  public get currentUserValue():User{
    return this.currentUserSubject.value;
  }
  getToken() {
    //return !!localStorage.getItem('access_token');
    return this.currentuser = JSON.parse(localStorage.getItem('currentUser')!);

  }

 /*get  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }*/

  IsLoggedIn():string{
    return JSON.parse(localStorage.getItem(this.loggedUser)!);
  }
/*
  isLogged():boolean{
    let token = localStorage.getItem("token");
    if (token){
      return true;
    } else {
      return false;
    }
  }*/

  doLogout() {
    let removeToken = localStorage.removeItem('currentUser');
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
  }

  // User profile
  getUserProfile(id:any): Observable<any> {
    let api = `http://localhost:4000/user/user-profile/:`+id;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}