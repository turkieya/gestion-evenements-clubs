import { Component, OnInit ,Renderer2  } from '@angular/core';
import  {DemandeService } from '../../../services/demande.service';
import { Demande } from 'src/app/model/demande';
import { FormBuilder, Validators , FormGroup } from '@angular/forms';
import { MaterielService } from 'src/app/services/materiel.service';
import { AuthService } from 'src/app/services/authentification.service';
import { SalleService } from 'src/app/services/salle.service';
import { CalendarService } from 'src/app/services/calendar.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  Materiel : any=[];
  Demande:any=[];
  Evennement:any=[];
  ev:any=[];
  mat:any=[];
  i=0;
  DemandeForm : FormGroup ;
  etat_ev:any;
  club:any;
  emailuser:any;
  submitted = false;
  event = {
    title: '',
    date: '',
    debut:'',
    fin:'',
    salle:'',
    materiels:'',
    qtemat:'',
    nom_club:'',
    etat:'',
    email:'',
  };
  constructor(private salleservice:SalleService,private eventservice:CalendarService, public authService: AuthService,private matService:MaterielService,private demandeService:DemandeService,private formBuilder: FormBuilder) {
    
    this.readDemande();
    this.club=this.authService.loggedUser;
    this.emailuser=this.authService.emailloggedUser;
    console.log(this.club);
    console.log(this.emailuser);
    this.etat_ev="en cours";
    this.listeSalles();
    this.listeMateriels();
    this.listEvents();
    this.DemandeForm= this.formBuilder.group(
      { 
        title: ['', Validators.required],
        date: ['', Validators.required],
        debut: ['', Validators.required],
        fin: ['', Validators.required],
        salle: [''],
        materiels: [''],
        qtemat: [''],
        nom_club:['', Validators.required],
        etat: ['', Validators.required],
        email:['',Validators.required],
    }, );
    this.demandeService.listen().subscribe((m:any)=>{
      console.log(m);
      this.readDemande();
    
    })
   }

  ngOnInit(): void {
  }
  readDemande(){
    this.demandeService.getDemandes().subscribe((data)=>{this.Demande=data;})
  }
  readMateriel(){
    this.matService.getMateriels().subscribe((data)=>{this.Materiel=data;})
  }

 removeDemande(materiel : Demande,index : any)
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
      this.demandeService.deleteDemande(this.Demande[index]._id);
      Swal.fire(
        'Supprimé!',
        'Demande a été supprimé.',
        'success'
      );
      this.demandeService.filter('register click');
    }

  }).catch(() => {
    Swal.fire('Échoué!', 'Il y avait quelque chose qui n\'allait pas.');
  });
}

get f()
    {
      return this.DemandeForm.controls;
    }
    onSubmit()
    {const event = {
      title: this.event.title,
      date: this.event.date,
      debut:this.event.debut,
      fin:this.event.fin,
      materiels:this.event.materiels,
      salle:this.event.salle,
      qtemat:this.event.qtemat,
      nom_club:this.club,
      etat:this.etat_ev,
      email:this.emailuser,
    };
   
     
    if(this.event.materiels!=="")
    {
      for(let j=0;j<this.mat.length;j++)
       {    if(this.mat[j].libelle===this.event.materiels)
              { if (this.mat[j].quantite<this.event.qtemat)
                  {Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La quantité que vous avez saisie nest pas disponible!',
                   // footer: 'Vous devez saisir une quantité plus petite'
                  })}
                else{
                    this.demandeService.addDemande(event)
                          .subscribe(
                    (res)=>{
                     console.log('demande successfully created')
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
                         title: 'Demande ajoutée avec succès'
                         })
                 this.demandeService.filter('register click');
                  this.event.title = '';
                  this.event.date = '';
                   this.event.debut = '';
                   this.event.fin = '';
                   this.event.salle = '';
                    this.event.materiels = '';
                   this.event.qtemat='';
                  },
        (error)=>{
          console.log(error);
        });
      }}}}else
      {this.demandeService.addDemande(event)
        .subscribe(
  (res)=>{
   console.log('demande successfully created')
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
       title: 'Demande ajoutée avec succès'
       })
this.demandeService.filter('register click');
this.event.title = '';
this.event.date = '';
 this.event.debut = '';
 this.event.fin = '';
 this.event.salle = '';
  this.event.materiels = '';
 this.event.qtemat='';
},
(error)=>{
console.log(error);
});
}}
   onReset()
   {
     this.event.title = '';
     this.event.date = '';
     this.event.debut = '';
     this.event.fin = '';
     this.event.salle = '';
     this.event.materiels = '';
     this.event.qtemat='';
   }
   listeSalles(){
    this.salleservice.getSalles().subscribe((data)=>{this.ev=data;
    })
  }
  listeMateriels(){
    this.matService.getMateriels().subscribe((data)=>{this.mat=data;
    })
  }
  listEvents(){
  
    this.eventservice.getAllEvents().subscribe((data)=>{this.Evennement=data;
    })
    
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
   if (this.Demande.length==0)
   return true;
   else 
   return false;
   }
  }

