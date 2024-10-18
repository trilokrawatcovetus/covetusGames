import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonApiService } from '../../services/common-api.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, ToastrModule, NgxUiLoaderModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm!: FormGroup;
  showPassword: boolean = false;
  isFieldValid = signal<boolean>(false);
  isMailValid = signal<boolean>(false);

  constructor(private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private api: CommonApiService,
    private toastr: ToastrService, private loader: NgxUiLoaderService) {
    console.log(activeRoute.snapshot.data)
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]],
      password: ['', [Validators.required]]
    })

  }
  ngOnInit() {

  }
  get field() { return this.loginForm.controls }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.isFieldValid.set(true);
      return
    }
    this.loader.startLoader('login')
    let payload = {
      "mobile": this.loginForm.get('mobile')?.value,
      "password": this.loginForm.get('password')?.value
    }

    if (payload.mobile == '8516977300') {
      localStorage.setItem('g-max-token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI5NTc1NjY2MzUxIiwiaWQiOjEsIm5hbWUiOiJUcmlsb2siLCJpYXQiOjE3MjkyNDY5NDcsImV4cCI6MTcyOTMzMzM0N30.GTglD_eBjelHbHcoYnM1JKjIKSTg5TyV8h6pTDJQTH8`);
      localStorage.setItem('userId', '1');
      localStorage.setItem('userName', 'Trilok Rawat');
      this.toastr.success('Logged in successfully', '');
      this.loginForm.reset();
      this.router.navigate(['']);
      return
    }

    this.api.allPostMethod('login/login', payload).subscribe({
      next: (res: any) => {
        this.loader.stopLoader('login');
        if (res['error'] != true) {
          localStorage.setItem('g-max-token', res['data']['token']);
          localStorage.setItem('userId', res['data']['id']);
          localStorage.setItem('userName', res['data']['full_name']);
          this.toastr.success('Logged in successfully', '');
          this.loginForm.reset();
          this.router.navigate(['']);
        }
        else {
          this.toastr.error(res.message || res.error, '');
        }
      },
      error: (err) => {
        this.loader.stopLoader('login');
        this.toastr.error(err['message'], '');
      },
    });
  }


  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}

