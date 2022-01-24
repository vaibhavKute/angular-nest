import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutGuard } from 'src/common/guards/logout.guard';
import { LoginGuard } from 'src/common/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => 
      import('./landing-page/landing-page.module').then((m) => m.LandingPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./signup/signup.module').then((m) => m.SignupModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [LogoutGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [LogoutGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./add-product/add-product.module').then((m) => m.AddProductModule),
    canActivate: [LogoutGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
