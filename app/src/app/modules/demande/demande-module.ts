import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeRoutingModule} from 'src/app/modules/demande/demande-routing';
import { ListComponent } from 'src/app/views/demande/list/list.component';
import { EditComponent } from 'src/app/views/demande/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';  
import {HttpClientModule} from '@angular/common/http';
import { DemandeService } from 'src/app/services/demande.service';
import { FormsModule } from '@angular/forms';

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
    DemandeRoutingModule,
    ReactiveFormsModule ,
    HttpClientModule,
    FormsModule
  ],
  providers:[
    DemandeService
  ]
})
export class DemandeModule { }