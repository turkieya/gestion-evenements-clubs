import { Injectable } from '@angular/core';
import {Observable,throwError,Subject }from 'rxjs';
import {catchError , map} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root' 
})
export class MaterielService {

  baseUri = "http://localhost:4000/materiel";
  private getOneMaterielUrl = "http://localhost:4000/materiel/materiel-fiche/"
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { } 
//ADD MATERIEL
 addMateriel(data: any):Observable<any>{
  let url ='http://localhost:4000/materiel/add-materiel';
  return this.http.post(url,data);
}
  //LISTE MATERIELS
  getMateriels(){
    return this.http.get('http://localhost:4000/materiel/liste-materiels');
  }
  //getMember
  getMateriel(id: any) {
    return this.http.get<any>(this.getOneMaterielUrl + id)
  }
  //EDIT MATERIEL
  editMateriel(id : any,data : any):Observable<any>{
    let url='http://localhost:4000/materiel/edit-materiel/'+id;
    return this.http.put(url ,data, {headers:this.headers}).pipe(catchError(this.errorMgmt))}

  deleteMateriel( id : any) {
   let endPoints = id
   this.http.delete('http://localhost:4000/materiel/delete-materiel/'+ endPoints).subscribe(data => {
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
