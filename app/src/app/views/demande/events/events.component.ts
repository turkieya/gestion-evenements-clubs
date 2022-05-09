import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from 'src/app/services/calendar.service';
import { MaterielService } from 'src/app/services/materiel.service';
import { Events } from 'src/app/model/event';
import { AuthService } from 'src/app/services/authentification.service';
import { DemandeService } from 'src/app/services/demande.service'
import { Demande } from 'src/app/model/demande';
import { SendEmailService } from 'src/app/services/send-email.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  accp="accepter";
  EventForm : FormGroup ;
  user:any;
  etat_ev:any;
  Demande:any=[];
  Materiel : any=[];
  club:any;
  submitted = false;
  constructor(private emailservice:SendEmailService,public authService: AuthService,private matService:MaterielService,private eventservice:DemandeService,private formBuilder: FormBuilder,private calendarservice:CalendarService) {
   this.readEvent();
   this.club=this.authService.loggedUser;
   this.etat_ev="en cours";
   this.eventservice.listen().subscribe((m:any)=>{
    console.log(m);
    this.readEvent();
   
  })
    this.EventForm= this.formBuilder.group(
      { 
        title: ['', Validators.required],
        date: ['', Validators.required],
        debut: ['', Validators.required],
        fin: ['', Validators.required],
        salle: [''],
        materiels: [''],
        qtemat: [''],
        nom_club:['', Validators.required],
        email:['',Validators.required],

    }, );
   }

  ngOnInit(): void {
  }
  readEvent(){
    this.eventservice.getDemandes().subscribe((data)=>{console.log(data);this.Demande=data;}
    )
  }
  readMateriel(){
    this.matService.getMateriels().subscribe((data)=>{this.Materiel=data;})
  }
  
 removeDemande(event : Events,index : any)  {
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
      this.eventservice.deleteDemande(this.Demande[index]._id);
      this.emailservice.Sendannulation(this.Demande[index]).subscribe((res)=>{
        console.log('email envoyé');},(error)=>{console.log(error);}
        );
      Swal.fire(
        'Annulé!',
        'Événement a été annulé.',
        'success'
      );
      this.eventservice.filter('register click');
    }

  }).catch(() => {
    Swal.fire('Échoué!', 'Il y avait quelque chose qui n\'allait pas.');
  });
}

 get f()
    {
      return this.EventForm.controls;
    }

  accepterDemande(demande : Demande , index: any) {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière ! ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Acceptez ! ',
      timer: 30000,
    }).then((result : any) => {
      if (result.value) {
        this.Demande[index].etat=this.accp;
        this.calendarservice.addEvent(this.Demande[index]).subscribe(

          (res)=>{
            console.log('Demande successfully created')
            console.log(this.Demande[index]);
            this.eventservice.filter('register click');
          },(error)=>{
            console.log(error);
          }
        );
        this.emailservice.Sendacceptation(this.Demande[index]).subscribe((res)=>{
          console.log('email envoyé');},(error)=>{console.log(error);}
          );
        Swal.fire(
          'Accepté!',
          'Événement a été accepté.',
          'success'
        );
        this.eventservice.filter('register click');
      }
  
    }).catch(() => {
      Swal.fire('Échoué!', 'Il y avait quelque chose qui n\'allait pas.');
    });
   
this.eventservice.deleteDemande(this.Demande[index]._id);
  }
   onReset()
   {this.submitted=false;
    this.EventForm.reset();
  
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
