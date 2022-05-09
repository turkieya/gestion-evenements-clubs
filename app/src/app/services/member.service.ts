import { Injectable } from '@angular/core';
import {Observable,throwError }from 'rxjs';
import {catchError , map} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUri = "http://localhost:4000/user";
  private getOneUserUrl = "http://localhost:4000/user/user-profile/"
  headers = new HttpHeaders().set('Content-Type','application/json');
  baseUrl='http://localhost:4000/user/';
  //const optionRequete ={
    //headers: new HttpHeaders({
     // 'Access-Control-Allow-Origin':'*',
      //'mon-entete-personnalise':'maVleur'
    //})
  //};

  constructor(private http:HttpClient) { }
//create 
CreateMember(data: any):Observable<any>{

  return this.http.post(this.baseUrl + 'register-user', data);

}
 /*CreateMember(data: any):Observable<any>{
  let url ='http://localhost:4000/user/register-user';
  return this.http.post(url,data);
}*/
  //getAllMembers
  getmembers(){
    return this.http.get('http://localhost:4000/user/');
  }
  //getMember
  getMember(id: any) {
    return this.http.get<any>(this.getOneUserUrl + id)
  }

  /*getMember(id: string):Observable<any>{
    let url ='http://localhost:4000/user/user-profile/'+id;
    return this.http.get(url,{headers: this.headers}).pipe(map((res:Response)=>{ return res ||{}}),
    catchError(this.errorMgmt))
  }*/
  //Update Member
  updateMember(id : any,data : any):Observable<any>{
let url='http://localhost:4000/user/update/'+id;
return this.http.put(url ,data, {headers:this.headers}).pipe(catchError(this.errorMgmt))}
//Delete Member
/*deleteMember(id :any):Observable<any>{
  let url ='http://localhost:4000/user/delete-user/'+id ;
  return this.http.delete(url,{headers: this.headers}).pipe(catchError(this.errorMgmt))
}*/
deleteMember( id : any) {
  let endPoints = id
  this.http.delete('http://localhost:4000/user/delete-user/'+ endPoints).subscribe(data => {
    console.log(data);
  });
}
//error handling
errorMgmt(error: HttpErrorResponse){
  let errorMessage='';
  if (error.error instanceof ErrorEvent){
    errorMessage =error.error.message;
  } else {
    errorMessage='Error code :${error.status} \n Message:${error.message}';
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
private _listeners = new Subject<any>();
listen():Observable<any>{
  return this._listeners.asObservable();
}
filter(filterBy:string){
  this._listeners.next(filterBy);
}
}
