import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule} from 'src/app/modules/member/member-routing';
import { ListComponent } from 'src/app/views/member/list/list.component';
import {EditComponent }from '../../views/member/edit/edit.component';
import { ProfileComponent } from 'src/app/views/member/profile/profile.component';
import { MemberService } from 'src/app/services/member.service';
import { ReactiveFormsModule } from '@angular/forms';  
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const declarations = [
  ListComponent,
 EditComponent,
 ProfileComponent
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
    UserRoutingModule,
    ReactiveFormsModule ,
    HttpClientModule,FormsModule
  ],
  providers:[
  MemberService
  ]
})
export class UserModule { }