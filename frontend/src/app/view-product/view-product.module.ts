import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductComponent } from '../view-product/view-product.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'view-product', component: ViewProductComponent }];


@NgModule({
  declarations: [
    ViewProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ViewProductModule { }
