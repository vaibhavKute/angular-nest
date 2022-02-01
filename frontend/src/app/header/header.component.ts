import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  firstName;
  lastName;
  @ViewChild('logoutModal') logoutModal: TemplateRef<any>;
  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.firstName = sessionStorage.getItem('firstName');
    this.lastName = sessionStorage.getItem('lastName')
  }

  users(){
    this.router.navigate(['/home/users']);
  }

  home(){
    this.router.navigate(['/home/homePage']);
  }

  openDialog(){
    this.dialog.open(this.logoutModal, {
      disableClose: true,
    });
  }

  addProduct(){
    this.router.navigate(['/home/add-product']);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
    // window.location.href = EXTERNAL_LOGIN;
    this.dialog.closeAll();
  }

  viewProduct(){
    this.router.navigate(['/home/view-product']);
  }

}
