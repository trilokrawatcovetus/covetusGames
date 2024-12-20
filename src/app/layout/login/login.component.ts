import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonApiService } from '../../services/common-api.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SocketService } from '../../services/socket.service';

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
    private toastr: ToastrService, private loader: NgxUiLoaderService, private socket: SocketService) {
    console.log(activeRoute.snapshot.data)
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required]],
      // password: ['', [Validators.required]]
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
      // "password": this.loginForm.get('password')?.value
    }



    this.api.allPostMethod('login/login', payload).subscribe({
      next: (res: any) => {
        this.loader.stopLoader('login');
        if (res['error'] != true) {
          localStorage.setItem('g-max-token', res['data']['token']);
          localStorage.setItem('userId', res['data']['id']);
          localStorage.setItem('userName', res['data']['full_name']);
          this.toastr.success('Logged in successfully', '');
          // this.socket.login({ user_id: res['data']['id'] })
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

