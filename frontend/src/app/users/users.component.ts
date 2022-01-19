import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UserTableData } from 'src/common/interfaces/userTable.model';
import { ApiServicesService } from 'src/common/services/api-services.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUsers;
  userId;
  userFirstName;
  userLastName;
  userEmail;
  displayedColumns: string[] = ['position', 'id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource: MatTableDataSource<UserTableData>;

  constructor(private httpService: ApiServicesService, private cdr: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.httpService.getAllUsers().subscribe((res)=>{
      this.allUsers = res['fetchAllUsers'];
      const userData = this.allUsers.forEach((ele)=>{
        this.userId = ele._id;
        this.userFirstName = ele.firstName;
        this.userLastName = ele.lastName;
        this.userEmail = ele.email;
      })
      this.dataSource = new MatTableDataSource(this.allUsers);
      this.cdr.detectChanges();
    },(error)=>{
      this.snackBar.open(error.message, 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-style'],
        duration: 3000,
      });
    })
  }

  deletebtn(ele,index){
    const userId = ele._id;
    this.httpService.deleteUsers(userId).subscribe((res=>{
      if(res){
        this.allUsers.splice(index, 1);
        this.tableData();
        this.snackBar.open(`${ele?.firstName + ' ' + ele?.lastName} Deleted from the list!`, 'Ok', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['error-style'],
          duration: 3000,
        });
      }
    }),(error=>{
      this.snackBar.open(error.error.message, 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-style'],
        duration: 3000,
      });
    }))
  }

}
