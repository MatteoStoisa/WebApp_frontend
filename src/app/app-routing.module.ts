import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './teacher/HomeComponent';
import { StudentsContComponent } from './teacher/students-cont.component';
import { VmsContComponent } from './teacher/VmsContComponent';
import { PageNotFoundComponent } from './teacher/PageNotFoundComponent'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'teacher/course/applicazioni-internet/students', component: StudentsContComponent },
  { path: 'teacher/course/applicazioni-internet/vms', component: VmsContComponent },
  { path: '', redirectTo: "/home", pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
    exports: [RouterModule]
})
export class AppRoutingModule { }