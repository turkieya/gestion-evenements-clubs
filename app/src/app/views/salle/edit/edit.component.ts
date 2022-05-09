import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SalleService} from '../../../services/salle.service';
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
  constructor(public formBuilder: FormBuilder, private salleService:SalleService , private actRoute : ActivatedRoute,private router:Router,private toastr:ToastrService) { 
      this.editSalle();
      let  id = this.actRoute.snapshot.paramMap.get('id');
      this.getSalle(id);
      this.editForm= this.formBuilder.group(
        { 
          num: ['', Validators.required],
          locale: ['', Validators.required],
          description: ['',Validators.required],
         
      },)
    }
    ngOnInit() {}
  get f()
    {
      return this.editForm.controls;
    }
    getSalle(id:any){
      this.salleService.getSalle(id).subscribe(data=> {
        this.editForm.patchValue({
          num: data['num'],
          locale: data['locale'],
          description: data['description'],
      } 
        )
      })
    }
    editSalle( ){
      this.editForm=this.formBuilder.group(
        {  
          num: ['', Validators.required],
          locale: ['', Validators.required],
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
               this.salleService.editSalle(id,this.editForm.value).subscribe(res=>{
                this.router.navigateByUrl('/acceuil/salle/liste_salles');
                console.log('content updated successfully!')
                this.toastr.success('la modification est effectuée','succes')},(error)=>{
                  console.log(error)
                })
              Swal.fire(
                'Modifié!',
                'Salle a été modifié.',
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
                }
               }
              }
   onReset()
   {this.submitted=false;
    this.editForm.reset();
  
   }
  }