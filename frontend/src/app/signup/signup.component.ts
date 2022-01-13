import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { errors, validationType } from 'src/common/constants/error.model';
import { hasErrors } from 'src/common/interfaces/utilities.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

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

  submit(){}

}
