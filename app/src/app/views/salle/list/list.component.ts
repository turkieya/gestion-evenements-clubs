import { Component, OnInit } from '@angular/core';
import {SalleService} from '../../../services/salle.service';
import { FormBuilder, Validators , FormGroup } from '@angular/forms';
import { Salle } from 'src/app/model/salle';
import { AuthService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  Salle:any=[];
 SalleForm : FormGroup ;
  submitted = false;
  constructor(public authService: AuthService,private salleService:SalleService,private formBuilder: FormBuilder) {
    this.readSalle();
    this.SalleForm= this.formBuilder.group(
      { 
        num: ['', Validators.required],
        locale: ['', Validators.required],
        description: ['', Validators.required],
    }, );
    this.salleService.listen().subscribe((m:any)=>{
      console.log(m);
      this.readSalle(); 
    })
   }

  ngOnInit(): void {
  }
  readSalle(){
    this.salleService.getSalles().subscribe((data)=>{this.Salle=data;})
  }
 
 /* removeSalle(salle : Salle,index : any)
  {if(window.confirm('Are you sure ?')){
    this.salleService.getSalles().subscribe((data)=>{this.Salle=data;})
    console.log(this.Salle[index]);

    console.log(this.Salle[index]._id);
    this.salleService.deleteSalle(this.Salle[index]._id)
   
  }
  this.salleService.filter('register click');
 this.toastr.success('une salle est supprimé','succes')}*/
 removeSalle(salle : Salle,index : any)
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
        this.salleService.deleteSalle(this.Salle[index]._id);
        Swal.fire(
          'Supprimé!',
          'Salle a été supprimé.',
          'success'
        );
        this.salleService.filter('register click');
      }

    }).catch(() => {
      Swal.fire('Échoué!', 'Il y avait quelque chose qui n\'allait pas.');
    });
  }

 get f()
    {
      return this.SalleForm.controls;
    }
    onSubmit()
    {this.submitted= true ;
     if(this.SalleForm.invalid)
     {return;}
     else{
   this.salleService.addSalle(this.SalleForm.value).subscribe(
         (res)=>{
           console.log('Salle successfully created')
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
            title: 'Salle ajoutée avec succès'
          })
           this.salleService.filter('register click');
           this.submitted=false;
           this.SalleForm.reset();
         },(error)=>{
           console.log(error);
         }
       );
     
    }}
   onReset()
   {this.submitted=false;
    this.SalleForm.reset();
  
   }
   isAdmin():boolean
   {
     if(this.authService.RoleUser=="Admin")
     return true;
     else 
     return false;
 
   }
}
