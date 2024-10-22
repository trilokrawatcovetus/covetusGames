import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
// import { CommunicateService } from '../services/communicate.service'
// import { STATUS_CODE } from '../Constants/statuscode.constant';
export const authErrorHandleInterceptor: HttpInterceptorFn = (req, next) => {
  // const communicate = inject(CommunicateService);
  const toastr = inject(ToastrService);
  const Route = inject(Router);
  let authToken = localStorage.getItem('g-max-token');
  console.log(req.url)

  let authReq = req.clone({
    // setHeaders: {
    //   'x-access-token': `${authToken}`,
    //   'Content-Type': 'application/json;',
    // }
  });
  if (!req.url.includes('login/login')) {
    authReq = req.clone({
      setHeaders: {
        'x-access-token': `${authToken}`,
        'Content-Type': 'application/json;',
      }
    });
  }
  const STATUS_CODE = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
  }
  return next(authReq).pipe(
    catchError((err: any) => {
      console.log(err)
      if (err instanceof HttpErrorResponse) {
        if (err.status === STATUS_CODE.UNAUTHORIZED) {
          toastr.error("Token has been expired. Please login again", "");
          // communicate.isLoaderLoad.next(false);
          let routeTo = '/login';
          Route.navigate([routeTo])
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }
      return throwError(() => err);
    })
  );
};
