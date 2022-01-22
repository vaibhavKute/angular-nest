import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { AuthGuard } from 'src/common/guards/auth.guard';

const routes: Routes = [{ path: 'homePage', component: HomeComponent, canActivate: [AuthGuard] }];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
    FooterModule
  ]
})
export class HomeModule { }
