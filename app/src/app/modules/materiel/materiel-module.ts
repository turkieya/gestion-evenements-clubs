import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterielRoutingModule} from 'src/app/modules/materiel/materiel-routing';
import { ListComponent } from 'src/app/views/materiel/list/list.component';
import {EditComponent }from '../../views/materiel/edit/edit.component';
import { MaterielService } from 'src/app/services/materiel.service';
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
    MaterielRoutingModule,
    ReactiveFormsModule ,
    HttpClientModule,
  ],
  providers:[
    MaterielService
  ]
})
export class MaterielModule { }