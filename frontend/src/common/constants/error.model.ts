import { Validators } from '@angular/forms';

export const errors = {
    requiredError: {
      email: 'Email ID Required',
      password: 'Password is Required',
      firstName: 'First Name is required',
      lastName: 'Last Name is required',
      mobile: 'Mobile no is Required',
      productName: 'Product Name is Required',
      productDescription: 'Product Description is Required',
      productRate: 'Product Rate is Required'
    },

    patternError: {
      email: 'Enter valid Email ID',
      password: 'Password must be at least 8 characters',
      firstName: 'Only characters allowed',
      lastName: 'Only characters allowed',
      mobile: 'Enter valid mobile no',
      productName: 'Enter valid product name',
      productDescription: 'Enter valid product description',
      productRate: 'Enter valid product rate'
    }
}

export const validationType = {
    email: [
        Validators.required,
        Validators.email,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
    ],
    password: [Validators.required, Validators.minLength(8)],
    firstName: [Validators.required, Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)],
    lastName: [Validators.required, Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)],
    mobile: [Validators.required, Validators.pattern(/^(\d{10})$/)],
    productName: [Validators.required, Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)],
    productDescription: [Validators.required, Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)],
    productRate: [Validators.required, Validators.pattern(/^(\d{4})$/)],
}