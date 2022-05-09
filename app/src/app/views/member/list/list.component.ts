import { Component, OnInit } from '@angular/core';
import {MemberService} from '../../../services/member.service';
import { User } from 'src/app/model/user';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MustMatch} from '../../../_helpers/must-much.Validator';
import { AuthService } from 'src/app/services/authentification.service';
import { SendEmailService } from 'src/app/services/send-email.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private currentUserSubject:BehaviorSubject<User>;
  public currentUser:Observable<User>;
  User:any=[];
  role:any;
 MemberForm : FormGroup ;
  submitted = false;
  constructor(private emailservice:SendEmailService,public authService: AuthService,private UserService:MemberService,private formBuilder: FormBuilder, private MemberService:MemberService ) {
    this.currentUserSubject=new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')|| '{}'));
    this.currentUser=this.currentUserSubject.asObservable();
    this.readUser();
    this.role="Membre";
    this.MemberForm= this.formBuilder.group(
      { 
           
        username: ['', Validators.required],
        numtel: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
    this.MemberService.listen().subscribe((m:any)=>{
      console.log(m);
      this.readUser();
     
    })
    
   }

  ngOnInit(): void {
  }
  readUser(){
    this.UserService.getmembers().subscribe((data)=>{this.User=data;})
  }

 removeUser(user : User,index : any)
  {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière ! ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le ! ',
      timer: 30000,
    }).then((result : any) => {
      if (result.value) {
        this.UserService.deleteMember(this.User[index]._id);
        this.emailservice.SendremoveMember(this.User[index]).subscribe((res)=>{
          console.log('email envoyé');},(error)=>{console.log(error);}
          );
        Swal.fire(
          'Supprimé!',
          'Membre a été supprimé.',
          'success'
        );
        this.MemberService.filter('register click');
      }

    }).catch(() => {
      Swal.fire('Échoué!', 'Il y avait quelque chose qui n\'allait pas.');
    });
  }
 get f()
    {
      return this.MemberForm.controls;
    }
   onSubmit()
   {this.submitted= true ;
    if(this.MemberForm.invalid)
    {return;}
    else{
  this.MemberService.CreateMember(this.MemberForm.value,).subscribe(
        (res)=>{ this.emailservice.Sendinformation(this.MemberForm.value).subscribe((res)=>{
          console.log('email envoyé');},(error)=>{console.log(error);}
          );
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Membre ajouté avec succès'
          })

          console.log('Member successfully created')
          this.MemberService.filter('register click');
          this.submitted=false;
          this.MemberForm.reset();
        },(error)=>{
          console.log(error);
        }
      );
   }
   }
   onReset()
   {this.submitted=false;
    this.MemberForm.reset();
  
   }
   isAdmin():boolean
   {
     if(this.authService.RoleUser=="Admin")
     return true;
     else 
     return false;
 
   }
   taille():boolean
   {
   if (this.User.length==0)
   return true;
   else 
   return false;
   }

}


