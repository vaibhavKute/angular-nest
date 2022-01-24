import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from '../add-product/add-product.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'add-product', component: AddProductComponent }];

@NgModule({
  declarations: [
    AddProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AddProductModule { }
