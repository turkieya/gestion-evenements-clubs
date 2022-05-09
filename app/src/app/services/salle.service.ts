import { Injectable } from '@angular/core';
import {Observable,throwError ,Subject }from 'rxjs';
import {catchError , map} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  baseUri = "http://localhost:4000/salle";
  private getOneSalleUrl = "http://localhost:4000/salle/salle-detailles/"
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }
//ADD SALLE
 addSalle(data: any):Observable<any>{
  let url ='http://localhost:4000/salle/add-salle';
  return this.http.post(url,data);
}
  //LISTE SALLES
  getSalles(){
    return this.http.get('http://localhost:4000/salle/liste-salles');
  }
  //GETSALLE
  getSalle(id: any) {
    return this.http.get<any>(this.getOneSalleUrl + id)
  }
  //EDIT SALLE
  editSalle(id : any,data : any):Observable<any>{
    let url='http://localhost:4000/salle/edit-salle/'+id;
    return this.http.put(url ,data, {headers:this.headers}).pipe(catchError(this.errorMgmt))}
//DELETE SALLE
  deleteSalle( id : any) {
   let endPoints = id
   this.http.delete('http://localhost:4000/salle/delete-salle/'+ endPoints).subscribe(data => {
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
