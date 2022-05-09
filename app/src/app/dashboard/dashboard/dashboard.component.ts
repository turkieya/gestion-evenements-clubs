import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authentification.service';
import {User} from 'src/app/model/user';
import { MemberService } from 'src/app/services/member.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nom!:String;
  currentuser: User;
  constructor(
    public authService: AuthService,public MemberService:MemberService,
    private actRoute: ActivatedRoute,private permissionsService: NgxPermissionsService,private http:HttpClient

  ) {  /*  let id = this.actRoute.snapshot.paramMap.get('id');
  this.authService.getUserProfile(id).subscribe(res => {
    console.log(this.currentuser);
    this.currentuser = res.msg;
    })*/
    this.currentuser = JSON.parse(localStorage.getItem('currentUser')!);

  }

  ngOnInit(): void {
    //this.currentUserValue()

  }
  logout(){
    this.authService.doLogout();
  }
  membres(){
    this.MemberService.getmembers();
  }

  isAdmin():boolean
  {
    if(this.authService.RoleUser=="Admin")
    return true;
    else 
    return false;

  }
  isMembre():boolean
  { 
    if(this.authService.RoleUser=="Membre")
    return true;
    else 
    return false;

  }

 /*getusername():String{
//.username=this.authService.getUserProfile(this.currentuser.id).subscribe((data));
  return this.currentuser.username;
}
public  currentUserValue():any{
   this.authService.currentUserSubject.subscribe((value)=>{
    this.nom=value.email;
    console.log(this.nom);
    return this.currentuser=value;
   });
}*/
}


