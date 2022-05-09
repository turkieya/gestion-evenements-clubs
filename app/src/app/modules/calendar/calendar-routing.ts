import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalenderComponent }from '../../views/calender/calender.component';
import { AuthGuard } from 'src/app/authentification/auth.guard';

const routes: Routes = [
  {
    component: CalenderComponent, 
    path: '',
    pathMatch: 'full',
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class CalendarRoutingModule {}
