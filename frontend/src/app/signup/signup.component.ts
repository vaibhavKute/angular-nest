import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { errors, validationType } from 'src/common/constants/error.model';
import { hasErrors } from 'src/common/interfaces/utilities.model';
import { ApiServicesService } from 'src/common/services/api-services.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpData;
  apiResMessage;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private httpService: ApiServicesService) { }

  form: FormGroup;
  error = errors;
  hasError = hasErrors;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('',validationType.email),
      password: new FormControl('',validationType.password),
      firstName: new FormControl('',validationType.firstName),
      lastName: new FormControl('',validationType.lastName),
      mobile: new FormControl('',validationType.mobile)
    });
  }

  submit(){
    if(!this.form.valid){
      this.snackBar.open('Form Invalid', 'Done', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['error-style'],
      });
      return;
    }
 
    this.signUpData = this.form.value;
    this.httpService.getSignUpData(this.snackBar).subscribe((res)=>{
      this.apiResMessage = res['message'];
      if(res){
        this.snackBar.open(this.apiResMessage,'Done',{
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['success-style'],
        })
      }
      this.form.reset();
      this.getAllValidators();
    },
    );
  }

  getAllValidators(){
    const emailId = this.form.get('email') as FormControl;
    const password = this.form.get('password') as FormControl;
    const fName = this.form.get('firstName') as FormControl;
    const lName = this.form.get('lastName') as FormControl;
    const mob = this.form.get('mobile') as FormControl;
    emailId.clearValidators();
    emailId.updateValueAndValidity();
    password.clearValidators();
    password.updateValueAndValidity();
    fName.clearValidators();
    fName.updateValueAndValidity();
    lName.clearValidators();
    lName.updateValueAndValidity();
    mob.clearValidators();
    mob.updateValueAndValidity();
  }

}
