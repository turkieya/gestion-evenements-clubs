import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalleRoutingModule} from 'src/app/modules/salle/salle-routing';
import { ListComponent } from 'src/app/views/salle/list/list.component';
import {EditComponent }from '../../views/salle/edit/edit.component';
import { SalleService } from 'src/app/services/salle.service';
import { ReactiveFormsModule } from '@angular/forms';  
import {HttpClientModule} from '@angular/common/http';
const declarations = [
  ListComponent,
 EditComponent,
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
    SalleRoutingModule,
    ReactiveFormsModule ,
    HttpClientModule,
  ],
  providers:[
    SalleService
  ]
})
export class SalleModule { }