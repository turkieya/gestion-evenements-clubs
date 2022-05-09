import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  baseUrl = 'http://localhost:4000/events/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  window: any;
  allEvents!:any[];

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  // Add Event to Calender//
  addEvent(event : any) {
    return this.http.post(this.baseUrl + 'add_events', event);
  }
    //LISTE EVENTS
    getEvents(){
      return this.http.get('http://localhost:4000/events/get_events');
    }

  // Get All Events //
  getAllEvents() {
    return this.http.get(this.baseUrl + 'get_events').
      pipe(
        map((data: any) => {
          console.log(data);
          return data;
        }), catchError(error => {
          return throwError('Something went wrong');
        })
      );
  }

  // Delete Single Event//
  deleteSingleEvent(id : any) {
    return this.http.delete(this.baseUrl + 'delete_event/' + id).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong');
        })
      );
  }
  deleteEvent( id : any) {
    let endPoints = id
    this.http.delete('http://localhost:4000/events/delete_event/'+ endPoints).subscribe(data => {
      console.log(data);
    });
  }

  private _listeners = new Subject<any>();
  listen():Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy:string){
    this._listeners.next(filterBy);
  }
  
}

