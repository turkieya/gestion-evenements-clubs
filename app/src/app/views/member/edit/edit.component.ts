import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from '../../../services/member.service';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/must-much.Validator';
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
  constructor(public formBuilder: FormBuilder, private UserService:MemberService , private actRoute : ActivatedRoute,private router:Router,private toastr:ToastrService) { 
      this.updateUser();
      let  id = this.actRoute.snapshot.paramMap.get('id');
      this.getUser(id);
      this.editForm= this.formBuilder.group(
        { 
          username: ['', Validators.required],
          numtel: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
      }, )
    }
    ngOnInit() {}
  get f()
    {
      return this.editForm.controls;
    }
    getUser(id:any){
      this.UserService.getMember(id).subscribe(data=> {
        this.editForm.patchValue({
          
          numtel: data['numtel'],
          email: data['email'],
          role: data['role'],
          password: data['password'],
          username: data['username'],
      } 
        )
      })
    }
    updateUser( ){
      this.editForm=this.formBuilder.group(
        {  
          username: ['', Validators.required],
            numtel: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
           password: ['', Validators.required],
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
             this.UserService.updateMember(id,this.editForm.value).subscribe(res=>{
              this.router.navigateByUrl('/acceuil/membre/liste_membres');
              console.log('content updated successfully!')
              this.toastr.success('la modification est effectuée','succes')},(error)=>{
                console.log(error)
              })
            Swal.fire(
              'Modifié!',
              'Membre a été modifié.',
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