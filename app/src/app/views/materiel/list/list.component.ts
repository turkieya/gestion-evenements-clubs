import { Component, OnInit } from '@angular/core';
import {MaterielService} from '../../../services/materiel.service';
import { Materiel } from 'src/app/model/materiel';
import { FormBuilder, Validators , FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  Materiel:any=[];
  MaterielForm : FormGroup ;
  submitted = false;
  constructor(public authService: AuthService,private matService:MaterielService,private formBuilder: FormBuilder) {
    this.readMateriel();
    this.MaterielForm= this.formBuilder.group(
      { 
           
        libelle: ['', Validators.required],
        quantite: ['', Validators.required],
        description: ['', Validators.required],
    }, );
    this.matService.listen().subscribe((m:any)=>{
      console.log(m);
      this.readMateriel();
     
    })
   }

  ngOnInit(): void {
  }
  readMateriel(){
    this.matService.getMateriels().subscribe((data)=>{this.Materiel=data;})
  }

 removeMateriel(materiel : Materiel,index : any)  {
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
        this.matService.deleteMateriel(this.Materiel[index]._id);
        Swal.fire(
          'Supprimé!',
          'Matériel a été supprimé.',
          'success' 
        );
        this.matService.filter('register click');
      }

    }).catch(() => {
      Swal.fire('Échoué!', 'Il y avait quelque chose qui n\'allait pas.');
    });
  }

 get f()
    {
      return this.MaterielForm.controls;
    }
    onSubmitMat()
    {this.submitted= true ;
     if(this.MaterielForm.invalid)
     {return;}
     else{
   this.matService.addMateriel(this.MaterielForm.value).subscribe(
         (res)=>{
           console.log('Materiel successfully created')
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
            title: 'Matériel ajouté avec succès'
          })

           this.matService.filter('register click');
           this.submitted=false;
           this.MaterielForm.reset();
         },(error)=>{
           console.log(error);
         }
       );
     
    }}
   onReset()
   {this.submitted=false;
    this.MaterielForm.reset();
   }
   isAdmin():boolean
   {
     if(this.authService.RoleUser=="Admin")
     return true;
     else 
     return false;
 
   }
  
}
