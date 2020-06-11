import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './teacher/HomeComponent';
import { StudentsContComponent } from './teacher/students-cont.component';
import { VmsContComponent } from './teacher/VmsContComponent';
import { PageNotFoundComponent } from './teacher/PageNotFoundComponent'
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: HomeComponent },
    { path: 'teacher/course/applicazioni-internet/students', component: StudentsContComponent, canActivate: [AuthGuard] },
    { path: 'teacher/course/applicazioni-internet/vms', component: VmsContComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: "/home", pathMatch: "full" },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }