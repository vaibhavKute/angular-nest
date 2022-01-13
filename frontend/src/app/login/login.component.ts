import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { validationType, errors } from 'src/common/constants/error.model';
import { hasErrors } from 'src/common/interfaces/utilities.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error = errors;
  hasError = hasErrors;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('',validationType.email),
      password: new FormControl('',validationType.password),
    });
  }

  submit(){}

}
