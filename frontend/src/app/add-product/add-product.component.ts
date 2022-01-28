import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { hasErrors } from 'src/common/interfaces/utilities.model';
import { validationType, errors } from 'src/common/constants/error.model';

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
  constructor(private httpClient: HttpClient) {}

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
    console.log(e,'-----e')
    const reader = new FileReader();
    console.log(reader,'----reader')
    this.file = e.target.files[0];
    console.log(this.file,'-----this.file')
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
    console.log(this.uploadForm.value);
    this.httpClient
      .post('http://localhost:8888/file-upload.php', this.uploadForm.value)
      .subscribe((response) => {
        alert('Image has been uploaded.');
      });
  }
  
  submit() {
    console.log(this.uploadForm.value);
    const payload = new FormData();
    payload.append('productDescription',this.uploadForm.value.productDescription);
    payload.append('productName',this.uploadForm.value.productName)
    payload.append('productRate',this.uploadForm.value.productRate)
    payload.append('file', this.file);

    console.log(this.file,'---fileee')
    console.log(payload,'-------payload')
  }
}
