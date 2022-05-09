import { Injectable } from '@angular/core';
import {Observable,throwError,Subject }from 'rxjs';
import {catchError , map} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  
  baseUri = "http://localhost:4000/demande";
  private getOneDemandeUrl = "http://localhost:4000/demande/demande/"
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }
//ADD demande
 addDemande(data: any):Observable<any>{
  let url ='http://localhost:4000/demande/add-demande';
  return this.http.post(url,data);
}
  //LISTE demande
  getDemandes(){
    return this.http.get('http://localhost:4000/demande/liste-demandes');
  }
  //getDemande
  getDemande(id: any) {
    return this.http.get<any>(this.getOneDemandeUrl + id)
  }
  //EDIT Demande
  editDemande(id : any,data : any):Observable<any>{
    let url='http://localhost:4000/demande/edit-demande/'+id;
    return this.http.put(url ,data, {headers:this.headers}).pipe(catchError(this.errorMgmt))}

  deleteDemande( id : any) {
   let endPoints = id
   this.http.delete('http://localhost:4000/demande/delete-demande/'+ endPoints).subscribe(data => {
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

