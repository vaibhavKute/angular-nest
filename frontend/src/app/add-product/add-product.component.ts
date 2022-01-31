import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { hasErrors } from 'src/common/interfaces/utilities.model';
import { validationType, errors } from 'src/common/constants/error.model';
import { ApiServicesService } from 'src/common/services/api-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  imgFile: string;
  uploadForm: FormGroup;
  hasError = hasErrors;
  error = errors;
  file;
  successMsg;
  isLoader = false;
  events;
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('loaderDialog') loaderDialog: TemplateRef<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  constructor(private httpClient: HttpClient, private apiService: ApiServicesService, private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      productName: new FormControl('', validationType.productName),
      productDescription: new FormControl(
        '',
        validationType.productDescription
      ),
      productRate: new FormControl('', validationType.productRate),
    });
  }

  get uf() {
    return this.uploadForm.controls;
  }

  onImageChange(e) {
    this.events = e;
    const reader = new FileReader();
    this.file = e.target.files[0];
    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.uploadForm.patchValue({
          imgSrc: reader.result,
        });
      };
    }
    return this.file
  }

  upload() {
    this.httpClient
      .post('http://localhost:8888/file-upload.php', this.uploadForm.value)
      .subscribe((response) => {
        alert('Image has been uploaded.');
      });
  }
  
  submit() {
    const payload = new FormData();
    payload.append('productDescription',this.uploadForm.value.productDescription);
    payload.append('productName',this.uploadForm.value.productName)
    payload.append('productRate',this.uploadForm.value.productRate)
    payload.append('file', this.file);

    this.isLoader = true;
    this.dialog.open(this.loaderDialog, {
      disableClose: true,
      width: '200px',
    });

    this.apiService.createProduct(payload).subscribe((res)=>{
      this.isLoader = false;
      if(res){
        this.successMsg = res['message'];

        this.snackBar.open(this.successMsg, 'Done',{
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['success-style'],
        });
        this.dialog.closeAll();
      }
      this.uploadForm.reset();
      this.getAllValidators();
    },(error)=>{
      if(error){
        this.isLoader = false;
        this.snackBar.open(error.error.message, 'Done',{
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['error-style'],
        });
        this.dialog.closeAll();
      }
    })
  }

  getAllValidators(){
    const productName = this.uploadForm.get('productName') as FormControl;
    const productDescription = this.uploadForm.get('productDescription') as FormControl;
    const productRate = this.uploadForm.get('productRate') as FormControl;
    productName.clearValidators();
    productName.updateValueAndValidity();
    productDescription.clearValidators();
    productDescription.updateValueAndValidity();
    productRate.clearValidators();
    productRate.updateValueAndValidity();
  }
}
