import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpInterceptorFn }
  from '@angular/common/http';
import { Observable } from 'rxjs';

export const myAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const platform = inject(PLATFORM_ID);
  let token: string | null = "";
  if (isPlatformBrowser(platform)) {
    token = sessionStorage.getItem('access_token');
  }
  if(token!=null && token!= "" && token != "null"){
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next(authReq);
  }
  else {
    return next(req);
  }
};
