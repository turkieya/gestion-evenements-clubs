import { Injectable } from '@angular/core';
import {Observable,throwError }from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  constructor(private http:HttpClient) { }
  Sendacceptation(data: any):Observable<any>{
    return this.http.post('http://localhost:4000/email/sendmails',data);
  }
  Sendannulation(data: any):Observable<any>{
    return this.http.post('http://localhost:4000/email/sendmail/annul_event',data);
  }
  Sendinformation(data: any):Observable<any>{
    return this.http.post('http://localhost:4000/send/sendmailmember',data);
  }
  SendremoveMember(data: any):Observable<any>{
    return this.http.post('http://localhost:4000/email/sendmailmemberremove',data);
  }
}
