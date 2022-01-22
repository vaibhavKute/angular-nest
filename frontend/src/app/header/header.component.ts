import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('logoutModal') logoutModal: TemplateRef<any>;
  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
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

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    // window.location.href = EXTERNAL_LOGIN;
    this.dialog.closeAll();
  }

}
