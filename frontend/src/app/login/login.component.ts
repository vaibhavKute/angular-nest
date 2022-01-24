import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { validationType, errors } from 'src/common/constants/error.model';
import { hasErrors } from 'src/common/interfaces/utilities.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServicesService } from 'src/common/services/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error = errors;
  hasError = hasErrors;
  errorMsg;
  errorMessage;
  responseMessage;
  hide = true;
  email;
  firstName;
  lastName;
  mobileNumber;
  token;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private httpService: ApiServicesService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('',validationType.email),
      password: new FormControl('',validationType.password),
    });
  }

  submit(){
    if(!this.form.valid){
      this.snackBar.open('Form Invalid', 'Done',{
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-style'],
      });
      return;
    }
    const payload = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.httpService.getLoginData(payload).subscribe((res)=>{
      this.responseMessage = res['message'];
      const getData = res['user'];
      const getToken = res['token'];
      console.log(res,'--res')
      
      if(res){

        this.email = getData.email;
        this.firstName = getData.firstName;
        this.lastName = getData.lastName;
        this.mobileNumber = getData.mobile;
        this.token = getToken.token;

        sessionStorage.setItem('email', this.email);
        sessionStorage.setItem('firstName', this.firstName);
        sessionStorage.setItem('lastName', this.lastName);
        sessionStorage.setItem('mobile', this.mobileNumber);
        sessionStorage.setItem('token',this.token);


        this.snackBar.open(this.responseMessage, 'Done',{
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['success-style'],
        });
      }
      this.form.reset();
      this.getAllValidators();
      this.router.navigate(['/home/homePage']);

    },(error)=>{
      if(error){
        this.errorMsg = error.message;
        this.errorMessage = error.error.message;
        this.snackBar.open(error.error.message ? this.errorMessage : this.errorMsg, 'Done',{
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['error-style'],
        });
      }
    });
  }

  getAllValidators(){
    const emailId = this.form.get('email') as FormControl;
    const password = this.form.get('password') as FormControl;
    emailId.clearValidators();
    emailId.updateValueAndValidity();
    password.clearValidators();
    password.updateValueAndValidity();
  }

}
