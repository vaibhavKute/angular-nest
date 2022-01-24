import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; 

const routes: Routes = [{ path: '', pathMatch: 'full', component: PageNotFoundComponent }];

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ]
})
export class PageNotFoundModule { }
