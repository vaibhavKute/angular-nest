import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServicesService } from 'src/common/services/api-services.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  productsList;

  constructor(private apiService: ApiServicesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.apiService.getAllProducts().subscribe((res)=>{
      this.productsList = res['allProducts'];
    },(error)=>{
      if(error){
        this.snackBar.open(error, 'Done',{
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['error-style'],
        });
      }
    });
  }

}
