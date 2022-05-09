import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DemandeService } from '../../../services/demande.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalleService } from 'src/app/services/salle.service';
import { MaterielService } from 'src/app/services/materiel.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  ev:any=[];
  mat:any=[];
  editForm : FormGroup;
  submitted = false;
  UserData :any=[];
  constructor(public formBuilder: FormBuilder,private salleservice:SalleService,private matService:MaterielService, private demandeService:DemandeService , private actRoute : ActivatedRoute,private router:Router,private toastr:ToastrService) { 
      this.updateDemande();
      let  id = this.actRoute.snapshot.paramMap.get('id');
      this.getDemande(id);
      this.listeSalles();
      this.listeMateriels();
      this.editForm= this.formBuilder.group(
        { 
          title: ['', Validators.required],
          date: ['', Validators.required],
          debut: ['',Validators.required],
          fin: ['',Validators.required],
          salle: [''],
          materiels: [''],
          qtemat: [''],
      },)
    }
    ngOnInit() {}
  get f()
    {
      return this.editForm.controls;
    }
    getDemande(id:any){
      this.demandeService.getDemande(id).subscribe(data=> {
        this.editForm.patchValue({
          
          title: data['title'],
          date: data['date'],
          debut: data['debut'],
          fin: data['fin'],
          salle:data ['salle'],
          materiels: data['materiels'],
          qtemat:data ['qtemat'],      } 
        )
      })
    }
    updateDemande( ){
      this.editForm=this.formBuilder.group(
        {  
          title: ['', Validators.required],
          date: ['', Validators.required],
          debut: ['',Validators.required],
          fin: ['',Validators.required],
          salle: [''],
          materiels: [''],
          qtemat: [''],
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
               this.demandeService.editDemande(id,this.editForm.value).subscribe(res=>{
                this.router.navigateByUrl('/acceuil/demande/liste_demandes');
                console.log('content updated successfully!')
                this.toastr.success('la modification est effectuée','succes')},(error)=>{
                  console.log(error)
                })
              Swal.fire(
                'Modifié!',
                'Demande a été modifié.',
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
   listeSalles(){
    this.salleservice.getSalles().subscribe((data)=>{this.ev=data; })
  }
  listeMateriels(){
    this.matService.getMateriels().subscribe((data)=>{this.mat=data;})
  }
  }
