import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MaterielService} from '../../../services/materiel.service';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm : FormGroup;
  submitted = false;
  UserData :any=[];
  constructor(public formBuilder: FormBuilder, private MatService:MaterielService , private actRoute : ActivatedRoute,private router:Router,private toastr:ToastrService) { 
      this.editMateriel();
      let  id = this.actRoute.snapshot.paramMap.get('id');
      this.getMatriel(id);
      this.editForm= this.formBuilder.group(
        { 
          libelle: ['', Validators.required],
          quantite: ['', Validators.required],
          description: ['',Validators.required],
         
      },)
    }
    ngOnInit() {}
  get f()
    {
      return this.editForm.controls;
    }
    getMatriel(id:any){
      this.MatService.getMateriel(id).subscribe(data=> {
        this.editForm.patchValue({
          libelle: data['libelle'],
          quantite: data['quantite'],
          description: data['description'],
      } 
        )
      })
    }
    editMateriel( ){
      this.editForm=this.formBuilder.group(
        {  
          libelle: ['', Validators.required],
          quantite: ['', Validators.required],
          description: ['', Validators.required],
      }
        
      )
    }
    
       onSubmit() {
        {
          this.submitted = true; 
          if(this.editForm.invalid)
          {return;}
          else{
          Swal.fire({
            title: 'Voulez-vous enregistrer les modifications ?',
            text: 'Vous ne pourrez pas revenir en arrière ! ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, modifiez-le ! ',
            timer: 30000,
          }).then((result : any) => {
            if (result.value) {
               let id=this.actRoute.snapshot.paramMap.get('id');
               this.MatService.editMateriel(id,this.editForm.value).subscribe(res=>{
                this.router.navigateByUrl('/acceuil/materiel/liste_materiels');
                console.log('content updated successfully!')
                this.toastr.success('la modification est effectuée','succes')},(error)=>{
                  console.log(error)
                })
              Swal.fire(
                'Modifié!',
                'Matériel a été modifié.',
                'success'
              );
            }
          }).catch(() => {
            Swal.fire('Échoué!', 'Il y avait quelque chose qui n\'allait pas.');
          });
                  if (this.editForm.invalid) {
                    console.log('Invalid') ;
                      return;
                  }
                }}
               }
   onReset()
   {this.submitted=false;
    this.editForm.reset();
  
   }
  }