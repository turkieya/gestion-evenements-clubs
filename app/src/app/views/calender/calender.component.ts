import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { CalendarService } from '../../services/calendar.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Events } from 'src/app/model/event';
import { SalleService } from 'src/app/services/salle.service';
import { MaterielService } from 'src/app/services/materiel.service';
import { AuthService } from 'src/app/services/authentification.service';
import * as th from 'src/assets/vendor/fullcalendar/dist/locale/th';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  calendarOptions!: CalendarOptions;
 
  etat_ev:any;
  list_salle:any=[];
  list_materiels:any=[];
  club:any;
  user:any;
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
  };
  events!: Events;
  constructor(
    public http: HttpClient,public authService: AuthService,
    private apiService: CalendarService ,private router: Router, 
    private salleservice:SalleService,private matservice:MaterielService)
    {
      this.club=this.authService.loggedUser;
      this.user=this.authService.RoleUser;
      this.etat_ev="en cours";
      this.listeSalles();
      this.listeMateriels();
      this.getAllEvents();
      this.apiService.listen().subscribe((m:any)=>{
        console.log(m);
        this.getAllEvents();
      })
   }

  handleDateClick(arg : any) {

  }

  onSelectx(event : any) {

  }

  ngOnInit() {
    this.getAllEvents();
  }
  
  deleteEvent(id : any) {
    this.apiService.deleteSingleEvent(id).subscribe((data: any) => {});
  }

  getAllEvents() {
    
    this.apiService.getAllEvents().subscribe((data: any) => {
      const self = this; 
      if (this.authService.RoleUser=="Admin"){
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        selectable: false,
        editable: false,
        // dateClick: this.handleDateClick.bind(this),
        select: this.handleDateClick.bind(this),
        events: data,
        eventClick(evetData:any) {
          // tslint:disable-next-line:variable-name
          const event_id = evetData.event._def.extendedProps._id;
          console.log(event_id);
          const tit=evetData.event._def.extendedProps.date;
          for (let i = 0; i < data.length; i++){
            if (data[i]._id===event_id)
            {
              var titre =data[i].title;
              var club=data[i].nom_club;
              var deb=data[i].debut;
              var f=data[i].fin;
              var date_ev=data[i].date;
              var salle_ev=data[i].salle;
              var quantite=data[i].qtemat;
              var liste_mat=data[i].materiels;
              console.log(data[i].materiels)
              if (liste_mat!==""){
              Swal.fire({
                 title: titre,
                 text: "Cet événement est organisé par "+club+" le "+date_ev+" de "+deb+"h à " +f+"h à la salle "+salle_ev+" . Materiel réservé est "+quantite+" "+liste_mat,
                 icon: 'warning',
                 showCancelButton: true,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'Oui, supprimez-le ! ',
                timer: 30000,}).then((result : any) => {
                  if (result.value) {
                    self.deleteEvent(event_id);
                    Swal.fire(
                      'Supprimé!',
                      'Événement a été supprimé.',
                      'success'
                    );
                    self.getAllEvents();
                  }
      
                })}
                else {
                  Swal.fire({
                    title: titre,
                    text: "Cet événement est organisé par "+club+" le "+date_ev+" de "+deb+"h à " +f+"h à la salle "+salle_ev+" .",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, supprimez-le ! ',
                   timer: 30000,}).then((result : any) => {
                     if (result.value) {
                       self.deleteEvent(event_id);
                       Swal.fire(
                         'Supprimé!',
                         'Événement a été supprimé.',
                         'success'
                       );
                       self.getAllEvents();
                     }
         
                   })
                }
         } }}
      }}
        else{
         this.calendarOptions = {
          initialView: 'dayGridMonth',
          selectable: false,
          editable: false,
          // dateClick: this.handleDateClick.bind(this),
          select: this.handleDateClick.bind(this),
          events: data,
          eventClick(evetData:any) {
            // tslint:disable-next-line:variable-name
            const event_id = evetData.event._def.extendedProps._id;
            console.log(event_id);
            const tit=evetData.event._def.extendedProps.date;
            for (let i = 0; i < data.length; i++){
              if (data[i]._id===event_id)
              {
                var titre =data[i].title;
                var club=data[i].nom_club;
                var deb=data[i].debut;
                var f=data[i].fin;
                var date_ev=data[i].date;
                Swal.fire({
                   title: titre,
                   text: "Cet événement est organisé par "+club+" le "+date_ev+" de "+deb+"h à " +f+"h",
                   icon: 'info',
                  timer: 30000,})
           } }}
        }
      }
    });
  }

  saveEvent() {
    const event = {
      title: this.event.title,
      date: this.event.date,
      debut:this.event.debut,
      fin:this.event.fin,
      materiels:this.event.materiels,
      salle:this.event.salle,
      qtemat:this.event.qtemat,
      nom_club:this.club,
      etat:this.etat_ev,
    };
    
    this.apiService.addEvent(event)
      .subscribe(
        (response: any) => {
          if (response.type === 'success') {
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
            this.apiService.filter('register click');
            this.event.title = '';
            this.event.date = '';
            this.event.debut = '';
            this.event.fin = '';
            this.event.salle = '';
            this.event.materiels = '';
            this.event.qtemat='';
          }
        },
        err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong',
            showConfirmButton: false,
            timer: 1500
          });
          this.event.title = '';
          this.event.date = '';
          this.event.debut = '';
          this.event.fin = '';
          this.event.salle = '';
          this.event.materiels = '';
          this.event.qtemat='';
          this.event.nom_club='';
          this.event.etat='';
        });
  }

  listeSalles(){
    this.salleservice.getSalles().subscribe((data)=>{this.list_salle=data;})
  }
  listeMateriels(){
  
    this.matservice.getMateriels().subscribe((data)=>{this.list_materiels=data;})
  }
  isAdmin():boolean
  {
    if(this.authService.RoleUser=="Admin")
    return true;
    else 
    return false;
  }
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
}

