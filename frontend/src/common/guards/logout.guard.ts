import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor( private route:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    var value_from_storage = sessionStorage.getItem("token");
    // console.log(value_from_storage);

    if(value_from_storage === null){
      this.route.navigate(['/auth/login']);
      return false;
    }
    else{
      return true;
    }
  }
  
}