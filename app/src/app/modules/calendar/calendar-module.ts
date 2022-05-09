import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule} from 'src/app/modules/calendar/calendar-routing';
import { CalenderComponent } from 'src/app/views/calender/calender.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import { FormsModule } from '@angular/forms';
import { EventsComponent } from 'src/app/views/demande/events/events.component';


const declarations = [
  CalenderComponent,
  EventsComponent

];
@NgModule({
  declarations: [
 ...declarations   
  ],
  exports: [
    ...declarations,
    

  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    ReactiveFormsModule ,
    HttpClientModule,
    FullCalendarModule,
    FormsModule,

  ],
  providers:[
    CalendarService
  ]
})
export class CalendarModule { }